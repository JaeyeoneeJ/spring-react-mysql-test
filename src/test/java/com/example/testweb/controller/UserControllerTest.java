package com.example.testweb.controller;

import com.example.testweb.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
class UserControllerTest {
    @Autowired
    UserService service;

    @Test
    @Transactional
    @Rollback(value = false)
    public void getUserList() {
        service.selectAll();
    }
}