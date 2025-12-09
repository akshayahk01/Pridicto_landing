package com.predicto.auth.controller;

import com.predicto.auth.dto.JwtResponse;
import com.predicto.auth.dto.LoginRequest;
import com.predicto.auth.dto.MessageResponse;
import com.predicto.auth.dto.SignupRequest;
import com.predicto.auth.security.SecurityService;
import com.predicto.auth.security.ValidationUtils;
import com.predicto.auth.service.AuthService;
import com.predicto.auth.service.OtpService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @Autowired
    OtpService otpService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        try {
            authService.registerUser(signUpRequest);
            // Generate and send OTP after successful registration
            otpService.createOtp(signUpRequest.getEmail());
            return ResponseEntity.ok(new MessageResponse("User registered successfully! OTP sent to your email."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            JwtResponse jwtResponse = authService.authenticateUser(loginRequest);
            return ResponseEntity.ok(jwtResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        try {
            boolean isValid = otpService.verifyOtp(email, otp);
            if (isValid) {
                // After OTP verification, return JWT token
                JwtResponse jwtResponse = authService.authenticateUserAfterVerification(email);
                return ResponseEntity.ok(jwtResponse);
            } else {
                return ResponseEntity.badRequest().body(new MessageResponse("Invalid or expired OTP"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@RequestParam String email) {
        try {
            otpService.resendOtp(email);
            return ResponseEntity.ok(new MessageResponse("OTP resent successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        try {
            // In a stateless JWT system, logout is handled on the client side
            // by removing the token from localStorage
            return ResponseEntity.ok(new MessageResponse("Logged out successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
}
