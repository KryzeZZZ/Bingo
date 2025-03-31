package cn.moonshotacademy.bingo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@NoArgsConstructor
@Table(name = "teams")
public class TeamEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private Long sessionsNum;
    
    private boolean isDefault;

    @OneToMany(mappedBy = "team")
    @JsonIgnore
    private Set<TeamVideo> teamVideos = new HashSet<>();
    
    // 可选构造函数、getter、setter等
}
