package com.todorex.controller;

import com.todorex.dto.AuthenticationRequest;
import com.todorex.dto.AuthenticationResponse;
import com.todorex.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by rex on 2018/4/22.
 */
@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    // 请求路径(/auth)
    @PostMapping(value = "${jwt.authenticationPath}")
    public AuthenticationResponse login(@RequestBody AuthenticationRequest request) throws AuthenticationException {
        // 对包装过后的UsernamePasswordAuthenticationToken精心再包装成Authentication
        final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        // 将该认证添加到上下文中（避免多次验证）
        // SecurityContextHolder用于存储安全上下文（security context）的信息
        SecurityContextHolder.getContext().setAuthentication(authentication);


        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        // 实际应用中，生成token时可能会用到更多的参数
        final String token = jwtTokenUtil.generate(userDetails.getUsername());
        // 返回Token
        return new AuthenticationResponse(token);

    }
}
