package com.example.demo.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.Config.AppConfig;
import com.example.demo.Entity.StudentsDB;
import com.example.demo.Repository.Students_Repository;


@Service
public class IMPL_Students implements Student_Services{
	
	@Autowired
	private Students_Repository repo;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Override
	public StudentsDB CreateEmployee(StudentsDB s) {
		String encryptedPassword = passwordEncoder.encode(s.getPassword());
        s.setPassword(encryptedPassword);
		return repo.save(s);
	}

	@Override
	public List getAllStudents() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	



}
