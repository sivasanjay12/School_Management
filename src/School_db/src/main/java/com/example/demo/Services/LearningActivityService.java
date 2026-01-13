//package com.example.demo.Services;
//
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import com.example.demo.Entity.LearningActivity;
//import com.example.demo.Repository.LearningActivityRepository;
//import java.time.LocalDateTime;
//import java.util.*;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//@Service
//public class LearningActivityService {
//    
//    private static final Logger log = LoggerFactory.getLogger(LearningActivityService.class);
//    private final LearningActivityRepository repository;
//    
//    public LearningActivityService(LearningActivityRepository repository) {
//        this.repository = repository;
//    }
//    
//    // ========== CRUD OPERATIONS ==========
//    
//    @Transactional
//    public LearningActivity createActivity(LearningActivity activity) {
//        if (!validateActivity(activity)) {
//            throw new RuntimeException("Activity validation failed");
//        }
//        log.info("Creating learning activity for student: {}", activity.getStudentId());
//        return repository.save(activity);
//    }
//    
//    @Transactional
//    public List<LearningActivity> createBulkActivities(List<LearningActivity> activities) {
//        log.info("Creating {} learning activities", activities.size());
//        for (LearningActivity activity : activities) {
//            if (!validateActivity(activity)) {
//                throw new RuntimeException("Validation failed for student: " + activity.getStudentId());
//            }
//        }
//        return repository.saveAll(activities);
//    }
//    
//    public List<LearningActivity> getAllActivities() {
//        return repository.findAll();
//    }
//    
//    public List<LearningActivity> getStudentActivities(String studentId) {
//        return repository.findByStudentId(studentId);
//    }
//    
//    public Optional<LearningActivity> getActivityById(Long id) {
//        return repository.findById(id);
//    }
//    
//    @Transactional
//    public LearningActivity updateActivity(Long id, LearningActivity updatedActivity) {
//        log.info("Updating learning activity with id: {}", id);
//        return repository.findById(id)
//                .map(existing -> {
//                    existing.setStudentId(updatedActivity.getStudentId());
//                    existing.setStudentName(updatedActivity.getStudentName());
//                    existing.setSubject(updatedActivity.getSubject());
//                    existing.setDescription(updatedActivity.getDescription());
//                    existing.setCurrentTime(updatedActivity.getCurrentTime());
//                    existing.setVideoLink(updatedActivity.getVideoLink());
//                    log.info("Updated activity: {} - {}", existing.getStudentName(), existing.getSubject());
//                    return repository.save(existing);
//                })
//                .orElseThrow(() -> new RuntimeException("Activity not found with id: " + id));
//    }
//    
//    @Transactional
//    public void deleteActivity(Long id) {
//        log.info("Deleting learning activity with id: {}", id);
//        repository.deleteById(id);
//    }
//    
//    @Transactional
//    public void deleteStudentActivities(String studentId) {
//        log.info("Deleting all activities for student: {}", studentId);
//        List<LearningActivity> activities = repository.findByStudentId(studentId);
//        repository.deleteAll(activities);
//        log.info("Deleted {} activities", activities.size());
//    }
//    
//    // ========== QUERY METHODS ==========
//    
//    public List<LearningActivity> getActivitiesBySubject(String subject) {
//        return repository.findBySubject(subject);
//    }
//    
//    public List<LearningActivity> searchActivities(String studentId, String subject, String studentName) {
//        List<LearningActivity> results = new ArrayList<>();
//        
//        if (studentId != null && !studentId.trim().isEmpty()) {
//            results = repository.findByStudentId(studentId);
//        } else if (studentName != null && !studentName.trim().isEmpty()) {
//            results = repository.findByStudentNameContainingIgnoreCase(studentName);
//        }
//        
//        if (subject != null && !subject.trim().isEmpty() && !results.isEmpty()) {
//            results = results.stream()
//                    .filter(activity -> subject.equalsIgnoreCase(activity.getSubject()))
//                    .toList();
//        }
//        return results;
//    }
//    
//    public Map<String, Long> getActivityStats() {
//        List<LearningActivity> allActivities = repository.findAll();
//        Map<String, Long> stats = new HashMap<>();
//        stats.put("totalActivities", (long) allActivities.size());
//        
//        long uniqueStudents = allActivities.stream()
//                .map(LearningActivity::getStudentId)
//                .distinct()
//                .count();
//        stats.put("uniqueStudents", uniqueStudents);
//        
//        Map<String, Long> subjectCounts = allActivities.stream()
//                .filter(activity -> activity.getSubject() != null)
//                .collect(java.util.stream.Collectors.groupingBy(
//                    LearningActivity::getSubject,
//                    java.util.stream.Collectors.counting()
//                ));
//        stats.put("subjectsCount", (long) subjectCounts.size());
//        
//        subjectCounts.forEach((subject, count) -> 
//            stats.put("subject_" + subject.replace(" ", "_"), count));
//        
//        return stats;
//    }
//    
//    public List<String> getAllStudentIds() {
//        return repository.findAllDistinctStudentIds();
//    }
//    
//    public List<String> getAllSubjects() {
//        return repository.findAllDistinctSubjects();
//    }
//    
//    // ========== BATCH OPERATIONS ==========
//    
//    @Transactional
//    public List<LearningActivity> updateStudentName(String oldName, String newName) {
//        log.info("Updating student name from '{}' to '{}'", oldName, newName);
//        List<LearningActivity> activities = repository.findByStudentName(oldName);
//        activities.forEach(activity -> activity.setStudentName(newName));
//        return repository.saveAll(activities);
//    }
//    
//    @Transactional
//    public List<LearningActivity> updateStudentId(String oldId, String newId) {
//        log.info("Updating student ID from '{}' to '{}'", oldId, newId);
//        List<LearningActivity> activities = repository.findByStudentId(oldId);
//        activities.forEach(activity -> activity.setStudentId(newId));
//        return repository.saveAll(activities);
//    }
//    
//    @Transactional
//    public void deleteBySubject(String subject) {
//        log.info("Deleting all activities for subject: {}", subject);
//        List<LearningActivity> activities = repository.findBySubject(subject);
//        repository.deleteAll(activities);
//        log.info("Deleted {} activities", activities.size());
//    }
//    
//    // ========== VALIDATION METHODS ==========
//    
//    public boolean validateActivity(LearningActivity activity) {
//        if (activity.getStudentId() == null || activity.getStudentId().trim().isEmpty()) {
//            log.error("Student ID is required");
//            return false;
//        }
//        if (activity.getStudentName() == null || activity.getStudentName().trim().isEmpty()) {
//            log.error("Student name is required");
//            return false;
//        }
//        if (activity.getVideoLink() != null && !activity.getVideoLink().trim().isEmpty()) {
//            String videoLink = activity.getVideoLink().trim();
//            if (!videoLink.startsWith("http://") && !videoLink.startsWith("https://")) {
//                log.warn("Video link should start with http:// or https://");
//                activity.setVideoLink("https://" + videoLink);
//            }
//        }
//        return true;
//    }
//    
//    // ========== UTILITY METHODS ==========
//    
//    public Map<String, Object> getStudentSummary(String studentId) {
//        List<LearningActivity> activities = repository.findByStudentId(studentId);
//        if (activities.isEmpty()) {
//            throw new RuntimeException("No activities found for student: " + studentId);
//        }
//        Map<String, Object> summary = new HashMap<>();
//        LearningActivity firstActivity = activities.get(0);
//        summary.put("studentId", studentId);
//        summary.put("studentName", firstActivity.getStudentName());
//        summary.put("totalActivities", activities.size());
//        
//        Map<String, Long> subjectCount = activities.stream()
//                .filter(activity -> activity.getSubject() != null)
//                .collect(java.util.stream.Collectors.groupingBy(
//                    LearningActivity::getSubject,
//                    java.util.stream.Collectors.counting()
//                ));
//        summary.put("activitiesBySubject", subjectCount);
//        
//        boolean hasVideos = activities.stream()
//                .anyMatch(activity -> activity.getVideoLink() != null && !activity.getVideoLink().isEmpty());
//        summary.put("hasVideoActivities", hasVideos);
//        
//        activities.stream()
//                .max(Comparator.comparing(LearningActivity::getCreatedAt))
//                .ifPresent(latest -> {
//                    summary.put("latestActivity", latest.getSubject());
//                    summary.put("latestActivityTime", latest.getCreatedAt());
//                });
//        
//        return summary;
//    }
//    
//    public List<Map<String, Object>> getActivitiesWithVideoLinks() {
//        return repository.findAll().stream()
//                .filter(activity -> activity.getVideoLink() != null && !activity.getVideoLink().isEmpty())
//                .map(activity -> {
//                    Map<String, Object> activityMap = new HashMap<>();
//                    activityMap.put("id", activity.getId());
//                    activityMap.put("studentName", activity.getStudentName());
//                    activityMap.put("subject", activity.getSubject());
//                    activityMap.put("videoLink", activity.getVideoLink());
//                    activityMap.put("description", activity.getDescription());
//                    return activityMap;
//                })
//                .toList();
//    }
//    
//    // ========== IMPORT/EXPORT HELPERS ==========
//    
//    public List<LearningActivity> importActivities(List<Map<String, String>> data) {
//        List<LearningActivity> activities = new ArrayList<>();
//        for (Map<String, String> row : data) {
//        	LearningActivity activity = LearningActivity.builder()
//        		    .studentId(row.getOrDefault("studentId", ""))
//        		    .studentName(row.getOrDefault("studentName", ""))
//        		    .subject(row.getOrDefault("subject", ""))
//        		    .description(row.getOrDefault("description", ""))
//        		    .currentTime(row.getOrDefault("currentTime", ""))
//        		    .videoLink(row.getOrDefault("videoLink", ""))
//        		    .build();
//            if (validateActivity(activity)) {
//                activities.add(activity);
//            }
//        }
//        return createBulkActivities(activities);
//    }
//    
//    public List<Map<String, String>> exportActivities() {
//        return repository.findAll().stream()
//                .map(activity -> {
//                    Map<String, String> row = new LinkedHashMap<>();
//                    row.put("id", activity.getId().toString());
//                    row.put("studentId", activity.getStudentId());
//                    row.put("studentName", activity.getStudentName());
//                    row.put("subject", activity.getSubject());
//                    row.put("description", activity.getDescription());
//                    row.put("currentTime", activity.getCurrentTime());
//                    row.put("videoLink", activity.getVideoLink());
//                    row.put("createdAt", activity.getCreatedAt() != null ? activity.getCreatedAt().toString() : "");
//                    row.put("updatedAt", activity.getUpdatedAt() != null ? activity.getUpdatedAt().toString() : "");
//                    return row;
//                })
//                .toList();
//    }
//}







