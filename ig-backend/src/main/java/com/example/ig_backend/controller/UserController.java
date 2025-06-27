package com.example.ig_backend.controller;

import com.example.ig_backend.exception.PostException;
import com.example.ig_backend.exception.UserException;
import com.example.ig_backend.modal.User;
import com.example.ig_backend.repository.UserRepository;
import com.example.ig_backend.response.MessageResponse;
import com.example.ig_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.prefs.BackingStoreException;

@CrossOrigin(origins = "*", exposedHeaders = "Authorization")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<User> registerUsers(@RequestBody User user) throws UserException {
        User saveUser = userService.registerUser(user);
        return new ResponseEntity<User>(saveUser, HttpStatus.CREATED);

    }
    @GetMapping("/id/{id}")
    public ResponseEntity<User> findUserByIdHandle(@PathVariable Integer id) throws UserException {
        User user = userService.findUserById(id);
        return new ResponseEntity<User>(user, HttpStatus.OK);

    }


    @GetMapping("/username/{username}")
    public ResponseEntity<User> findUserByUserNameHandler(@PathVariable String username) throws UserException {
        User users = userService.findUserByUsername(username);
        return new ResponseEntity<User>(users, HttpStatus.OK);
    }


    @GetMapping("/m/{userIds}")
    public ResponseEntity<List<User>> findUserByUserIdsHandler(@PathVariable List<Integer> userIds) throws UserException {
        List<User> users = userService.findUserByIds(userIds);
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    // /api/users/search?q="query"
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUserHandler(@RequestParam("q") String query) throws Exception {
        List<User> users = userService.searchUser(query);
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    @GetMapping("/signin")
    public ResponseEntity<User> singinHandler(Authentication auth) throws BadCredentialsException {

        Optional<User> otp = userRepository.findByEmail(auth.getName());

        if (otp.isPresent()){
            return new ResponseEntity<User>(otp.get(), HttpStatus.ACCEPTED);
        }
        throw new BadCredentialsException("Invalid username or password");
    }


    @PutMapping("/follow/{followUserId}")
    public ResponseEntity<MessageResponse> followUserHandler(@PathVariable Integer followUserId, @RequestHeader("Authorization") String token) throws UserException{

        User user = userService.findUserProfile(token);

        String message=userService.followUser(user.getId(),followUserId);

        MessageResponse res=new MessageResponse(message);

        return new ResponseEntity<MessageResponse>(res, HttpStatus.ACCEPTED);
    }


    @PutMapping("/unfollow/{followUserId}")
    public ResponseEntity<MessageResponse> unFollowUserHandler(@PathVariable Integer followUserId, @RequestHeader("Authorization") String token) throws UserException{

        User user = userService.findUserProfile(token);

        String message=userService.unFollowUser(user.getId(),followUserId);

        MessageResponse res=new MessageResponse(message);

        return new ResponseEntity<MessageResponse>(res, HttpStatus.ACCEPTED);
    }

    @GetMapping("/req")
    public ResponseEntity<User> findUserProfileHandler(@RequestHeader("Authorization") String token) throws Exception {
        User user = userService.findUserProfile(token);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @PutMapping("/account/edit")
    public ResponseEntity<User> updateUserHandler(@RequestHeader("Authorization") String token,@RequestBody User user) throws Exception {
        User reqUser = userService.findUserProfile(token);
        User updateUser = userService.updateUserDetails(user, reqUser);
        return new ResponseEntity<User>(updateUser, HttpStatus.OK);
    }
}
