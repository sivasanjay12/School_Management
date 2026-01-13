package com.example.demo.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Entity.StudentsDB;
import com.example.demo.Repository.Students_Repository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class Login_Implement {
    // Remove "implements Login_interface" if interface doesn't exist
    
    @Autowired(required = false) // Make optional if repository might not exist
    private Students_Repository repo;
    
    @Autowired(required = false) // Make optional
    private BCryptPasswordEncoder passwordEncoder;
    
    // For login validation
    public boolean validateLogin(String email, String rawPassword) {
        try {
            if (repo == null || passwordEncoder == null) {
                System.out.println("Repository or PasswordEncoder not available");
                return false;
            }
            
            System.out.println("Login attempt for email: " + email);
            
            // Find user by email
            StudentsDB student = repo.findByEmail(email);
            
            if (student == null) {
                System.out.println("User not found");
                return false;
            }
            
            // Compare password
            boolean isMatch = passwordEncoder.matches(rawPassword, student.getPassword());
            System.out.println("Password match: " + isMatch);
            
            return isMatch;
        } catch (Exception e) {
            System.out.println("Error in validateLogin: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
    
    // For user creation
    public boolean createUser(String username, String email, String rawPassword) {
        try {
            if (repo == null || passwordEncoder == null) {
                System.out.println("Repository or PasswordEncoder not available");
                return false;
            }
            
            System.out.println("Creating user: " + email);
            
            // Check if user exists
            StudentsDB existingStudent = repo.findByEmail(email);
            if (existingStudent != null) {
                System.out.println("User already exists: " + email);
                return false;
            }
            
            // Encrypt password
            String encryptedPassword = passwordEncoder.encode(rawPassword);
            
            // Create new user
            StudentsDB newStudent = new StudentsDB();
            newStudent.setEmail(email);
            newStudent.setPassword(encryptedPassword);
            
            // Save to database
            repo.save(newStudent);
            System.out.println("User created successfully: " + email);
            
            return true;
        } catch (Exception e) {
            System.out.println("Error in createUser: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
}