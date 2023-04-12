package com.example.testweb.service.impl;


import com.example.testweb.converter.UserConverter;
import com.example.testweb.exception.DuplicatedException;
import com.example.testweb.exception.NotFoundException;
import com.example.testweb.model.User;
import com.example.testweb.repository.UserRepository;
import com.example.testweb.service.UserService;
import com.example.testweb.ui.request.UserRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    // Repository: 인젝션
    private UserRepository repository;

    @Override
    @Transactional(readOnly = true)
    public Iterable<User> selectAll() {
        return  repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findByAccountId(String accountId) {
        return Optional.ofNullable(repository.findByAccountId(accountId));
    }

    @Override
    @Transactional
    public User createUser(UserRequest userRequest) {
        if (repository.findByAccountId(userRequest.getAccountId()) != null) {
            throw new DuplicatedException("AccountId is duplicated");
        }
        User user = UserConverter.requestToUser(userRequest);
        user = repository.save(user);
        return user;
    }

    @Override
    @Transactional
    public User updateUser(Integer id, UserRequest userRequest) {
        if (repository.findById(userRequest.getId()).isPresent()) {
            User user = repository.findById(userRequest.getId()).get();
            user.setAccountId(userRequest.getAccountId());
            user.setName(userRequest.getName());
            user.setAge(userRequest.getAge());
            user = repository.save(user);
            return user;
        } else {
            throw new NotFoundException("Not found account");
        }
    }

    @Override
    @Transactional
    public void deleteUserById(String accountId) {
        if (repository.findByAccountId(accountId)==null) {
            throw new NotFoundException("Not found account");
        } else {
            repository.deleteByAccountId(accountId);
        }
    }
}