package com.example.demo.Services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.demo.Entity.LearningActivity;
import com.example.demo.Repository.LearningActivityRepository;
import java.time.LocalDateTime;
import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class LearningActivityService {
    
    private static final Logger log = LoggerFactory.getLogger(LearningActivityService.class);
    private final LearningActivityRepository repository;
    
    public LearningActivityService(LearningActivityRepository repository) {
        this.repository = repository;
    }
    
    // ========== CRUD OPERATIONS ==========
    
    @Transactional
    public LearningActivity createActivity(LearningActivity activity) {
        if (!validateActivity(activity)) {
            throw new RuntimeException("Activity validation failed");
        }
        log.info("Creating learning activity for student: {}", activity.getStudentId());
        return repository.save(activity);
    }
    
    @Transactional
    public List<LearningActivity> createBulkActivities(List<LearningActivity> activities) {
        log.info("Creating {} learning activities", activities.size());
        for (LearningActivity activity : activities) {
            if (!validateActivity(activity)) {
                throw new RuntimeException("Validation failed for student: " + activity.getStudentId());
            }
        }
        return repository.saveAll(activities);
    }
    
    public List<LearningActivity> getAllActivities() {
        return repository.findAll();
    }
    
    public List<LearningActivity> getStudentActivities(String studentId) {
        return repository.findByStudentId(studentId);
    }
    
    public Optional<LearningActivity> getActivityById(Long id) {
        return repository.findById(id);
    }
    
    @Transactional
    public LearningActivity updateActivity(Long id, LearningActivity updatedActivity) {
        log.info("Updating learning activity with id: {}", id);
        return repository.findById(id)
                .map(existing -> {
                    existing.setStudentId(updatedActivity.getStudentId());
                    existing.setStudentName(updatedActivity.getStudentName());
                    existing.setSubject(updatedActivity.getSubject());
                    existing.setDescription(updatedActivity.getDescription());
                    existing.setCurrentTime(updatedActivity.getCurrentTime());
                    existing.setVideoLink(updatedActivity.getVideoLink());
                    log.info("Updated activity: {} - {}", existing.getStudentName(), existing.getSubject());
                    return repository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Activity not found with id: " + id));
    }
    
    @Transactional
    public void deleteActivity(Long id) {
        log.info("Deleting learning activity with id: {}", id);
        repository.deleteById(id);
    }
    
    @Transactional
    public void deleteStudentActivities(String studentId) {
        log.info("Deleting all activities for student: {}", studentId);
        List<LearningActivity> activities = repository.findByStudentId(studentId);
        repository.deleteAll(activities);
        log.info("Deleted {} activities", activities.size());
    }
    
    // ========== QUERY METHODS ==========
    
    public List<LearningActivity> getActivitiesBySubject(String subject) {
        return repository.findBySubject(subject);
    }
    
    public List<LearningActivity> searchActivities(String studentId, String subject, String studentName) {
        List<LearningActivity> results = new ArrayList<>();
        
        if (studentId != null && !studentId.trim().isEmpty()) {
            results = repository.findByStudentId(studentId);
        } else if (studentName != null && !studentName.trim().isEmpty()) {
            results = repository.findByStudentNameContainingIgnoreCase(studentName);
        }
        
        if (subject != null && !subject.trim().isEmpty() && !results.isEmpty()) {
            results = results.stream()
                    .filter(activity -> subject.equalsIgnoreCase(activity.getSubject()))
                    .toList();
        }
        return results;
    }
    
    public Map<String, Long> getActivityStats() {
        List<LearningActivity> allActivities = repository.findAll();
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalActivities", (long) allActivities.size());
        
        long uniqueStudents = allActivities.stream()
                .map(LearningActivity::getStudentId)
                .distinct()
                .count();
        stats.put("uniqueStudents", uniqueStudents);
        
        Map<String, Long> subjectCounts = allActivities.stream()
                .filter(activity -> activity.getSubject() != null)
                .collect(java.util.stream.Collectors.groupingBy(
                    LearningActivity::getSubject,
                    java.util.stream.Collectors.counting()
                ));
        stats.put("subjectsCount", (long) subjectCounts.size());
        
        subjectCounts.forEach((subject, count) -> 
            stats.put("subject_" + subject.replace(" ", "_"), count));
        
        return stats;
    }
    
    public List<String> getAllStudentIds() {
        return repository.findAllDistinctStudentIds();
    }
    
    public List<String> getAllSubjects() {
        return repository.findAllDistinctSubjects();
    }
    
    // ========== BATCH OPERATIONS ==========
    
    @Transactional
    public List<LearningActivity> updateStudentName(String oldName, String newName) {
        log.info("Updating student name from '{}' to '{}'", oldName, newName);
        List<LearningActivity> activities = repository.findByStudentName(oldName);
        activities.forEach(activity -> activity.setStudentName(newName));
        return repository.saveAll(activities);
    }
    
    @Transactional
    public List<LearningActivity> updateStudentId(String oldId, String newId) {
        log.info("Updating student ID from '{}' to '{}'", oldId, newId);
        List<LearningActivity> activities = repository.findByStudentId(oldId);
        activities.forEach(activity -> activity.setStudentId(newId));
        return repository.saveAll(activities);
    }
    
    @Transactional
    public void deleteBySubject(String subject) {
        log.info("Deleting all activities for subject: {}", subject);
        List<LearningActivity> activities = repository.findBySubject(subject);
        repository.deleteAll(activities);
        log.info("Deleted {} activities", activities.size());
    }
    
    // ========== VALIDATION METHODS ==========
    
    public boolean validateActivity(LearningActivity activity) {
        if (activity.getStudentId() == null || activity.getStudentId().trim().isEmpty()) {
            log.error("Student ID is required");
            return false;
        }
        if (activity.getStudentName() == null || activity.getStudentName().trim().isEmpty()) {
            log.error("Student name is required");
            return false;
        }
        if (activity.getVideoLink() != null && !activity.getVideoLink().trim().isEmpty()) {
            String videoLink = activity.getVideoLink().trim();
            if (!videoLink.startsWith("http://") && !videoLink.startsWith("https://")) {
                log.warn("Video link should start with http:// or https://");
                activity.setVideoLink("https://" + videoLink);
            }
        }
        return true;
    }
    
    // ========== UTILITY METHODS ==========
    
    public Map<String, Object> getStudentSummary(String studentId) {
        List<LearningActivity> activities = repository.findByStudentId(studentId);
        if (activities.isEmpty()) {
            throw new RuntimeException("No activities found for student: " + studentId);
        }
        Map<String, Object> summary = new HashMap<>();
        LearningActivity firstActivity = activities.get(0);
        summary.put("studentId", studentId);
        summary.put("studentName", firstActivity.getStudentName());
        summary.put("totalActivities", activities.size());
        
        Map<String, Long> subjectCount = activities.stream()
                .filter(activity -> activity.getSubject() != null)
                .collect(java.util.stream.Collectors.groupingBy(
                    LearningActivity::getSubject,
                    java.util.stream.Collectors.counting()
                ));
        summary.put("activitiesBySubject", subjectCount);
        
        boolean hasVideos = activities.stream()
                .anyMatch(activity -> activity.getVideoLink() != null && !activity.getVideoLink().isEmpty());
        summary.put("hasVideoActivities", hasVideos);
        
        activities.stream()
                .max(Comparator.comparing(LearningActivity::getCreatedAt))
                .ifPresent(latest -> {
                    summary.put("latestActivity", latest.getSubject());
                    summary.put("latestActivityTime", latest.getCreatedAt());
                });
        
        return summary;
    }
    
    public List<Map<String, Object>> getActivitiesWithVideoLinks() {
        return repository.findAll().stream()
                .filter(activity -> activity.getVideoLink() != null && !activity.getVideoLink().isEmpty())
                .map(activity -> {
                    Map<String, Object> activityMap = new HashMap<>();
                    activityMap.put("id", activity.getId());
                    activityMap.put("studentName", activity.getStudentName());
                    activityMap.put("subject", activity.getSubject());
                    activityMap.put("videoLink", activity.getVideoLink());
                    activityMap.put("description", activity.getDescription());
                    return activityMap;
                })
                .toList();
    }
    
    // ========== IMPORT/EXPORT HELPERS ==========
    
    public List<LearningActivity> importActivities(List<Map<String, String>> data) {
        List<LearningActivity> activities = new ArrayList<>();
        for (Map<String, String> row : data) {
            // Create LearningActivity using setter methods
            LearningActivity activity = new LearningActivity();
            activity.setStudentId(row.getOrDefault("studentId", ""));
            activity.setStudentName(row.getOrDefault("studentName", ""));
            activity.setSubject(row.getOrDefault("subject", ""));
            activity.setDescription(row.getOrDefault("description", ""));
            activity.setCurrentTime(row.getOrDefault("currentTime", ""));
            activity.setVideoLink(row.getOrDefault("videoLink", ""));
            
            if (validateActivity(activity)) {
                activities.add(activity);
            }
        }
        return createBulkActivities(activities);
    }
    
    // Alternative: Helper method to create LearningActivity from Map
    private LearningActivity createActivityFromMap(Map<String, String> row) {
        LearningActivity activity = new LearningActivity();
        activity.setStudentId(row.getOrDefault("studentId", ""));
        activity.setStudentName(row.getOrDefault("studentName", ""));
        activity.setSubject(row.getOrDefault("subject", ""));
        activity.setDescription(row.getOrDefault("description", ""));
        activity.setCurrentTime(row.getOrDefault("currentTime", ""));
        activity.setVideoLink(row.getOrDefault("videoLink", ""));
        return activity;
    }
    
    public List<Map<String, String>> exportActivities() {
        return repository.findAll().stream()
                .map(activity -> {
                    Map<String, String> row = new LinkedHashMap<>();
                    row.put("id", activity.getId().toString());
                    row.put("studentId", activity.getStudentId());
                    row.put("studentName", activity.getStudentName());
                    row.put("subject", activity.getSubject());
                    row.put("description", activity.getDescription());
                    row.put("currentTime", activity.getCurrentTime());
                    row.put("videoLink", activity.getVideoLink());
                    row.put("createdAt", activity.getCreatedAt() != null ? activity.getCreatedAt().toString() : "");
                    row.put("updatedAt", activity.getUpdatedAt() != null ? activity.getUpdatedAt().toString() : "");
                    return row;
                })
                .toList();
    }
    
    // Additional helper methods for batch creation
    public List<LearningActivity> createActivitiesFromCsv(List<String[]> csvData, boolean hasHeader) {
        List<LearningActivity> activities = new ArrayList<>();
        int startIndex = hasHeader ? 1 : 0;
        
        for (int i = startIndex; i < csvData.size(); i++) {
            String[] row = csvData.get(i);
            if (row.length >= 6) {
                LearningActivity activity = new LearningActivity();
                activity.setStudentId(row[0]);
                activity.setStudentName(row[1]);
                activity.setSubject(row[2]);
                activity.setDescription(row[3]);
                activity.setCurrentTime(row[4]);
                activity.setVideoLink(row[5]);
                
                if (validateActivity(activity)) {
                    activities.add(activity);
                }
            }
        }
        return createBulkActivities(activities);
    }
}