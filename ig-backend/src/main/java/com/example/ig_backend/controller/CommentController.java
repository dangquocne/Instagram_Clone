package com.example.ig_backend.controller;

import com.example.ig_backend.exception.CommentException;
import com.example.ig_backend.exception.PostException;
import com.example.ig_backend.exception.UserException;
import com.example.ig_backend.modal.Comment;
import com.example.ig_backend.modal.Post;
import com.example.ig_backend.modal.User;
import com.example.ig_backend.service.CommentService;
import com.example.ig_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;


    @PostMapping("/create/{postId}")
    public ResponseEntity<Comment> createCommentHandler(@RequestBody Comment comment, @PathVariable Integer postId,@RequestHeader("Authorization") String token) throws UserException, PostException {
        User user = userService.findUserProfile(token);
        Comment createComment = commentService.createComment(comment, postId, user.getId());

        return new ResponseEntity<Comment>(createComment, HttpStatus.OK);
    }


    @GetMapping("/{commentId}")
    public ResponseEntity<Comment> findCommentByIdHandler(@PathVariable Integer commentId) throws  CommentException {

        Comment commentById = commentService.findCommentById(commentId);

        return new ResponseEntity<Comment>(commentById, HttpStatus.OK);
    }


    @PutMapping("/like/{commentId}")
    public ResponseEntity<Comment> likeCommentHandler(@PathVariable Integer commentId,@RequestHeader("Authorization") String token) throws UserException,  CommentException {
        User user=userService.findUserProfile(token);
        Comment likeComment = commentService.likeComment(commentId, user.getId());

        return new ResponseEntity<Comment>(likeComment, HttpStatus.OK);
    }



    @PutMapping("/unlike/{commentId}")
    public ResponseEntity<Comment> unLikeCommentHandler(@PathVariable Integer commentId, @RequestHeader("Authorization") String token) throws UserException, CommentException {
        User user=userService.findUserProfile(token);
        Comment unLikeComment = commentService.unLikeComment(commentId, user.getId());

        return new ResponseEntity<Comment>(unLikeComment, HttpStatus.OK);
    }




}
