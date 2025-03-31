package cn.moonshotacademy.bingo.dto;
import lombok.Data;

@Data
public class setStateDto {
    
    private Long teamId, videoId;
    private int state;
}
