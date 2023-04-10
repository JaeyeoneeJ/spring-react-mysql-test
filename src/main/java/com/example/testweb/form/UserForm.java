package com.example.testweb.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserForm {
    // 식별 ID
    private Integer id;
    // 유저 이름
    @NotBlank
    private String name;
    // 유저 나이
    private int age;
    // 생성 시간
    private LocalTime createDate;

    // 등록 또는 변경 판단용
    private Boolean newUser;
}
