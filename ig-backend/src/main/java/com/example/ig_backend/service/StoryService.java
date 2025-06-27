package com.example.ig_backend.service;

import com.example.ig_backend.exception.StoryException;
import com.example.ig_backend.exception.UserException;
import com.example.ig_backend.modal.Story;

import java.util.List;

public interface StoryService {

    public Story createStory(Story story,Integer userId) throws UserException;

    public List<Story> findStoryByUserId(Integer userId) throws StoryException, UserException;



}
