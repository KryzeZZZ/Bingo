package cn.moonshotacademy.bingo.service;

import java.util.ArrayList;

import cn.moonshotacademy.bingo.dto.*;
import cn.moonshotacademy.bingo.entity.TeamEntity;

public interface AuthService {
    
    public String login(LoginDto loginDto);
    public void uploadName(ReplaceDto repDto);
    public ArrayList<TeamEntity> getTeams();
}