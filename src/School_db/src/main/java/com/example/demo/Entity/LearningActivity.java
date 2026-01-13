package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "learning_activities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LearningActivity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "student_id", nullable = false)
    private String studentId;
    
    @Column(name = "student_name", nullable = false, length = 255)
    private String studentName;
    
    @Column(name = "subject", length = 100)
    private String subject;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "\"current_time\"", length = 50)
    private String currentTime;
    
    @Column(name = "video_link", length = 500)
    private String videoLink;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "title", length = 200) // Make sure this exists
    private String title;
    
    // REMOVE THIS CUSTOM CONSTRUCTOR - It conflicts with @AllArgsConstructor
    
    public LearningActivity() {
//        this.studentId = studentId;
//        this.studentName = studentName;
//        this.subject = subject;
//        this.description = description;
//        this.currentTime = currentTime;
//        this.videoLink = videoLink;
    }
    
    
    @Transient
    public String getSummary() {
        return String.format("%s - %s: %s", studentName, subject, 
                            description != null && description.length() > 50 
                            ? description.substring(0, 50) + "..." 
                            : description);
    }

    // Getters and setters remain
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCurrentTime() { return currentTime; }
    public void setCurrentTime(String currentTime) { this.currentTime = currentTime; }
    public String getVideoLink() { return videoLink; }
    public void setVideoLink(String videoLink) { this.videoLink = videoLink; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    public String getTitle() { return title; }
    public void setTitle(String Title) { this.title = title; }
}