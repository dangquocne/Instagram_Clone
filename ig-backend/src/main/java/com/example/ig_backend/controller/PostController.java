package com.example.ig_backend.controller;

import com.example.ig_backend.exception.PostException;
import com.example.ig_backend.exception.UserException;
import com.example.ig_backend.modal.Post;
import com.example.ig_backend.modal.User;
import com.example.ig_backend.response.MessageResponse;
import com.example.ig_backend.service.PostService;
import com.example.ig_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Post> createPostHandler(@RequestBody Post post, @RequestHeader("Authorization") String token) throws UserException {
        User user = userService.findUserProfile(token);
        Post createdPost=postService.createPost(post, user.getId());

    return new ResponseEntity<Post>(createdPost, HttpStatus.OK);
}

    // @RequestBody Post post,@RequestHeader("Authorization") String token
    @GetMapping("/all/{id}")
    public ResponseEntity<List<Post>> findPostByUserIdHandler(@PathVariable("id") Integer userId) throws UserException {
        List<Post> posts=postService.findPostByUserId(userId);

        return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
    }


    @GetMapping("/following/{userIds}")
    public ResponseEntity<List<Post>> findAllPostByUserIdsHandler(@PathVariable("userIds") List<Integer> userIds) throws UserException, PostException {
        List<Post> posts=postService.findAllPostByUserId(userIds);

        return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Post> findPostByIdHandler(@PathVariable Integer postId) throws PostException, UserException {

        Post post=postService.findPostById(postId);

        return new ResponseEntity<Post>(post, HttpStatus.OK);
    }

    @PutMapping("/like/{postId}")
    public ResponseEntity<Post> likePostHandler(@PathVariable Integer postId,@RequestHeader("Authorization") String token) throws  UserException, PostException {
        User user=userService.findUserProfile(token);
        Post likedPost=postService.likePost(postId, user.getId());

        return new ResponseEntity<Post>(likedPost, HttpStatus.OK);
    }



    @PutMapping("/unLike/{postId}")
    public ResponseEntity<Post> unLikePostHandler(@PathVariable Integer postId, @RequestHeader("Authorization") String token) throws  UserException, PostException {
        User user=userService.findUserProfile(token);
        Post unLikedPost=postService.unLikePost(postId, user.getId());

        return new ResponseEntity<Post>(unLikedPost, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<MessageResponse> deletePostHandler(@PathVariable Integer postId, @RequestHeader("Authorization") String token) throws UserException, PostException {

        User user=userService.findUserProfile(token);

        String message=postService.deletePost(postId, user.getId());

        MessageResponse res=new MessageResponse(message);

        return new ResponseEntity<MessageResponse>(res, HttpStatus.ACCEPTED);
    }


    @PutMapping("/save_post/{postId}")
    public ResponseEntity<MessageResponse> savedPostHandler(@PathVariable Integer postId, @RequestHeader("Authorization") String token) throws UserException, PostException {

        User user=userService.findUserProfile(token);

        String message=postService.savedPost(postId, user.getId());

        MessageResponse res=new MessageResponse(message);

        return new ResponseEntity<MessageResponse>(res, HttpStatus.ACCEPTED);
    }



    @PutMapping("/unSave_post/{postId}")
    public ResponseEntity<MessageResponse> unSavedPostHandler(@PathVariable Integer postId, @RequestHeader("Authorization") String token) throws UserException, PostException {

        User user=userService.findUserProfile(token);

        String message=postService.unSavedPost(postId, user.getId());

        MessageResponse res=new MessageResponse(message);

        return new ResponseEntity<MessageResponse>(res, HttpStatus.ACCEPTED);
    }

}
