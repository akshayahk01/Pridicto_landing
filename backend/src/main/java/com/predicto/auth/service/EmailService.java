package com.predicto.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String to, String otpCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Predicto - Email Verification Code");
        message.setText("Your verification code is: " + otpCode + "\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this code, please ignore this email.");

        mailSender.send(message);
    }

    public void sendPasswordResetEmail(String to, String resetToken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Predicto - Password Reset");
        message.setText("Click the following link to reset your password: \n\n" +
                       "http://localhost:3000/reset-password?token=" + resetToken + "\n\n" +
                       "This link will expire in 24 hours.\n\n" +
                       "If you didn't request a password reset, please ignore this email.");

        mailSender.send(message);
    }

    public void sendWelcomeEmail(String to, String firstName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Welcome to Predicto!");
        message.setText("Dear " + firstName + ",\n\n" +
                       "Welcome to Predicto! Your account has been successfully created.\n\n" +
                       "You can now access all our features and start managing your projects.\n\n" +
                       "Best regards,\n" +
                       "The Predicto Team");

        mailSender.send(message);
    }
}
