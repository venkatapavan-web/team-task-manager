package com.teamtaskmanager.dto;

import com.teamtaskmanager.entity.User;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;

    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?\":{}|<>]).*$", 
             message = "Password must contain at least one uppercase letter and one special character")
    private String password;
    
    private User.Role role;
}
