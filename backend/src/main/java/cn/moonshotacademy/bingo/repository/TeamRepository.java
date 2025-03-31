package cn.moonshotacademy.bingo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cn.moonshotacademy.bingo.entity.TeamEntity;

import java.util.Optional;

public interface TeamRepository extends JpaRepository<TeamEntity, Long> {

    public Optional<TeamEntity> findByName(String username);
    public Optional<TeamEntity> findById(Long id);
}
