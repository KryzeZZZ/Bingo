package cn.moonshotacademy.bingo.service;

import java.util.ArrayList;
import java.util.List;

import cn.moonshotacademy.bingo.dto.*;
import cn.moonshotacademy.bingo.entity.TeamEntity;
import cn.moonshotacademy.bingo.entity.UserEntity;

public interface AuthService {
    
    public String login(LoginDto loginDto);
    public void uploadName(ReplaceDto repDto);
    public ArrayList<TeamEntity> getTeams();
    public List<UserDto> getUsers();
    public Long exTeam(Long userId);
}