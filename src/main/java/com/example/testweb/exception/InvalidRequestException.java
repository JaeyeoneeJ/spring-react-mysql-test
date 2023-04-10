package com.example.testweb.exception;

public class InvalidRequestException extends TestWebException{
    public InvalidRequestException() {
        super("Invalid request");
    }

    public InvalidRequestException(String message) {
        super(message);
    }
}
