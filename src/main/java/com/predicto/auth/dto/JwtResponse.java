package com.predicto.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String accessToken;
    private String refreshToken;
    private Long id;
    private String email;
    private String fullName;
    private String type = "Bearer";

    public JwtResponse(String accessToken, String refreshToken, Long id, String email, String fullName) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.type = "Bearer";
    }
}
