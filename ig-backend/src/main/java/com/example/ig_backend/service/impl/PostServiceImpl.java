package com.example.ig_backend.service.impl;

import com.example.ig_backend.dto.UserDto;
import com.example.ig_backend.exception.PostException;
import com.example.ig_backend.exception.UserException;
import com.example.ig_backend.modal.Post;
import com.example.ig_backend.modal.User;
import com.example.ig_backend.repository.PostRepository;
import com.example.ig_backend.repository.UserRepository;
import com.example.ig_backend.service.PostService;
import com.example.ig_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {


    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Post createPost(Post post,Integer userId) throws UserException {

        User user = userService.findUserById(userId);

        UserDto userDto= new UserDto();

        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUsername(user.getUsername());
        userDto.setUserImage(user.getImage());
        post.setUser(userDto);
        post.setCreatedAt(LocalDateTime.now());
        Post createdPost = postRepository.save(post);
        return createdPost;
    }

    @Override
    public String deletePost(Integer postId, Integer userId) throws PostException, UserException {
        Post post = findPostById(postId);

        User user = userService.findUserById(userId);

        if (post.getUser().getId().equals(user.getId())) {
            postRepository.deleteById(post.getId());
            return "Post deleted successfully";
        }

        throw new PostException("You can't delete other user's post");
    }

    @Override
    public List<Post> findPostByUserId(Integer userId) throws UserException {

        List<Post> posts = postRepository.findByUserId(userId);
        if(posts.size()==0){
            throw new UserException("this user does not have any post");
        }
        return posts;
    }

    @Override
    public Post findPostById(Integer postId) throws PostException, UserException {

        Optional<Post> otp = postRepository.findById(postId);
        if (otp.isPresent()){
            return otp.get();
        }
        throw new PostException("Post not exists with id: "+postId);
    }

    @Override
    public List<Post> findAllPostByUserId(List<Integer> userIds) throws PostException, UserException {
        List<Post> posts = postRepository.findAllPostByUserIds(userIds);
        if(posts.size()==0){
            throw new PostException("No post available");
        }
        return posts;
    }

    @Override
    public String savedPost(Integer postId, Integer userId) throws PostException, UserException {
        Post post = findPostById(postId);

        User user = userService.findUserById(userId);

       if (!user.getSavedPost().contains(post)){
           user.getSavedPost().add(post);
           userRepository.save(user);
       }

        return "Post saved successfully";
    }

    @Override
    public String unSavedPost(Integer postId, Integer userId) throws PostException, UserException {
        Post post = findPostById(postId);

        User user = userService.findUserById(userId);

        if (user.getSavedPost().contains(post)){
            user.getSavedPost().remove(post);
            userRepository.save(user);
        }

        return "Post Remove successfully";
    }

    @Override
    public Post likePost(Integer postId, Integer userId) throws PostException, UserException {
        Post post = findPostById(postId);

        User user = userService.findUserById(userId);
        UserDto userDto= new UserDto();

        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUsername(user.getUsername());
        userDto.setUserImage(user.getImage());

        post.getLikedByUsers().add(userDto);

        return postRepository.save(post);
    }

    @Override
    public Post unLikePost(Integer postId, Integer userId) throws PostException, UserException {
        Post post = findPostById(postId);

        User user = userService.findUserById(userId);
        UserDto userDto= new UserDto();

        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUsername(user.getUsername());
        userDto.setUserImage(user.getImage());

        post.getLikedByUsers().remove(userDto);

        return postRepository.save(post);
    }
}
