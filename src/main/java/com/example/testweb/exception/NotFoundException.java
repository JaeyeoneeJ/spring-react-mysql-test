package com.example.testweb.exception;

public class NotFoundException extends TestWebException {
    public NotFoundException() {
        super("Not Found");
    }

    public NotFoundException(String message) {
        super(message);
    }
}
