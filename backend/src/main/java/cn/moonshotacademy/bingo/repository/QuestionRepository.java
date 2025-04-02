package cn.moonshotacademy.bingo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cn.moonshotacademy.bingo.entity.QuestionEntity;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<QuestionEntity, Long> {
    public List<QuestionEntity> findByVideoId(Long videoId);
    public Optional findById(int id);
}   
