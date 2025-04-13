package cn.moonshotacademy.bingo.components;

import cn.moonshotacademy.bingo.dto.ResponseDto;
import cn.moonshotacademy.bingo.exception.ExceptionEnum;
import cn.moonshotacademy.bingo.service.JWTService;
import cn.moonshotacademy.bingo.service.TokenSessionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private TokenSessionService tokenSessionService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String token = (authHeader != null && authHeader.startsWith("Bearer "))
                ? authHeader.substring(7)
                : null;

        if (token != null) {
            try {
                Long userId = jwtService.getUserId(token);

                String validToken = tokenSessionService.getToken(userId);
                if (validToken == null || !token.equals(validToken)) {
                    writeJsonError(response, ExceptionEnum.SESSION_OUTDATED);
                    return;
                }

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userId, null, Collections.emptyList());
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (JwtException e) {
                writeJsonError(response, ExceptionEnum.TOKEN_INVALID);
                return;
            }
        }

        // 只有 token 合法或无需认证时才继续执行请求
        filterChain.doFilter(request, response);
    }

    private void writeJsonError(HttpServletResponse response, ExceptionEnum exceptionEnum) throws IOException {
        if (response.isCommitted()) return; // 防止重复写入
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json;charset=UTF-8");

        ResponseDto<Void> error = ResponseDto.error(exceptionEnum.getCode(), exceptionEnum.getMessage());
        String json = objectMapper.writeValueAsString(error);
        response.getWriter().write(json);
    }
}
