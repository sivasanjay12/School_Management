package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.StudentsDB;


@Repository
public interface Students_Repository extends JpaRepository<StudentsDB,Long> {

	StudentsDB findByEmail(String email);


	
	//List findByDepartment(String username);
//	List findByDepartment(String password);

}
