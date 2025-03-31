package cn.moonshotacademy.bingo.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import cn.moonshotacademy.bingo.dto.*;
import cn.moonshotacademy.bingo.entity.TeamEntity;
import cn.moonshotacademy.bingo.service.impl.AuthServiceImpl;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthServiceImpl authService;

    @PostMapping("/login")

    public ResponseDto<String> login(@RequestBody LoginDto loginRequestDto) {
        String token = authService.login(loginRequestDto);
        return ResponseDto.success(token);
    }
    @PostMapping("/change")
    public ResponseDto<Void> change(@RequestBody ReplaceDto repDto) {
        authService.uploadName(repDto);
        return ResponseDto.success();
    }
    @GetMapping("/get")
    public ResponseDto<ArrayList<TeamEntity>> getTeam() {
        ArrayList<TeamEntity> teamList = authService.getTeams();
        return ResponseDto.success(teamList);
    }
}
