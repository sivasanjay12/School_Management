package com.example.demo.Repository;

import com.example.demo.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    
    Admin findByAdminId(String adminId);
    
    Admin findByEmail(String email);
    
    boolean existsByAdminId(String adminId);
    
    boolean existsByEmail(String email);
}