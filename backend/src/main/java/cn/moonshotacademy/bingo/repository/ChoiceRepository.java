package cn.moonshotacademy.bingo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cn.moonshotacademy.bingo.entity.ChoiceEntity;

import java.util.List;

public interface ChoiceRepository extends JpaRepository<ChoiceEntity, Long> {
    public List<ChoiceEntity> findByqId(Long QId);
}   
