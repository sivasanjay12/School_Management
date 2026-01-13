package com.example.demo.Repository;

import com.example.demo.Entity.LearningActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningActivityRepository extends JpaRepository<LearningActivity, Long> {
    
    List<LearningActivity> findByStudentId(String studentId);
    
    List<LearningActivity> findByStudentName(String studentName);
    
    List<LearningActivity> findByStudentNameContainingIgnoreCase(String studentName);
    
    List<LearningActivity> findBySubject(String subject);
    
    List<LearningActivity> findByStudentIdAndSubject(String studentId, String subject);
    
    @Query("SELECT DISTINCT la.studentId FROM LearningActivity la ORDER BY la.studentId")
    List<String> findAllDistinctStudentIds();
    
    @Query("SELECT DISTINCT la.subject FROM LearningActivity la WHERE la.subject IS NOT NULL ORDER BY la.subject")
    List<String> findAllDistinctSubjects();
}