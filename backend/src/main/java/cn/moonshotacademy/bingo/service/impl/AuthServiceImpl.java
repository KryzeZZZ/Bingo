package cn.moonshotacademy.bingo.service.impl;
import cn.moonshotacademy.bingo.service.*;
import cn.moonshotacademy.bingo.entity.UserEntity;
import cn.moonshotacademy.bingo.entity.QuestionEntity;
import cn.moonshotacademy.bingo.entity.TeamEntity;
import cn.moonshotacademy.bingo.exception.*;
import cn.moonshotacademy.bingo.repository.TeamRepository;
import cn.moonshotacademy.bingo.repository.UserRepository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.stereotype.Service;

import cn.moonshotacademy.bingo.dto.*;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private JWTService jwtService;
    @Autowired
    private UserRepository userRepository;

    @Override
    public String login(LoginDto loginDto) {
        Optional<UserEntity> userFromUserName = userRepository.findById(loginDto.getId());
        if (!userFromUserName.isPresent()) {
            throw new BusinessException(ExceptionEnum.USER_NOT_FOUND);
        }
        UserEntity user = userFromUserName.get();
        System.out.println(user.getBirth());
        if(!user.getBirth().equals(loginDto.getBirth())) throw new BusinessException(ExceptionEnum.WRONG_PASSWORD);
        String token = jwtService.setToken(user);
        return token;
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
        teams.sort(Comparator.comparing(TeamEntity::getId));
        return teams;
    }
    @Override
    public List<UserDto> getUsers() {
        ArrayList<UserEntity> users = new ArrayList<>(userRepository.findAll());
        List<UserDto> res = users.stream()
        .map(item -> {
            UserDto dto = new UserDto();
            dto.setId(item.getId());
            dto.setName(item.getName());
            dto.setTeamId(item.getTeamId());
            return dto;
        })
        .collect(Collectors.toList());
        res.sort(Comparator.comparing(UserDto::getId));
        return res;
    }

    @Override
    public Long exTeam(Long userId) {
        Optional<UserEntity> user = userRepository.findById(userId);
        if(user.isPresent()) {
            UserEntity realUser = user.get();
            return realUser.getTeamId();
        }
        else {
            throw new BusinessException(ExceptionEnum.USER_NOT_FOUND);
        }
    }
}
