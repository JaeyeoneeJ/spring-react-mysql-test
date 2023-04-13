package com.example.testweb.ui.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class UserRequest {

    Integer id;
    @NotBlank
    @Size(min=6, max=16)
    String accountId;

    @NotBlank
    @Size(min=1, max=20)
    String name;

    @NotNull
    Integer age;
}
