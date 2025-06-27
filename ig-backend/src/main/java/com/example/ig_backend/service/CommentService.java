package com.example.ig_backend.service;

import com.example.ig_backend.exception.CommentException;
import com.example.ig_backend.exception.PostException;
import com.example.ig_backend.exception.UserException;
import com.example.ig_backend.modal.Comment;

public interface CommentService {

    public Comment createComment(Comment comment,Integer postId,Integer userId) throws UserException, PostException;

    public Comment findCommentById(Integer commentId) throws CommentException;

    public Comment likeComment(Integer commentId,Integer userId) throws CommentException,UserException;

    public Comment unLikeComment(Integer commentId,Integer userId) throws CommentException,UserException;
}
