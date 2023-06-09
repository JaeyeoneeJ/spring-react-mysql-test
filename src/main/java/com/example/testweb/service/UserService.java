package com.example.testweb.service;

import com.example.testweb.model.User;
import com.example.testweb.ui.request.UserRequest;

public interface UserService {
    Iterable<User> selectAll();

    User createUser(UserRequest userRequest);
//    Optional<User> findByAccountId(String accountId);
    User updateUser(Integer id, UserRequest userRequest);
    void deleteUserById(String accountId);

    Iterable<User> searchUser(String searchId);
}
