package cn.moonshotacademy.bingo.repository;

import cn.moonshotacademy.bingo.dto.VideoStateDTO;
import cn.moonshotacademy.bingo.entity.TeamVideo;
import cn.moonshotacademy.bingo.entity.VideoEntity;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TeamVideoRepository extends JpaRepository<TeamVideo, Long> {
    public List<TeamVideo> findAllByTeam_Id(Long teamid);
    @Query("SELECT new cn.moonshotacademy.bingo.dto.VideoStateDTO(tv.video, tv.state) " +
           "FROM TeamVideo tv WHERE tv.team.id = :teamid")
    public List<VideoStateDTO> showStates(Long teamid);
    Optional<TeamVideo> findByTeam_IdAndVideo_Id(Long teamId, Long videoId);

}
