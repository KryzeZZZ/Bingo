package cn.moonshotacademy.bingo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cn.moonshotacademy.bingo.entity.VideoEntity;

import java.util.List;
import java.util.Optional;

public interface VideoRepository extends JpaRepository<VideoEntity, Long> {
    public Optional<VideoEntity> findById(Long id);
    List<VideoEntity> findAll();
}
