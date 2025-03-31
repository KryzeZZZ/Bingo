package cn.moonshotacademy.bingo.service.impl;

import cn.moonshotacademy.bingo.dto.VideoStateDTO;
import cn.moonshotacademy.bingo.entity.ChoiceEntity;
import cn.moonshotacademy.bingo.entity.QuestionEntity;
import cn.moonshotacademy.bingo.entity.TeamEntity;
import cn.moonshotacademy.bingo.entity.TeamVideo;
import cn.moonshotacademy.bingo.entity.VideoEntity;
import cn.moonshotacademy.bingo.exception.BusinessException;
import cn.moonshotacademy.bingo.exception.ExceptionEnum;
import cn.moonshotacademy.bingo.repository.ChoiceRepository;
import cn.moonshotacademy.bingo.repository.QuestionRepository;
import cn.moonshotacademy.bingo.repository.TeamRepository;
import cn.moonshotacademy.bingo.repository.TeamVideoRepository;
import cn.moonshotacademy.bingo.repository.VideoRepository;
import cn.moonshotacademy.bingo.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private VideoRepository videoRepository;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private ChoiceRepository choiceRepository;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private TeamVideoRepository teamVideoRepository;

    @Override
public List<Long> chooseQuestion(Long teamid) {
    // 获取所有视频
    List<VideoEntity> avaQ = videoRepository.findAll();  // 确保查询没有条件限制
    List<VideoStateDTO> check = teamVideoRepository.showStates(teamid);
    if(check.isEmpty() == false) throw new BusinessException(ExceptionEnum.ALREADY_CHOSEN);
    if (avaQ.size() < 9) {
        throw new BusinessException(ExceptionEnum.NOT_ENOUGH_QUESTIONS);
    }

    // 提取视频的 id 列表
    List<Long> ids = avaQ.stream()
                         .map(VideoEntity::getId)
                         .collect(Collectors.toList());

    // 随机选择 9 个视频
    Random rand = new Random();
    List<Long> selectedIds = rand.ints(0, ids.size())  // 随机索引
                                  .distinct()
                                  .limit(9)
                                  .mapToObj(ids::get)
                                  .collect(Collectors.toList());

    // 获取选中的团队
    Optional<TeamEntity> teamEntityOptional = teamRepository.findById(teamid);
    if (!teamEntityOptional.isPresent()) {
        throw new BusinessException(ExceptionEnum.TEAM_NOT_FOUND);
    }
    TeamEntity teamEntity = teamEntityOptional.get();

    // 为每个视频创建关联，并设置状态
    for (Long id : selectedIds) {
        Optional<VideoEntity> videoEntityOptional = videoRepository.findById(id);
        if (videoEntityOptional.isPresent()) {
            VideoEntity videoEntity = videoEntityOptional.get();
            
            // 创建 TeamVideo 实体并设置 state
            TeamVideo teamVideo = new TeamVideo(teamEntity, videoEntity, 0); // 0 代表初始状态
            teamVideoRepository.save(teamVideo);
        }
    }

    // 返回选中的视频 IDs
    return selectedIds;
}


    @Override
    public List<VideoStateDTO> showStates(Long teamid) {
        return teamVideoRepository.showStates(teamid);
    }
    @Override
    public List<QuestionEntity> showQuestion(Long videoId) {
        List<QuestionEntity> relQ = questionRepository.findByVideoId(videoId);
        return relQ;
    }

    @Override
    public VideoEntity showVideoDetailEntity(Long videoId) {
        return videoRepository.findById(videoId).get();
    }

    @Override
    public List<ChoiceEntity> showChoices(Long qId) {
        return choiceRepository.findByqId(qId);
    }
    @Override
    public void setStates(Long teamid, Long videoId, int state) {
        Optional<TeamVideo> optionalTeamVideo = teamVideoRepository.findByTeam_IdAndVideo_Id(teamid, videoId);
        if (optionalTeamVideo.isPresent()) {
            TeamVideo teamVideo = optionalTeamVideo.get();
            teamVideo.setState(state); // 修改 state
            teamVideoRepository.save(teamVideo); // 保存到数据库
    }
}
}
