package com.example.ig_backend.service.impl;

import com.example.ig_backend.dto.UserDto;
import com.example.ig_backend.exception.UserException;
import com.example.ig_backend.modal.User;
import com.example.ig_backend.repository.UserRepository;
import com.example.ig_backend.security.JwtTokenClaims;
import com.example.ig_backend.security.JwtTokenProvide;
import com.example.ig_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

@Autowired
    private JwtTokenProvide jwtTokenProvide;

    @Override
    public User registerUser(User user) throws UserException {

        Optional<User> exitsEmail = userRepository.findByEmail(user.getEmail());
        if (exitsEmail.isPresent()) {
            throw new UserException("Email already exists");
        }

        Optional<User> exitsUserName = userRepository.findByUsername(user.getUsername());

        if (exitsUserName.isPresent()) {
            throw new UserException("Username already exists");
        }

        if (user.getEmail()==null || user.getUsername()==null || user.getPassword()==null || user.getName()==null) {
            throw new UserException("All fields are required");
        }

        User newUser = new User();

        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
//        newUser.setPassword(user.getPassword());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setName(user.getName());
        return userRepository.save(newUser);
    }

    @Override
    public User findUserById(Integer userId) throws UserException {

        Optional<User> otp = userRepository.findById(userId);
        if (otp.isPresent()) {
            return otp.get();
        }
        throw new UserException("User not found id: "+userId);
    }

    @Override
    public User findUserProfile(String token) throws UserException {

        token= token.substring(7);

        JwtTokenClaims jwtTokenClaims= jwtTokenProvide.getClaimsFromToken(token);

        String email =jwtTokenClaims.getUsername();

        Optional<User> otp = userRepository.findByEmail(email);

        if (otp.isPresent()) {
            return otp.get();
        }

        throw new UserException("Invalid token.....");
    }

    @Override
    public User findUserByUsername(String username) throws UserException {
        Optional<User> otp = userRepository.findByUsername(username);
        if (otp.isPresent()) {
            return otp.get();
        }
        throw new UserException("User not found name: "+username);
    }

    @Override
    public String followUser(Integer reqUserId, Integer followUserId) throws UserException {

       User reqUser =findUserById(reqUserId);

       User followUser = findUserById(followUserId);

        UserDto follower= new UserDto();

        follower.setEmail(reqUser.getEmail());
        follower.setId(reqUser.getId());
        follower.setName(reqUser.getName());
        follower.setUserImage(reqUser.getImage());
        follower.setUsername(reqUser.getUsername());


        UserDto following = new UserDto();
        following.setEmail(followUser.getEmail());
        following.setId(followUser.getId());
        following.setName(followUser.getName());
        following.setUserImage(followUser.getImage());
        following.setUsername(followUser.getUsername());

        reqUser.getFollowing().add(following);
        followUser.getFollower().add(follower);

        userRepository.save(reqUser);
        userRepository.save(followUser);
        return "you are following "+followUser.getUsername();
    }

    @Override
    public String unFollowUser(Integer reqUserId, Integer followUserId) throws UserException {
        User reqUser =findUserById(reqUserId);

        User followUser = findUserById(followUserId);

        UserDto follower= new UserDto();

        follower.setEmail(reqUser.getEmail());
        follower.setId(reqUser.getId());
        follower.setName(reqUser.getName());
        follower.setUserImage(reqUser.getImage());
        follower.setUsername(reqUser.getUsername());


        UserDto following = new UserDto();
        following.setEmail(followUser.getEmail());
        following.setId(followUser.getId());
        following.setName(followUser.getName());
        following.setUserImage(followUser.getImage());
        following.setUsername(followUser.getUsername());

        reqUser.getFollowing().remove(following);
        followUser.getFollower().remove(follower);

        userRepository.save(reqUser);
        userRepository.save(followUser);
        return "You are unfollowed "+followUser.getUsername();
    }

    @Override
    public List<User> findUserByIds(List<Integer> userIds) throws UserException {

        List<User> users = userRepository.findAllUsersByUserIds(userIds);
        return users;
    }

    @Override
    public List<User> searchUser(String query) throws UserException {
        List<User> users = userRepository.findByQuery(query);
        if (users.size()==0) {
            throw new UserException("User not found");
        }
        return users;
    }

    @Override
    public User updateUserDetails(User updatedUser, User existingUser) throws UserException {

        if (updatedUser.getEmail()!=null){
            existingUser.setEmail(updatedUser.getEmail());
        }
        if (updatedUser.getName()!=null){
            existingUser.setName(updatedUser.getName());
        }

        if (updatedUser.getUsername()!=null){
            existingUser.setUsername(updatedUser.getUsername());
        }


        if (updatedUser.getMobile()!=null){
            existingUser.setMobile(updatedUser.getMobile());
        }

        if (updatedUser.getBio()!=null){
            existingUser.setBio(updatedUser.getBio());
        }

        if (updatedUser.getGender()!=null){
            existingUser.setGender(updatedUser.getGender());
        }

        if (updatedUser.getWebsite()!=null){
            existingUser.setWebsite(updatedUser.getWebsite());
        }

        if (updatedUser.getImage()!=null){
            existingUser.setImage(updatedUser.getImage());
        }

        if (updatedUser.getId().equals(existingUser.getId())) {
            return userRepository.save(existingUser);
        }
        throw new UserException("You can't update this user");
    }
}
