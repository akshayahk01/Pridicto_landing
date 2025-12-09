package com.predicto.auth.controller;

import com.predicto.auth.dto.JwtResponse;
import com.predicto.auth.entity.User;
import com.predicto.auth.repository.UserRepository;
import com.predicto.auth.security.JwtUtils;
import com.predicto.auth.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth/oauth")
public class OAuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthService authService;

    @Value("${app.frontend.url:http://localhost:5173}")
    private String frontendUrl;

    @GetMapping("/google")
    public RedirectView googleAuth() {
        return new RedirectView("/oauth2/authorization/google");
    }

    @GetMapping("/github")
    public RedirectView githubAuth() {
        return new RedirectView("/oauth2/authorization/github");
    }

    @GetMapping("/success")
    public void oauthSuccess(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication != null && authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            
            String email = oauth2User.getAttribute("email");
            String firstName = oauth2User.getAttribute("given_name");
            String lastName = oauth2User.getAttribute("family_name");
            String provider = authentication.getName();
            
            // Handle GitHub which might have different attribute names
            if (email == null) {
                email = oauth2User.getAttribute("login") + "@github.com";
                firstName = oauth2User.getAttribute("name");
                lastName = "";
            }
            
            try {
                // Find or create user
                Optional<User> existingUser = userRepository.findByEmail(email);
                User user;
                
                if (existingUser.isPresent()) {
                    user = existingUser.get();
                } else {
                    // Create new user
                    user = new User();
                    user.setEmail(email);
                    user.setUsername(email.split("@")[0]);
                    user.setFirstName(firstName != null ? firstName : "User");
                    user.setLastName(lastName != null ? lastName : "");
                    user.setPassword(""); // No password for OAuth users
                    user.setEmailVerified(true);
                    user.setIsActive(true);
                    userRepository.save(user);
                }
                
                // Generate JWT token
                String jwt = jwtUtils.generateTokenFromUsername(user.getEmail());
                
                // Redirect to frontend with token
                String redirectUrl = frontendUrl + "/oauth-success?token=" + jwt + 
                                   "&email=" + email + 
                                   "&firstName=" + user.getFirstName() + 
                                   "&lastName=" + user.getLastName();
                
                response.sendRedirect(redirectUrl);
                
            } catch (Exception e) {
                // Redirect to frontend with error
                String errorUrl = frontendUrl + "/login?error=oauth_failed&message=" + e.getMessage();
                response.sendRedirect(errorUrl);
            }
        } else {
            // No authentication found
            response.sendRedirect(frontendUrl + "/login?error=oauth_no_auth");
        }
    }

    @PostMapping("/token")
    public ResponseEntity<?> exchangeToken(@RequestBody Map<String, String> tokenRequest) {
        try {
            String token = tokenRequest.get("token");
            String email = tokenRequest.get("email");
            String firstName = tokenRequest.get("firstName");
            String lastName = tokenRequest.get("lastName");
            
            if (token == null || email == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Missing required fields"));
            }
            
            // Validate token (basic validation)
            if (!jwtUtils.validateJwtToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid token"));
            }
            
            // Find or create user
            Optional<User> existingUser = userRepository.findByEmail(email);
            User user;
            
            if (existingUser.isPresent()) {
                user = existingUser.get();
            } else {
                // Create new user
                user = new User();
                user.setEmail(email);
                user.setUsername(email.split("@")[0]);
                user.setFirstName(firstName != null ? firstName : "User");
                user.setLastName(lastName != null ? lastName : "");
                user.setPassword("");
                user.setEmailVerified(true);
                user.setIsActive(true);
                userRepository.save(user);
            }
            
            JwtResponse jwtResponse = new JwtResponse(token, user.getId(), user.getEmail(), 
                                                   user.getFirstName(), user.getLastName());
            
            return ResponseEntity.ok(jwtResponse);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Token exchange failed: " + e.getMessage()));
        }
    }

    @GetMapping("/userinfo")
    public ResponseEntity<?> getUserInfo(Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("email", oauth2User.getAttribute("email"));
            userInfo.put("name", oauth2User.getAttribute("name"));
            userInfo.put("given_name", oauth2User.getAttribute("given_name"));
            userInfo.put("family_name", oauth2User.getAttribute("family_name"));
            userInfo.put("picture", oauth2User.getAttribute("picture"));
            
            return ResponseEntity.ok(userInfo);
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}