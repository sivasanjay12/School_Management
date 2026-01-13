package com.example.demo.Controller;

import com.example.demo.Entity.LearningActivity;
import com.example.demo.Services.LearningActivityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/activities")
public class LearningActivityController {
    
    private final LearningActivityService service;
    
    public LearningActivityController(LearningActivityService service) {
        this.service = service;
    }
    
    @PostMapping
    public ResponseEntity<LearningActivity> createActivity(@RequestBody LearningActivity activity) {
        LearningActivity saved = service.createActivity(activity);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }
    
    @PostMapping("/bulk")
    public ResponseEntity<List<LearningActivity>> createBulkActivities(@RequestBody List<LearningActivity> activities) {
        List<LearningActivity> saved = service.createBulkActivities(activities);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<LearningActivity>> getAllActivities() {
        List<LearningActivity> activities = service.getAllActivities();
        return ResponseEntity.ok(activities);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<LearningActivity> getActivityById(@PathVariable Long id) {
        return service.getActivityById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<LearningActivity>> getStudentActivities(@PathVariable String studentId) {
        List<LearningActivity> activities = service.getStudentActivities(studentId);
        return ResponseEntity.ok(activities);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<LearningActivity> updateActivity(
            @PathVariable Long id,
            @RequestBody LearningActivity activity) {
        LearningActivity updated = service.updateActivity(id, activity);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable Long id) {
        service.deleteActivity(id);
        return ResponseEntity.noContent().build();
    }
    
    @DeleteMapping("/student/{studentId}")
    public ResponseEntity<Void> deleteStudentActivities(@PathVariable String studentId) {
        service.deleteStudentActivities(studentId);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<LearningActivity>> searchActivities(
            @RequestParam(required = false) String studentId,
            @RequestParam(required = false) String subject,
            @RequestParam(required = false) String studentName) {
        List<LearningActivity> results = service.searchActivities(studentId, subject, studentName);
        return ResponseEntity.ok(results);
    }
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getActivityStats() {
        Map<String, Long> stats = service.getActivityStats();
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/student/{studentId}/summary")
    public ResponseEntity<Map<String, Object>> getStudentSummary(@PathVariable String studentId) {
        Map<String, Object> summary = service.getStudentSummary(studentId);
        return ResponseEntity.ok(summary);
    }
    
    @GetMapping("/with-videos")
    public ResponseEntity<List<Map<String, Object>>> getActivitiesWithVideoLinks() {
        List<Map<String, Object>> activities = service.getActivitiesWithVideoLinks();
        return ResponseEntity.ok(activities);
    }
    
    @GetMapping("/student-ids")
    public ResponseEntity<List<String>> getAllStudentIds() {
        List<String> studentIds = service.getAllStudentIds();
        return ResponseEntity.ok(studentIds);
    }
    
    @GetMapping("/subjects")
    public ResponseEntity<List<String>> getAllSubjects() {
        List<String> subjects = service.getAllSubjects();
        return ResponseEntity.ok(subjects);
    }
    
    @PostMapping("/import")
    public ResponseEntity<List<LearningActivity>> importActivities(@RequestBody List<Map<String, String>> data) {
        List<LearningActivity> activities = service.importActivities(data);
        return ResponseEntity.ok(activities);
    }
    
    @GetMapping("/export")
    public ResponseEntity<List<Map<String, String>>> exportActivities() {
        List<Map<String, String>> data = service.exportActivities();
        return ResponseEntity.ok(data);
    }
}