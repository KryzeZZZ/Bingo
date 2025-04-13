package cn.moonshotacademy.bingo.service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import cn.moonshotacademy.bingo.entity.TeamEntity;
import cn.moonshotacademy.bingo.entity.UserEntity;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {

    private static final String SECRET_KEY = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    private final SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

    public String setToken(UserEntity userEntity) {
        return Jwts.builder()
                .subject(userEntity.getId().toString()) // 存 userId 为 subject
                .claim("teamId", userEntity.getTeamId()) // 自定义字段
                .signWith(key)
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .compact();
    }

    public Long getUserId(String token) throws JwtException {
        return Long.parseLong(
                Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .getSubject()
        );
    }

    public Long getTeamId(String token) throws JwtException {
        return ((Number) Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("teamId")).longValue();
    }
}
