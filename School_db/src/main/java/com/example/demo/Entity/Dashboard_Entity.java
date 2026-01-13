//package com.example.demo.Entity;
//
//import java.math.BigInteger;
//
//import jakarta.persistence.*;
//
//@Entity
//@Table(name = "students")
//public class Dashboard_Entity {
//	  @Id
//	    @GeneratedValue(strategy = GenerationType.IDENTITY)
//	    private Long id;
//	    
////	    @Column(nullable = false, unique = true)
////	    private String username;
////	    
////	    @Column(nullable = false)
////	    private String password;
//	    
//	    @Column(nullable = false)
//	    private String name;
//	    
//	    @Column(nullable = false, unique = true)
//	    private String email;
//	    
//	    private String address;
//	    private String attendence;
//	    private BigInteger phone_no;
//	    private int stanadrd;
//	    private char  section;
//	    
//
//		public Long getId() {
//			return id;
//		}
//
//		public void setId(Long id) {
//			this.id = id;
//		}
//
////		public String getUsername() {
////			return username;
////		}
////
////		public void setUsername(String username) {
////			this.username = username;
////		}
////
////		public String getPassword() {
////			return password;
////		}
////
////		public void setPassword(String password) {
////			this.password = password;
////		}
//
//		public String getName() {
//			return name;
//		}
//
//		public void setName(String name) {
//			this.name = name;
//		}
//
//		public String getEmail() {
//			return email;
//		}
//
//		public void setEmail(String email) {
//			this.email = email;
//		}
//
//		public String getAddress() {
//			return address;
//		}
//
//		public void setAddress(String address) {
//			this.address = address;
//		}
//
//		public String getAttendence() {
//			return attendence;
//		}
//
//		public void setAttendence(String attendence) {
//			this.attendence = attendence;
//		}
//
//		public BigInteger getPhone_no() {
//			return phone_no;
//		}
//
//		public void setPhone_no(BigInteger phone_no) {
//			this.phone_no = phone_no;
//		}
//
//		public int getStanadrd() {
//			return stanadrd;
//		}
//
//		public void setStanadrd(int stanadrd) {
//			this.stanadrd = stanadrd;
//		}
//
//		public char getSection() {
//			return section;
//		}
//
//		public void setSection(char section) {
//			this.section = section;
//		}
//		
//		}
//	    
//	    // Constructors, getters, and setters
//	  
//

package com.example.demo.Entity;

import java.math.BigInteger;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Dashboard_Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "roll_no", nullable = false)
    private BigInteger rollNo;  // camelCase in Java
    
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    
    @Column(name = "attendance_percentage", nullable = false)
    private Double attendancePercentage;
    
    @Column(name = "phone_number", nullable = false)
    private BigInteger phoneNumber;
    
    @Column(name = "standard")
    private String standard;
    
    @Column(name = "section")
    private String section;
    
    // Default constructor
    public Dashboard_Entity() {}
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public BigInteger getRollNo() {  // Changed to getRollNo()
        return rollNo;
    }
    
    public void setRollNo(BigInteger rollNo) {  // Changed to setRollNo()
        this.rollNo = rollNo;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public Double getAttendancePercentage() {
        return attendancePercentage;
    }
    
    public void setAttendancePercentage(Double attendancePercentage) {
        this.attendancePercentage = attendancePercentage;
    }
    
    public BigInteger getPhoneNumber() {
        return phoneNumber;
    }
    
    public void setPhoneNumber(BigInteger phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    public String getStandard() {
        return standard;
    }
    
    public void setStandard(String standard) {
        this.standard = standard;
    }
    
    public String getSection() {
        return section;
    }
    
    public void setSection(String section) {
        this.section = section;
    }
    
    @Override
    public String toString() {
        return "Dashboard_Entity [id=" + id + ", name=" + name + ", rollNo=" + rollNo + ", email=" + email
                + ", attendancePercentage=" + attendancePercentage + ", phoneNumber=" + phoneNumber + ", standard="
                + standard + ", section=" + section + "]";
    }
}