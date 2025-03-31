package cn.moonshotacademy.bingo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "team_video")
public class TeamVideo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "team_id", nullable = false)
    private TeamEntity team;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "video_id", nullable = false)
    private VideoEntity video;

    @Column(nullable = false)
    private int state;  // 用来表示状态

    // 可选：你可以添加构造函数、getter、setter等
    public TeamVideo(TeamEntity team, VideoEntity video, int state) {
        this.team = team;
        this.video = video;
        this.state = state;
    }
}
