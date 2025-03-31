package cn.moonshotacademy.bingo.service.impl;
import cn.moonshotacademy.bingo.service.*;
import cn.moonshotacademy.bingo.entity.TeamEntity;
import cn.moonshotacademy.bingo.exception.*;
import cn.moonshotacademy.bingo.repository.TeamRepository;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cn.moonshotacademy.bingo.dto.*;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private JWTService jwtService;

    @Override
    public String login(LoginDto loginDto) {
        Optional<TeamEntity> userFromUserName = teamRepository.findById(loginDto.getTeamId());
        if (!userFromUserName.isPresent()) {
            throw new BusinessException(ExceptionEnum.TEAM_NOT_FOUND);
        }
        TeamEntity user = userFromUserName.get();
        if (user.getSessionsNum() == 2) {
            throw new BusinessException(ExceptionEnum.NO_SESSIONS_REMAIN);
        }
        else {
            user.setSessionsNum(user.getSessionsNum()+1);
            teamRepository.save(user);
        }
        return jwtService.setToken(user);
    }

    @Override
    public void uploadName(ReplaceDto repDto) {
        Optional<TeamEntity> search = teamRepository.findById(repDto.getTeamid());
        if (!search.isPresent()) {
            throw new BusinessException(ExceptionEnum.TEAM_NOT_FOUND);
        }
        TeamEntity team = search.get();
        if(!team.isDefault()) {
            throw new BusinessException(ExceptionEnum.TEAM_NAME_CHANGED);
        }
        else {
            team.setDefault(false);
            team.setName(repDto.getNewname());
            teamRepository.save(team);
        }
    }

    @Override
    public ArrayList<TeamEntity> getTeams() {
        ArrayList<TeamEntity> teams = new ArrayList<>(teamRepository.findAll());
        return teams;
    }
}
