package com.example.ig_backend.dto;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class UserDto {

    private Integer id;

    private String username;
    private String name;
    private String email;
    private String userImage;


    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        UserDto userDto = (UserDto) object;
        return Objects.equals(id, userDto.id) && Objects.equals(username, userDto.username) && Objects.equals(name, userDto.name) && Objects.equals(email, userDto.email) && Objects.equals(userImage, userDto.userImage);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, name, email, userImage);
    }
}
