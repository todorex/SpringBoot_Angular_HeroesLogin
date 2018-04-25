package com.todorex.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.todorex.config.Config;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.Date;

/**
 * Created by rex on 2018/4/22.
 */
@Component
public class JwtTokenUtil {
    // 使用日志(LogBack)
    public static final Log log = LogFactory.getLog(JwtTokenUtil.class);

    // 注入配置Bean
    @Autowired
    private Config config;

    /**
     * 利用username生成Token
     * @param username
     * @return
     */
    public String generate(String username) {
        // 使用jwt包下得算法
        try {
            // 利用HMAC256算法
            Algorithm algorithm = Algorithm.HMAC256(config.getJwt().getSecret());
            String token = JWT.create()
                    // 发行人
                    .withIssuer(config.getJwt().getIssuer())
                    // 发行时间
                    .withIssuedAt(new Date())
                    // 过期时间
                    .withExpiresAt(new Date(System.currentTimeMillis() + config.getJwt().getExpiration()* 1000))
                    // 主题内容(用Claim)
                    .withClaim("username",username)
                    // 负责加密的算法
                    .sign(algorithm);
            return token;

        } catch (IllegalArgumentException | UnsupportedEncodingException e) {
            return null;
        }
    }

    /**
     * 验证token
     * @param token
     * @return
     */
    public String verify(String token) {
        if (token == null ) {
            return null;
        }

        try {
            // 加盐
            Algorithm algorithm = Algorithm.HMAC256(config.getJwt().getSecret());
            JWTVerifier verifier = JWT.require(algorithm).withIssuer(config.getJwt().getIssuer()).build();
            DecodedJWT jwt = verifier.verify(token);
            return jwt.getClaim("username").asString();
        } catch (UnsupportedEncodingException e) {
            log.error(e);
            return null;
        }
    }



}
