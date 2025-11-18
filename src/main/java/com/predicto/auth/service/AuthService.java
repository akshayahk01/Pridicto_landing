package com.predicto.auth.service;

import com.predicto.auth.dto.*;
import com.predicto.auth.entity.EmailVerificationToken;
import com.predicto.auth.entity.PasswordResetToken;
import com.predicto.auth.entity.User;
import com.predicto.auth.repository.EmailVerificationTokenRepository;
import com.predicto.auth.repository.PasswordResetTokenRepository;
import com.predicto.auth.repository.UserRepository;
import com.predicto.auth.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final EmailService emailService;

    @Transactional
    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        String refreshToken = jwtUtils.generateRefreshToken(authentication);

        User user = (User) authentication.getPrincipal();

        // Update last login
        user.updateLastLogin();
        userRepository.save(user);

        return new JwtResponse(jwt, refreshToken, user.getId(), user.getEmail(), user.getFullName());
    }

    @Transactional
    public MessageResponse registerUser(SignupRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new RuntimeException("Email is already in use!");
        }

        // Create new user account
        User user = User.builder()
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .firstName(signupRequest.getFirstName())
                .lastName(signupRequest.getLastName())
                .phone(signupRequest.getPhone())
                .company(signupRequest.getCompany())
                .build();

        userRepository.save(user);

        // Generate email verification token
        String verificationToken = UUID.randomUUID().toString();
        EmailVerificationToken emailToken = EmailVerificationToken.builder()
                .user(user)
                .token(verificationToken)
                .expiryDate(LocalDateTime.now().plusHours(24))
                .build();

        emailVerificationTokenRepository.save(emailToken);

        // Send verification email (skip for development if mail server not available)
        try {
            emailService.sendVerificationEmail(user.getEmail(), verificationToken);
        } catch (Exception e) {
            log.warn("Failed to send verification email: {}", e.getMessage());
            // For development, log the token so we can verify manually
            log.info("Verification token for {}: {}", user.getEmail(), verificationToken);
        }

        return new MessageResponse("User registered successfully. Please check your email to verify your account.");
    }

    @Transactional
    public MessageResponse verifyEmail(String token) {
        EmailVerificationToken verificationToken = emailVerificationTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid verification token"));

        if (verificationToken.isExpired()) {
            throw new RuntimeException("Verification token has expired");
        }

        User user = verificationToken.getUser();
        user.setEmailVerified(true);
        userRepository.save(user);

        verificationToken.setVerified(true);
        emailVerificationTokenRepository.save(verificationToken);

        return new MessageResponse("Email verified successfully");
    }

    @Transactional
    public MessageResponse forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        // Invalidate existing tokens
        passwordResetTokenRepository.invalidateAllUserTokens(user);

        // Generate new reset token
        String resetToken = UUID.randomUUID().toString();
        PasswordResetToken passwordToken = PasswordResetToken.builder()
                .user(user)
                .token(resetToken)
                .expiryDate(LocalDateTime.now().plusHours(1))
                .build();

        passwordResetTokenRepository.save(passwordToken);

        // Send reset email
        emailService.sendPasswordResetEmail(user.getEmail(), resetToken);

        return new MessageResponse("Password reset link sent to your email");
    }

    @Transactional
    public MessageResponse resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid reset token"));

        if (resetToken.isExpired() || resetToken.getUsed()) {
            throw new RuntimeException("Reset token is invalid or expired");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        resetToken.setUsed(true);
        passwordResetTokenRepository.save(resetToken);

        return new MessageResponse("Password reset successfully");
    }

    public JwtResponse refreshToken(String refreshToken) {
        if (!jwtUtils.validateJwtToken(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }

        String username = jwtUtils.getUserNameFromJwtToken(refreshToken);
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String newJwt = jwtUtils.generateTokenFromUsername(username);
        String newRefreshToken = jwtUtils.generateRefreshToken(
            new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities()));

        return new JwtResponse(newJwt, newRefreshToken, user.getId(), user.getEmail(), user.getFullName());
    }
}
