package cn.moonshotacademy.bingo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import cn.moonshotacademy.bingo.dto.*;
import cn.moonshotacademy.bingo.entity.ChoiceEntity;
import cn.moonshotacademy.bingo.entity.VideoEntity;
import cn.moonshotacademy.bingo.service.QuestionService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    private Long getTeamIdFromSession(HttpSession session) {
        Long teamId = (Long) session.getAttribute("teamId");
        if (teamId == null) {
            throw new RuntimeException("未登录或会话失效");
        }
        return teamId;
    }

    @PostMapping("/choose")
    public ResponseDto<List<Long>> getVideos(HttpSession session) {
        Long teamId = getTeamIdFromSession(session);
        return ResponseDto.success(questionService.chooseQuestion(teamId));
    }

    @PostMapping("/show")
    public ResponseDto<List<resQDto>> getQuestions(@RequestBody GetQDto getQDto) {
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
    public ResponseDto<List<VideoStateDTO>> getState(HttpSession session) {
        Long teamId = getTeamIdFromSession(session);
        return ResponseDto.success(questionService.showStates(teamId));
    }

    @PostMapping("/setstate")
    public ResponseDto<Void> setState(HttpSession session, @RequestBody setStateDto setstate) {
        Long teamId = getTeamIdFromSession(session);
        questionService.setStates(teamId, setstate.getVideoId(), setstate.getState());
        return ResponseDto.success();
    }

    @PostMapping("/submit")
    public ResponseDto<Boolean> submit(HttpSession session, @RequestBody submitDto submitdto) {
        Long teamId = getTeamIdFromSession(session);
        return ResponseDto.success(questionService.submit(teamId, submitdto.getVid(), submitdto.getQid(), submitdto.getCid()));
    }
}
