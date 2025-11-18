package com.predicto.auth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Verify Your Predicto Account");
        message.setText("Please click the following link to verify your account: " +
                       "http://localhost:8080/api/auth/verify?token=" + token);

        mailSender.send(message);
        log.info("Verification email sent to: {}", to);
    }

    public void sendPasswordResetEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Reset Your Predicto Password");
        message.setText("Please click the following link to reset your password: " +
                       "http://localhost:8080/api/auth/reset-password?token=" + token);

        mailSender.send(message);
        log.info("Password reset email sent to: {}", to);
    }
}
