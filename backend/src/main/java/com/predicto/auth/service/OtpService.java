package com.predicto.auth.service;

import com.predicto.auth.entity.Otp;
import com.predicto.auth.repository.OtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private EmailService emailService;

    public void createOtp(String email) {
        // Generate 6-digit OTP
        String otpCode = generateOtpCode();

        // Invalidate any existing unused OTPs for this email
        otpRepository.deleteByEmailAndIsUsedFalse(email);

        // Create new OTP
        Otp otp = new Otp(email, otpCode);
        otpRepository.save(otp);

        // Send OTP via email
        emailService.sendOtpEmail(email, otpCode);
    }

    public boolean verifyOtp(String email, String otpCode) {
        Optional<Otp> otpOptional = otpRepository.findByEmailAndOtpCodeAndIsUsedFalse(email, otpCode);

        if (otpOptional.isPresent()) {
            Otp otp = otpOptional.get();
            if (!otp.isExpired()) {
                otp.setIsUsed(true);
                otpRepository.save(otp);
                return true;
            }
        }
        return false;
    }

    public void resendOtp(String email) {
        // Check if there's a recent OTP that hasn't expired
        Optional<Otp> recentOtp = otpRepository.findLatestValidOtpByEmail(email, LocalDateTime.now());

        if (recentOtp.isPresent()) {
            // Resend the existing OTP
            emailService.sendOtpEmail(email, recentOtp.get().getOtpCode());
        } else {
            // Create a new OTP
            createOtp(email);
        }
    }

    private String generateOtpCode() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000); // Generates 6-digit number
        return String.valueOf(otp);
    }

    // Cleanup method to remove expired OTPs (can be called by a scheduled task)
    public void cleanupExpiredOtps() {
        otpRepository.deleteByExpiresAtBefore(LocalDateTime.now());
    }
}
