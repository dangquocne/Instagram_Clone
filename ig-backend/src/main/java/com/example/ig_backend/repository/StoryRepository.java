package com.example.ig_backend.repository;

import com.example.ig_backend.modal.Post;
import com.example.ig_backend.modal.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StoryRepository extends JpaRepository<Story,Integer> {

    @Query("select s from Story s where s.user.id IN :users  ")
    public List<Story> findAllStoryByUserIds(@Param("users") List<Integer> userIds);
}
