package com.example.ig_backend.controller;

import com.example.ig_backend.exception.CommentException;
import com.example.ig_backend.exception.PostException;
import com.example.ig_backend.exception.StoryException;
import com.example.ig_backend.exception.UserException;
import com.example.ig_backend.modal.Comment;
import com.example.ig_backend.modal.Story;
import com.example.ig_backend.modal.User;
import com.example.ig_backend.service.StoryService;
import com.example.ig_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/stories")
public class StoryController {

    @Autowired
    private StoryService storyService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Story> createStoryHandler(@RequestBody Story story,  @RequestHeader("Authorization") String token) throws UserException {
        User user = userService.findUserProfile(token);
        Story createStory = storyService.createStory(story, user.getId());

        return new ResponseEntity<Story>(createStory, HttpStatus.OK);
    }


    @GetMapping("/all/{userIds}")
    public ResponseEntity<List<Story>> findAllStoryByUserIdHandler(@PathVariable Integer userIds) throws CommentException, UserException, StoryException {

        User user = userService.findUserById(userIds);
        List<Story> story = storyService.findStoryByUserId(user.getId());

        return new ResponseEntity<List<Story>>(story, HttpStatus.OK);
    }
}
