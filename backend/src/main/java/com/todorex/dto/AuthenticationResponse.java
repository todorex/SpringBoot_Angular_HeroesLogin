package com.todorex.dto;

/**
 * Created by rex on 2018/4/22.
 */
public class AuthenticationResponse {
    private final String token;

    public AuthenticationResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return this.token;
    }
}
