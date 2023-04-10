package com.example.testweb.repository;

import com.example.testweb.model.User;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    @Query("SELECT accountId FROM user WHERE accountId LIKE %:accountId%")
    User findByAccountId(String accountId);

    @Query("DELETE FROM user WHERE accountId LIKE %:accountId%")
    void deleteByAccountId(String accountId);
}
