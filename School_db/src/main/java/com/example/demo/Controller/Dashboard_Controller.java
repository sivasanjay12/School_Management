//package com.example.demo.Controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import com.example.demo.Entity.Dashboard_Entity;
//import com.example.demo.Repository.Dashboard_Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/dashboard")
//@CrossOrigin(origins = "http://localhost:5173")
//public class Dashboard_Controller {
//    
//    @Autowired
//    private Dashboard_Repository studentRepository;
//    
//    // GET all students
//    @GetMapping
//    public ResponseEntity<List<Dashboard_Entity>> getAllStudents() {
//        try {
//            List<Dashboard_Entity> students = studentRepository.findAll();
//            return ResponseEntity.ok(students);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//    
//    // GET student by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<Dashboard_Entity> getStudentById(@PathVariable Long id) {
//        Optional<Dashboard_Entity> student = studentRepository.findById(id);
//        return student.map(ResponseEntity::ok)
//                     .orElse(ResponseEntity.notFound().build());
//    }
//    
//    // CREATE new student
//    @PostMapping
//    public ResponseEntity<Dashboard_Entity> createStudent(@RequestBody Dashboard_Entity student) {
//        try {
//            // Check if username or email already exists
//            if (studentRepository.existsByUsername(student.getUsername())) {
//                return ResponseEntity.badRequest().body(null);
//            }
//            if (studentRepository.existsByEmail(student.getEmail())) {
//                return ResponseEntity.badRequest().body(null);
//            }
//            
//            Dashboard_Entity savedStudent = studentRepository.save(student);
//            return ResponseEntity.status(HttpStatus.CREATED).body(savedStudent);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//    
//    // UPDATE student
//    @PutMapping("/{id}")
//    public ResponseEntity<Dashboard_Entity> updateStudent(@PathVariable Long id, @RequestBody Dashboard_Entity studentDetails) {
//        try {
//            Optional<Dashboard_Entity> studentOptional = studentRepository.findById(id);
//            if (studentOptional.isPresent()) {
//                Dashboard_Entity student = studentOptional.get();
//                student.setName(studentDetails.getName());
//                student.setEmail(studentDetails.getEmail());
//                // Don't update username and password in this example
//                
//                Dashboard_Entity updatedStudent = studentRepository.save(student);
//                return ResponseEntity.ok(updatedStudent);
//            }
//            return ResponseEntity.notFound().build();
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//    
//    // DELETE student
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
//        try {
//            if (studentRepository.existsById(id)) {
//                studentRepository.deleteById(id);
//                return ResponseEntity.noContent().build();
//            }
//            return ResponseEntity.notFound().build();
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//}


