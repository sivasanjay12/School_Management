//package com.example.demo.Repository;
//
//import java.util.Optional;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import com.example.demo.Entity.Dashboard_Entity;
//
//@Repository
//public interface Dashboard_Repository extends JpaRepository<Dashboard_Entity, Long> {
//    Optional<Dashboard_Entity> findByUsername(String username);
//    Optional<Dashboard_Entity> findByEmail(String email);
//    boolean existsByUsername(String username);
//    boolean existsByEmail(String email);
//}


package com.example.demo.Repository;

import com.example.demo.Entity.Dashboard_Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.Optional;

@Repository
public interface Dashboard_Repository extends JpaRepository<Dashboard_Entity, Long> {
    boolean existsByRollNo(BigInteger rollNo);
    boolean existsByEmail(String email);
    Optional<Dashboard_Entity> findByRollNo(BigInteger rollNo);
    Optional<Dashboard_Entity> findByEmail(String email);
}