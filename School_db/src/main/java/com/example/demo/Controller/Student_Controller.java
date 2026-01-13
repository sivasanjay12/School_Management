 package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.StudentsDB;
import com.example.demo.Services.IMPL_Students;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/api/student")
public class Student_Controller {
	@Autowired
	private IMPL_Students IJ;
	
	@PostMapping
	public StudentsDB CreateEmployee(@RequestBody StudentsDB s) {
		return IJ.CreateEmployee(s);
	}
	
	@GetMapping
	public List getAllStudents() {
		return IJ.getAllStudents();
		
	}

}
