//package com.example.demo.Controller;
////
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//
//import com.example.demo.Entity.Login;
//import com.example.demo.Services.Login_Implement;
//import com.example.demo.Services.Student_Services;
////
//@RestController
//@RequestMapping("/auth")
//@CrossOrigin(origins = "http://localhost:5173")
//public class LoginController {
//
//    @Autowired
//    private Login_Implement service;
//    
//
//    @PostMapping("/login")
//    public String login(@RequestBody Login loginRequest) {
//
//        boolean valid = service.validateLogin(
//            loginRequest.getEmail(),
//            loginRequest.getPassword()
//        );
//
//        if (valid) {
//            return "Login Successful";
//        } else {
//            return "Invalid Email or Password";
//        }
//    }
//}


package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.Login;
import com.example.demo.Services.Login_Implement;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173") // ADD THIS LINE
public class LoginController {

    @Autowired
    private Login_Implement service;
    

    @PostMapping("/login")
    public String login(@RequestBody Login loginRequest) {
        boolean valid = service.validateLogin(
            loginRequest.getEmail(),
            loginRequest.getPassword()
        );

        if (valid) {
            return "Login Successful";
        } else {
            return "Invalid Email or Password";
        }
    }
}