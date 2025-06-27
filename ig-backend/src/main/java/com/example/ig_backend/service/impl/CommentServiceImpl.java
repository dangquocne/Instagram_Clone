package com.example.ig_backend.service.impl;

import com.example.ig_backend.dto.UserDto;
import com.example.ig_backend.exception.CommentException;
import com.example.ig_backend.exception.PostException;
import com.example.ig_backend.exception.UserException;
import com.example.ig_backend.modal.Comment;
import com.example.ig_backend.modal.Post;
import com.example.ig_backend.modal.User;
import com.example.ig_backend.repository.CommentRepository;
import com.example.ig_backend.repository.PostRepository;
import com.example.ig_backend.service.CommentService;
import com.example.ig_backend.service.PostService;
import com.example.ig_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostRepository postRepository;

    @Override
    public Comment createComment(Comment comment, Integer postId, Integer userId) throws UserException, PostException {

        Post post = postService.findPostById(postId);

        User user = userService.findUserById(userId);

        UserDto userDto= new UserDto();

        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUsername(user.getUsername());
        userDto.setUserImage(user.getImage());
        comment.setUser(userDto);
        comment.setCreatedAt(LocalDateTime.now());
        Comment createdComment = commentRepository.save(comment);
        post.getComments().add(createdComment);
        postRepository.save(post);



        return createdComment;
    }

    @Override
    public Comment findCommentById(Integer commentId) throws CommentException {

        Optional<Comment> otp = commentRepository.findById(commentId);
        if (otp.isPresent()){
            return otp.get();
        }
        throw new CommentException("Comment not exists with id:"+commentId);
    }

    @Override
    public Comment likeComment(Integer commentId, Integer userId) throws CommentException, UserException {

        Comment comment = findCommentById(commentId);

        User user = userService.findUserById(userId);

        UserDto userDto= new UserDto();

        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUsername(user.getUsername());
        userDto.setUserImage(user.getImage());

        comment.getLikedByUsers().add(userDto);

        return commentRepository.save(comment);
    }

    @Override
    public Comment unLikeComment(Integer commentId, Integer userId) throws CommentException, UserException {
        Comment comment = findCommentById(commentId);

        User user = userService.findUserById(userId);

        UserDto userDto= new UserDto();

        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUsername(user.getUsername());
        userDto.setUserImage(user.getImage());

        comment.getLikedByUsers().remove(userDto);

        return commentRepository.save(comment);
    }
}
