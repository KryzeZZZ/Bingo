package cn.moonshotacademy.bingo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import cn.moonshotacademy.bingo.dto.*;
import cn.moonshotacademy.bingo.entity.ChoiceEntity;
import cn.moonshotacademy.bingo.entity.QuestionEntity;
import cn.moonshotacademy.bingo.entity.TeamVideo;
import cn.moonshotacademy.bingo.entity.VideoEntity;
import cn.moonshotacademy.bingo.service.JWTService;
import cn.moonshotacademy.bingo.service.QuestionService;

@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private JWTService jwtService;
    @Autowired
    private QuestionService questionService;

    @PostMapping("/choose")
    public ResponseDto<List<Long>> getvideos(@RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "").trim();
        System.out.println(token);
        Long teamId = Long.parseLong(jwtService.decodeJwt(token));  
        return ResponseDto.success(questionService.chooseQuestion(teamId));

    }
    @PostMapping("/show")
    public ResponseDto<List<QuestionEntity>> getquestions(@RequestBody GetQDto getQDto) {
        return ResponseDto.success(questionService.showQuestion(getQDto.getVID()));
    }
    @PostMapping("/loadvideo")
    public ResponseDto<VideoEntity> getVideoDetail(@RequestBody GetVDto getVDto) {
        return ResponseDto.success(questionService.showVideoDetailEntity(getVDto.getVID()));
    }
    @PostMapping("/showchoices")
    public ResponseDto<List<ChoiceEntity>> getChoices(@RequestBody GetCDto getCDto) {
        return ResponseDto.success(questionService.showChoices(getCDto.getQID()));
    }
    @GetMapping("/state")
    public ResponseDto<List<VideoStateDTO>> getstate(@RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "").trim();
        Long teamId = Long.parseLong(jwtService.decodeJwt(token));  
        return ResponseDto.success(questionService.showStates(teamId));

    }
    @PostMapping("/setstate")
    public ResponseDto<Void> setstate(@RequestBody setStateDto setstate) {
        questionService.setStates(setstate.getTeamId(), setstate.getVideoId(), setstate.getState());
        return ResponseDto.success();

    }
}
