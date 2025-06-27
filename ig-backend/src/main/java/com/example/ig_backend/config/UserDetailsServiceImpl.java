package com.example.ig_backend.config;

import com.example.ig_backend.modal.User;
import com.example.ig_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> otp = userRepository.findByEmail(username);

        if (otp.isPresent()) {
            User user = otp.get();

            List<GrantedAuthority> authorities = new ArrayList<>();

            return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),authorities);
        }
       throw new BadCredentialsException("User not found with usename: " + username)  ;
    }
}
