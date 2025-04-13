package cn.moonshotacademy.bingo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cn.moonshotacademy.bingo.entity.UserEntity;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    public Optional<UserEntity> findById(Long id);
}
