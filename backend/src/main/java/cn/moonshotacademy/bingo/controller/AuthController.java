package cn.moonshotacademy.bingo.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import cn.moonshotacademy.bingo.dto.*;
import cn.moonshotacademy.bingo.entity.TeamEntity;
import cn.moonshotacademy.bingo.entity.UserEntity;
import cn.moonshotacademy.bingo.service.TokenSessionService;
import cn.moonshotacademy.bingo.service.impl.AuthServiceImpl;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthServiceImpl authService;
    @Autowired
    private TokenSessionService tokenSessionService;

    @PostMapping("/login")
    public ResponseDto<String> login(@RequestBody LoginDto loginRequestDto, HttpSession session) {
        String token = authService.login(loginRequestDto);
        tokenSessionService.saveToken(loginRequestDto.getId(), token);
        session.setAttribute("userId", loginRequestDto.getId());
        return ResponseDto.success(token);
    }
    @PostMapping("/change")
    public ResponseDto<Void> change(@RequestBody ReplaceDto repDto) {
        authService.uploadName(repDto);
        return ResponseDto.success();
    }
    @GetMapping("/get")
    public ResponseDto<ArrayList<UserEntity>> getuser() {
        ArrayList<UserEntity> userList = authService.getUsers();
        return ResponseDto.success(userList);
    }
}
