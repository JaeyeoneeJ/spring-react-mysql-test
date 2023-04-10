package com.example.testweb.exception;

public class DuplicatedException extends TestWebException {
    public DuplicatedException() {
        super("Duplicated");
    }

    public DuplicatedException(String message) {
        super(message);
    }
}
