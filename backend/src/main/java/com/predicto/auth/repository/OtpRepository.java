package com.predicto.auth.repository;

import com.predicto.auth.entity.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface OtpRepository extends JpaRepository<Otp, Long> {

    Optional<Otp> findByEmailAndOtpCodeAndIsUsedFalse(String email, String otpCode);

    @Query("SELECT o FROM Otp o WHERE o.email = :email AND o.isUsed = false AND o.expiresAt > :now ORDER BY o.createdAt DESC")
    Optional<Otp> findLatestValidOtpByEmail(@Param("email") String email, @Param("now") LocalDateTime now);

    void deleteByEmailAndIsUsedFalse(String email);

    void deleteByExpiresAtBefore(LocalDateTime expiryTime);
}
