package com.example.realstate.exception;

public class ApiException extends RuntimeException {

    private String message;
    private int statusCode;

    public ApiException(String message, int statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public int getStatusCode() {
        return statusCode;
    }
}
