package cn.moonshotacademy.bingo.service;

import java.util.List;

import cn.moonshotacademy.bingo.dto.VideoStateDTO;
import cn.moonshotacademy.bingo.entity.ChoiceEntity;
import cn.moonshotacademy.bingo.entity.QuestionEntity;
import cn.moonshotacademy.bingo.entity.TeamVideo;
import cn.moonshotacademy.bingo.entity.VideoEntity;


public interface QuestionService {
    
    public List<Long> chooseQuestion(Long teamid);
    public List<ChoiceEntity> showChoices(Long qId);
    public List<QuestionEntity> showQuestion(Long teamId);
    public VideoEntity showVideoDetailEntity(Long videoId);
    public List<VideoStateDTO> showStates(Long teamid);
    public void setStates(Long teamid, Long videoId, int state);
}