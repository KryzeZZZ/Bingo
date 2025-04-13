package cn.moonshotacademy.bingo.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

@Service
public class TokenSessionService {
    private final Map<Long, String> tokenMap = new ConcurrentHashMap<>();

    public void saveToken(Long userId, String token) {
        tokenMap.put(userId, token); // 可扩展为 Redis
    }

    public String getToken(Long userId) {
        return tokenMap.get(userId);
    }
}
