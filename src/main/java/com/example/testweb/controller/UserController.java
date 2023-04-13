package com.example.testweb.controller;

import com.example.testweb.converter.UserConverter;
import com.example.testweb.exception.InvalidRequestException;
import com.example.testweb.model.User;
import com.example.testweb.service.UserService;
import com.example.testweb.ui.request.UserRequest;
import com.example.testweb.ui.response.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@RestController
@RequestMapping("/api/user")
public class UserController {
    // DI 대상
    @Autowired
    private UserService service;

    @GetMapping("")
    public Iterable<User> getUserList() {
        return service.selectAll();
    }

    @GetMapping("/{searchId}")
    public Iterable<User> getSearchUserByAccountId(@PathVariable @NotBlank @Size(min=2, max=64) String searchId) {
        return service.searchUser(searchId);
    }

    @PostMapping("")
    public UserResponse postUser(@Valid @RequestBody UserRequest userRequest) {
        User user = service.createUser(userRequest);
        return UserConverter.userToResponse(user);
    }

    @PutMapping("/{id}")
    public UserResponse putUser(@PathVariable @NotBlank Integer id,
                                @Valid @RequestBody UserRequest userRequest) {
        if(!id.equals(userRequest.getId())) {
            throw new InvalidRequestException("id mismatch");
        }

        User user = service.updateUser(id, userRequest);
        return UserConverter.userToResponse(user);
    }

    @DeleteMapping("/{accountId}")
    public void deleteUser(UserRequest userRequest) {
        service.deleteUserById(userRequest.getAccountId());
    }

}
