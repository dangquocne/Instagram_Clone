package com.example.ig_backend.service.impl;

import com.example.ig_backend.dto.UserDto;
import com.example.ig_backend.exception.StoryException;
import com.example.ig_backend.exception.UserException;
import com.example.ig_backend.modal.Story;
import com.example.ig_backend.modal.User;
import com.example.ig_backend.repository.StoryRepository;
import com.example.ig_backend.repository.UserRepository;
import com.example.ig_backend.service.StoryService;
import com.example.ig_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StoryServiceImpl implements StoryService {

    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Story createStory(Story story, Integer userId) throws UserException {

        User user = userService.findUserById(userId);

        UserDto userDto= new UserDto();

        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUsername(user.getUsername());
        userDto.setUserImage(user.getImage());
        story.setUser(userDto);
        story.setTimestamp(LocalDateTime.now());
//        Story createStory = storyRepository.save(story);
        user.getStories().add(story);

        return storyRepository.save(story) ;
    }

    @Override
    public List<Story> findStoryByUserId(Integer userId) throws StoryException, UserException {

        User user = userService.findUserById(userId);

        List<Story> stories = user.getStories();
        if (stories.size() == 0) {
            throw  new StoryException("this user doesn't have any stories");
        }


        return stories;
    }
}
