package com.example.ig_backend.modal;

import com.example.ig_backend.dto.UserDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "stories")
public class Story {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name="id",column = @Column(name="user_id")),
            @AttributeOverride(name = "email",column = @Column(name = "user_email"))
    })
    private UserDto user;

    @NotNull
    private String image;

    private String caption;

    private LocalDateTime timestamp;

}