package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.Dashboard_Entity;
import com.example.demo.Repository.Dashboard_Repository;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class Dashboard_Controller {
    
    @Autowired
    private Dashboard_Repository studentRepository;
    
    // GET all students
    @GetMapping
    public ResponseEntity<List<Dashboard_Entity>> getAllStudents() {
        try {
            List<Dashboard_Entity> students = studentRepository.findAll();
            System.out.println("Found " + students.size() + " students");
            return new ResponseEntity<>(students, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error fetching all students: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // CREATE new student
    @PostMapping
    public ResponseEntity<?> createStudent(@RequestBody Dashboard_Entity student) {
        try {
            System.out.println("=== CREATE STUDENT REQUEST ===");
            System.out.println("Received student: " + student);
            System.out.println("Name: " + student.getName());
            System.out.println("Roll No: " + student.getRollNo());
            System.out.println("Email: " + student.getEmail());
            System.out.println("Attendance: " + student.getAttendancePercentage());
            System.out.println("Phone: " + student.getPhoneNumber());
            System.out.println("Standard: " + student.getStandard());
            System.out.println("Section: " + student.getSection());
            
            // Validate input
            if (student.getName() == null || student.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Name is required");
            }
            
            // FIX: Changed from checking trim() to just null check for BigInteger
            if (student.getRollNo() == null) {
                return ResponseEntity.badRequest().body("Roll number is required");
            }
            
            if (student.getEmail() == null || student.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Email is required");
            }
            
            if (student.getAttendancePercentage() == null) {
                return ResponseEntity.badRequest().body("Attendance percentage is required");
            }
            
            if (student.getPhoneNumber() == null) {
                return ResponseEntity.badRequest().body("Phone number is required");
            }
            
            // Validate phone number format (10 digits)
            if (student.getPhoneNumber() != null) {
                String phoneStr = student.getPhoneNumber().toString();
                if (phoneStr.length() != 10) {
                    return ResponseEntity.badRequest().body("Phone number must be 10 digits");
                }
            }
            
            // Check if roll number already exists
            if (studentRepository.existsByRollNo(student.getRollNo())) {
                Map<String, String> error = new HashMap<>(); // FIX: Changed map type
                error.put("message", "Roll number already exists");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
            }
            
            // Check if email already exists
            if (studentRepository.existsByEmail(student.getEmail())) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Email already exists");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
            }
            
            // Save the student
            Dashboard_Entity savedStudent = studentRepository.save(student);
            System.out.println("Student saved successfully");
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Student created successfully");
            response.put("student", savedStudent);
            response.put("status", "success");
            
            return new ResponseEntity<>(response, HttpStatus.CREATED);
            
        } catch (Exception e) {
            System.err.println("=== ERROR CREATING STUDENT ===");
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error creating student: " + e.getMessage());
            error.put("status", "error");
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // GET student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Dashboard_Entity> getStudentById(@PathVariable Long id) {
        try {
            Optional<Dashboard_Entity> student = studentRepository.findById(id);
            
            if (student.isPresent()) {
                return new ResponseEntity<>(student.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.err.println("Error fetching student by ID: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // UPDATE student
    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable Long id, @RequestBody Dashboard_Entity studentDetails) {
        try {
            Optional<Dashboard_Entity> studentOptional = studentRepository.findById(id);
            
            if (!studentOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Student not found with id: " + id);
            }
            
            Dashboard_Entity student = studentOptional.get();
            
            // Update fields if provided
            if (studentDetails.getName() != null && !studentDetails.getName().trim().isEmpty()) {
                student.setName(studentDetails.getName());
            }
            
            if (studentDetails.getRollNo() != null) {
                // Check if new roll number already exists (excluding current student)
                if (!student.getRollNo().equals(studentDetails.getRollNo()) &&
                    studentRepository.existsByRollNo(studentDetails.getRollNo())) {
                    return ResponseEntity.status(HttpStatus.CONFLICT)
                            .body("Roll number already exists");
                }
                student.setRollNo(studentDetails.getRollNo());
            }
            
            if (studentDetails.getEmail() != null && !studentDetails.getEmail().trim().isEmpty()) {
                // Check if new email already exists (excluding current student)
                if (!student.getEmail().equals(studentDetails.getEmail()) &&
                    studentRepository.existsByEmail(studentDetails.getEmail())) {
                    return ResponseEntity.status(HttpStatus.CONFLICT)
                            .body("Email already exists");
                }
                student.setEmail(studentDetails.getEmail());
            }
            
            if (studentDetails.getAttendancePercentage() != null) {
                student.setAttendancePercentage(studentDetails.getAttendancePercentage());
            }
            
            if (studentDetails.getPhoneNumber() != null) {
                // Validate phone number
                String phoneStr = studentDetails.getPhoneNumber().toString();
                if (phoneStr.length() != 10) {
                    return ResponseEntity.badRequest().body("Phone number must be 10 digits");
                }
                student.setPhoneNumber(studentDetails.getPhoneNumber());
            }
            
            if (studentDetails.getStandard() != null) {
                student.setStandard(studentDetails.getStandard());
            }
            
            if (studentDetails.getSection() != null) {
                student.setSection(studentDetails.getSection());
            }
            
            Dashboard_Entity updatedStudent = studentRepository.save(student);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Student updated successfully");
            response.put("student", updatedStudent);
            response.put("status", "success");
            
            return new ResponseEntity<>(response, HttpStatus.OK);
            
        } catch (Exception e) {
            System.err.println("Error updating student: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error updating student: " + e.getMessage());
            error.put("status", "error");
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // DELETE student
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        try {
            if (!studentRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Student not found with id: " + id);
            }
            
            studentRepository.deleteById(id);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Student deleted successfully");
            response.put("status", "success");
            
            return new ResponseEntity<>(response, HttpStatus.OK);
            
        } catch (Exception e) {
            System.err.println("Error deleting student: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error deleting student: " + e.getMessage());
            error.put("status", "error");
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH student by roll number
    @GetMapping("/search/rollno/{rollNo}")
    public ResponseEntity<?> getStudentByRollNo(@PathVariable BigInteger rollNo) {
        try {
            Optional<Dashboard_Entity> student = studentRepository.findByRollNo(rollNo);
            
            if (student.isPresent()) {
                return new ResponseEntity<>(student.get(), HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Student not found with roll number: " + rollNo);
            }
        } catch (Exception e) {
            System.err.println("Error searching by roll number: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH student by email
    @GetMapping("/search/email/{email}")
    public ResponseEntity<?> getStudentByEmail(@PathVariable String email) {
        try {
            Optional<Dashboard_Entity> student = studentRepository.findByEmail(email);
            
            if (student.isPresent()) {
                return new ResponseEntity<>(student.get(), HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Student not found with email: " + email);
            }
        } catch (Exception e) {
            System.err.println("Error searching by email: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // Test endpoint
    @GetMapping("/test")
    public ResponseEntity<Map<String, String>> testEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "API is working!");
        response.put("status", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    // Check database connection
    @GetMapping("/check-db")
    public ResponseEntity<?> checkDatabaseConnection() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            long count = studentRepository.count();
            response.put("status", "success");
            response.put("message", "Database connection successful");
            response.put("totalStudents", count);
            response.put("repositoryClass", studentRepository.getClass().getName());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Database connection failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}