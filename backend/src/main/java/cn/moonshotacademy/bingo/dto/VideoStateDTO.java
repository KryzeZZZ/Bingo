package cn.moonshotacademy.bingo.dto;

import cn.moonshotacademy.bingo.entity.VideoEntity;

public class VideoStateDTO {

    private VideoEntity video;
    private int state;

    // 构造函数
    public VideoStateDTO(VideoEntity video, int state) {
        this.video = video;
        this.state = state;
    }

    // Getters and Setters
    public VideoEntity getVideo() {
        return video;
    }

    public void setVideo(VideoEntity video) {
        this.video = video;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }
}
