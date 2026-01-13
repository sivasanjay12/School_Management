package com.example.demo.Services;

public interface Login_interface {

	 boolean validateLogin(String email, String password);
	 boolean createUser(String username, String email, String password); 
}
