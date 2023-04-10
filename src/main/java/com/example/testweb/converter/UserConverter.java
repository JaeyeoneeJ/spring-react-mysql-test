package com.example.testweb.converter;

import com.example.testweb.model.User;
import com.example.testweb.ui.request.UserRequest;
import com.example.testweb.ui.response.UserResponse;

public class UserConverter {
    public static UserResponse userToResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .accountId(user.getAccountId())
                .name(user.getName())
                .age(user.getAge())
                .build();
    }

    public static User requestToUser(UserRequest userRequest) {
        User user = new User();
        System.out.println("-----userRequest----: " + userRequest);
        user.setAccountId(userRequest.getAccountId());
        user.setName(userRequest.getName());
        user.setAge(userRequest.getAge());
        System.out.println("-----userRequest -=> user: ----" + user);
        return user;
    }
}
