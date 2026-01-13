package com.example.demo.Services;

import java.util.List;
import java.util.Optional;


import com.example.demo.Entity.StudentsDB;

public interface Student_Services {
	StudentsDB CreateEmployee(StudentsDB st);
	
	List getAllStudents();

	
	

}
