package com.example.ig_backend.repository;

import com.example.ig_backend.modal.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
