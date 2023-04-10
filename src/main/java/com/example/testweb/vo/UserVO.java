package com.example.testweb.vo;

import lombok.Data;

import java.time.LocalTime;

@Data
public class UserVO {
    int id;
    String name;
    int age;
    LocalTime createDate;
}
