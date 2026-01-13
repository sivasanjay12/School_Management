package com.example.demo.Services;



import com.example.demo.Entity.Admin;
import com.example.demo.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    
    @Autowired
    private AdminRepository adminRepository;
    
    // Create Admin
    public Admin createAdmin(Admin admin) {
        // Check if adminId already exists
        if (adminRepository.existsByAdminId(admin.getAdminId())) {
            throw new RuntimeException("Admin ID already exists: " + admin.getAdminId());
        }
        
        // Check if email already exists
        if (adminRepository.existsByEmail(admin.getEmail())) {
            throw new RuntimeException("Email already exists: " + admin.getEmail());
        }
        
        return adminRepository.save(admin);
    }
    
    // Get All Admins
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }
    
    // Get Admin by ID
    public Admin getAdminById(Long id) {
        return adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found with id: " + id));
    }
    
    // Get Admin by AdminId
    public Admin getAdminByAdminId(String adminId) {
        Admin admin = adminRepository.findByAdminId(adminId);
        if (admin == null) {
            throw new RuntimeException("Admin not found with adminId: " + adminId);
        }
        return admin;
    }
    
    // Update Admin
    public Admin updateAdmin(Long id, Admin adminDetails) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found with id: " + id));
        
        admin.setName(adminDetails.getName());
        admin.setEmail(adminDetails.getEmail());
        admin.setPhoneNumber(adminDetails.getPhoneNumber());
        
        // Only update password if provided
        if (adminDetails.getPassword() != null && !adminDetails.getPassword().isEmpty()) {
            admin.setPassword(adminDetails.getPassword());
        }
        
        return adminRepository.save(admin);
    }
    
    // Delete Admin
    public void deleteAdmin(Long id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found with id: " + id));
        adminRepository.delete(admin);
    }
}