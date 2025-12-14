// AssessmentPlayer.jsx
import React, { useState, useRef, useEffect } from "react";
import { 
  Button, 
  ProgressBar, 
  Form, 
  Modal, 
  Card, 
  Badge,
  Container,
  Row,
  Col,
  Alert,
  ListGroup
} from "react-bootstrap";

// Mock YouTube video IDs - replace with actual video IDs
const YOUTUBE_VIDEO_IDS = [
  "dQw4w9WgXcQ", // Assessment 1
  "L_jWHffIx5E", // Assessment 2
  "CduA0TULnow", // Assessment 3
  "9bZkp7q19f0", // Assessment 4
  "kffacxfA7G4", // Assessment 5
  "JGwWNGJdvx8", // Assessment 6
  "QcIy9NiNbmo", // Assessment 7
  "OPf0YbXqDm0", // Assessment 8
  "pRpeEdMmmQ0", // Assessment 9
  "0KSOMA3QBU0"  // Assessment 10
];

const API_ENDPOINT = "https://jsonplaceholder.typicode.com/posts"; // Mock API endpoint

const initialAssessments = [
  { 
    id: 1, 
    title: "Understanding Basic Concepts", 
    description: "Test your understanding of fundamental concepts covered in the video", 
    completed: false, 
    points: 10,
    videoId: YOUTUBE_VIDEO_IDS[0],
    youtubeLink: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[0]}`
  },
  { 
    id: 2, 
    title: "Application Exercises", 
    description: "Apply the concepts to solve practical problems", 
    completed: false, 
    points: 15,
    videoId: YOUTUBE_VIDEO_IDS[1],
    youtubeLink: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[1]}`
  },
  { 
    id: 3, 
    title: "Critical Thinking Questions", 
    description: "Analyze and evaluate the information presented", 
    completed: false, 
    points: 20,
    videoId: YOUTUBE_VIDEO_IDS[2],
    youtubeLink: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[2]}`
  },
  { 
    id: 4, 
    title: "Real-world Scenarios", 
    description: "Connect concepts to real-world applications", 
    completed: false, 
    points: 15,
    videoId: YOUTUBE_VIDEO_IDS[3],
    youtubeLink: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[3]}`
  },
  { 
    id: 5, 
    title: "Problem Solving", 
    description: "Solve complex problems using learned techniques", 
    completed: false, 
    points: 25,
    videoId: YOUTUBE_VIDEO_IDS[4],
    youtubeLink: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[4]}`
  },
  { 
    id: 6, 
    title: "Review Questions", 
    description: "Review key points and important details", 
    completed: false, 
    points: 10,
    videoId: YOUTUBE_VIDEO_IDS[5],
    youtubeLink: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[5]}`
  },
  { 
    id: 7, 
    title: "Advanced Concepts", 
    description: "Explore advanced topics and extensions", 
    completed: false, 
    points: 20,
    videoId: YOUTUBE_VIDEO_IDS[6],
    youtubeLink: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[6]}`
  },
  { 
    id: 8, 
    title: "Practical Implementation", 
    description: "Implement solutions in practical settings", 
    completed: false, 
    points: 25,
    videoId: YOUTUBE_VIDEO_IDS[7],
    youtubeLink: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[7]}`
  },
  { 
    id: 9, 
    title: "Self-assessment", 
    description: "Evaluate your own understanding and progress", 
    completed: false, 
    points: 10,
    videoId: YOUTUBE_VIDEO_IDS[8],
    youtubeLink: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[8]}`
  },
  { 
    id: 10, 
    title: "Final Evaluation", 
    description: "Comprehensive assessment of all topics", 
    completed: false, 
    points: 30,
    videoId: YOUTUBE_VIDEO_IDS[9],
    youtubeLink: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[9]}`
  }
];

export default function AssessmentPlayer() {
  const [assessments, setAssessments] = useState(initialAssessments);
  const [currentVideo, setCurrentVideo] = useState(initialAssessments[0]?.youtubeLink || "");
  const [currentAssessment, setCurrentAssessment] = useState(initialAssessments[0] || null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("10:00");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [newAssessment, setNewAssessment] = useState({ 
    title: "", 
    description: "", 
    points: 10,
    videoId: "",
    youtubeLink: ""
  });
  const iframeRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [playerReady, setPlayerReady] = useState(false);

  // Calculate total points
  const totalPoints = assessments.reduce((sum, assessment) => sum + assessment.points, 0);
  const earnedPoints = assessments.reduce((sum, assessment) => 
    assessment.completed ? sum + assessment.points : sum, 0
  );
  const completionPercentage = assessments.length > 0 
    ? (assessments.filter(a => a.completed).length / assessments.length) * 100 
    : 0;

  // Initialize YouTube player
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      setPlayerReady(true);
    };
  }, []);

  // Simulate video progress
  useEffect(() => {
    let timer;
    if (videoStarted && !videoCompleted && !videoPaused) {
      timer = setInterval(() => {
        setVideoProgress((prev) => {
          const next = prev + 1;
          if (next >= 100) {
            setVideoCompleted(true);
            clearInterval(timer);
            return 100;
          }
          // Update current time display
          const totalSeconds = 600; // 10 minutes video
          const currentSeconds = Math.floor((next / 100) * totalSeconds);
          const minutes = Math.floor(currentSeconds / 60);
          const seconds = currentSeconds % 60;
          setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [videoStarted, videoCompleted, videoPaused]);

  // Handle clicking on assessment to play its video
  const handleAssessmentClick = (assessment) => {
    setCurrentAssessment(assessment);
    setCurrentVideo(assessment.youtubeLink);
    setVideoStarted(false);
    setVideoCompleted(false);
    setVideoProgress(0);
    setVideoPaused(false);
    setCurrentTime("0:00");
    setSubmitResult(null);
    
    // Reset iframe to load new video
    if (iframeRef.current) {
      iframeRef.current.src = `${assessment.youtubeLink}?enablejsapi=1&rel=0&modestbranding=1`;
    }
  };

  const handlePlayClick = () => {
    setVideoStarted(true);
    setVideoPaused(false);
    if (iframeRef.current && playerReady) {
      const iframe = iframeRef.current;
      iframe.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: "playVideo",
          args: [],
        }),
        "*"
      );
    }
  };

  const handlePauseClick = () => {
    setVideoPaused(!videoPaused);
    if (iframeRef.current && playerReady) {
      const iframe = iframeRef.current;
      iframe.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: videoPaused ? "playVideo" : "pauseVideo",
          args: [],
        }),
        "*"
      );
    }
  };

  const handleRestartClick = () => {
    setVideoStarted(false);
    setVideoCompleted(false);
    setVideoProgress(0);
    setVideoPaused(false);
    setCurrentTime("0:00");
    if (iframeRef.current && playerReady) {
      const iframe = iframeRef.current;
      iframe.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: "stopVideo",
          args: [],
        }),
        "*"
      );
    }
  };

  const toggleAssessment = (id, e) => {
    e.stopPropagation();
    setAssessments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setAssessments((prev) => prev.filter((a) => a.id !== id));
    // If we're deleting the currently playing assessment, switch to first available
    if (currentAssessment?.id === id) {
      const remainingAssessments = assessments.filter(a => a.id !== id);
      if (remainingAssessments.length > 0) {
        handleAssessmentClick(remainingAssessments[0]);
      } else {
        setCurrentVideo("");
        setCurrentAssessment(null);
      }
    }
  };

  const moveUp = (index, e) => {
    e.stopPropagation();
    if (index === 0) return;
    setAssessments((prev) => {
      const arr = [...prev];
      [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      return arr;
    });
  };

  const moveDown = (index, e) => {
    e.stopPropagation();
    setAssessments((prev) => {
      if (index === prev.length - 1) return prev;
      const arr = [...prev];
      [arr[index + 1], arr[index]] = [arr[index], arr[index + 1]];
      return arr;
    });
  };

  const openEdit = (item, e) => {
    e.stopPropagation();
    setEditItem({ ...item });
    setShowEditModal(true);
  };

  const openAdd = () => {
    setNewAssessment({ 
      title: "", 
      description: "", 
      points: 10,
      videoId: "",
      youtubeLink: ""
    });
    setShowAddModal(true);
  };

  const saveEdit = () => {
    if (!editItem) return;
    const updatedItem = {
      ...editItem,
      youtubeLink: editItem.videoId 
        ? `https://www.youtube.com/embed/${editItem.videoId}`
        : editItem.youtubeLink || ""
    };
    
    setAssessments((prev) =>
      prev.map((a) => (a.id === updatedItem.id ? updatedItem : a))
    );
    
    // Update current video if we're editing it
    if (currentAssessment?.id === updatedItem.id) {
      setCurrentAssessment(updatedItem);
      setCurrentVideo(updatedItem.youtubeLink);
      if (iframeRef.current) {
        iframeRef.current.src = `${updatedItem.youtubeLink}?enablejsapi=1&rel=0&modestbranding=1`;
      }
    }
    
    setShowEditModal(false);
  };

  const saveAdd = () => {
    if (!newAssessment.title.trim() || !newAssessment.videoId.trim()) return;
    
    const youtubeLink = `https://www.youtube.com/embed/${newAssessment.videoId}`;
    const newItem = {
      id: assessments.length > 0 ? Math.max(...assessments.map(a => a.id)) + 1 : 1,
      title: newAssessment.title,
      description: newAssessment.description,
      points: parseInt(newAssessment.points) || 10,
      videoId: newAssessment.videoId,
      youtubeLink: youtubeLink,
      completed: false
    };
    
    setAssessments((prev) => [...prev, newItem]);
    setShowAddModal(false);
  };

  const handleVideoIdChange = (e) => {
    const videoId = e.target.value;
    setNewAssessment({
      ...newAssessment,
      videoId: videoId,
      youtubeLink: videoId ? `https://www.youtube.com/embed/${videoId}` : ""
    });
  };

  const handleEditVideoIdChange = (e) => {
    const videoId = e.target.value;
    setEditItem({
      ...editItem,
      videoId: videoId,
      youtubeLink: videoId ? `https://www.youtube.com/embed/${videoId}` : editItem.youtubeLink
    });
  };

  const allAssessmentsDone = assessments.length > 0 && assessments.every((a) => a.completed);
  const canSubmit = videoCompleted && allAssessmentsDone;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    setSubmitResult(null);
    try {
      const body = {
        videoCompleted,
        videoProgress,
        videoDuration: duration,
        currentAssessment: currentAssessment?.title || "None",
        assessments: assessments.map(({ id, title, completed, points }) => ({
          id,
          title,
          completed,
          points
        })),
        totalPoints,
        earnedPoints,
        completionPercentage: Math.round(completionPercentage),
        finishedAll: canSubmit,
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSubmitResult({ 
        success: true, 
        message: "Progress saved successfully!", 
        data,
        points: earnedPoints,
        total: totalPoints
      });
    } catch (err) {
      setSubmitResult({
        success: false,
        message: `Failed to save: ${err.message}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAll = () => {
    setAssessments(initialAssessments.map(a => ({ ...a, completed: false })));
    handleAssessmentClick(initialAssessments[0]);
    setVideoStarted(false);
    setVideoCompleted(false);
    setVideoProgress(0);
    setVideoPaused(false);
    setCurrentTime("0:00");
    setSubmitResult(null);
  };

  return (
    <Container fluid className="py-4">
      <Row>
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center bg-white">
              <div>
                <h5 className="mb-0">Video Assessment Session</h5>
                <small className="text-muted">
                  {currentAssessment 
                    ? `Now Playing: ${currentAssessment.title}` 
                    : "Select an assessment to start"}
                </small>
              </div>
              <div className="d-flex gap-2">
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  onClick={handleRestartClick}
                  disabled={!videoStarted || !currentAssessment}
                >
                  ↺ Restart
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={handlePlayClick}
                  disabled={(videoStarted && !videoPaused) || !currentAssessment}
                >
                  ▶ {videoStarted && !videoPaused ? "Playing" : "Play Video"}
                </Button>
                {videoStarted && currentAssessment && (
                  <Button 
                    variant="outline-secondary" 
                    size="sm" 
                    onClick={handlePauseClick}
                  >
                    {videoPaused ? "▶ Resume" : "⏸ Pause"}
                  </Button>
                )}
              </div>
            </Card.Header>

            <Card.Body>
              {/* Video Player */}
              <div className="mb-4">
                <div className="ratio ratio-16x9 border rounded overflow-hidden bg-dark">
                  {currentVideo ? (
                    <iframe
                      ref={iframeRef}
                      title="Assessment Video"
                      src={`${currentVideo}?enablejsapi=1&rel=0&modestbranding=1`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ border: "none" }}
                    />
                  ) : (
                    <div className="d-flex align-items-center justify-content-center h-100 text-white">
                      <div className="text-center">
                        <div className="mb-3">
                          <i className="bi bi-play-circle" style={{ fontSize: "3rem" }}></i>
                        </div>
                        <p>Select an assessment to load video</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-2 d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    Current: {currentTime} • {currentAssessment?.title || "No video selected"}
                  </small>
                  <small className="text-muted">Duration: {duration}</small>
                </div>
              </div>

              {/* Video Progress */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-medium">Video Progress</span>
                  <Badge bg={videoCompleted ? "success" : "info"} className="px-2 py-1">
                    {videoProgress}%
                  </Badge>
                </div>
                <ProgressBar
                  now={videoProgress}
                  variant={videoCompleted ? "success" : "info"}
                  striped={!videoCompleted}
                  animated={!videoCompleted && videoStarted}
                  style={{ height: "10px" }}
                />
                <div className="mt-2 d-flex justify-content-between">
                  <small className={videoCompleted ? "text-success fw-medium" : "text-muted"}>
                    {videoCompleted ? "✓ Video completed!" : "Watch the entire video to proceed"}
                  </small>
                  <small className="text-muted">
                    {!currentAssessment ? "⏸ No video" : 
                     videoStarted ? (videoPaused ? "⏸ Paused" : "▶ Playing") : "⏸ Not started"}
                  </small>
                </div>
              </div>

              {/* Assessments Progress */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0">Assessments Progress</h6>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" size="sm" onClick={openAdd}>
                      + Add Assessment & Video
                    </Button>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span>Completion: {assessments.filter(a => a.completed).length} of {assessments.length} assessments</span>
                    <span>{Math.round(completionPercentage)}%</span>
                  </div>
                  <ProgressBar
                    now={completionPercentage}
                    variant={allAssessmentsDone ? "success" : "warning"}
                    style={{ height: "8px" }}
                  />
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span>Points: {earnedPoints} of {totalPoints} points</span>
                    <span>{Math.round((earnedPoints / totalPoints) * 100)}%</span>
                  </div>
                  <ProgressBar
                    now={(earnedPoints / totalPoints) * 100}
                    variant={allAssessmentsDone ? "success" : "info"}
                    style={{ height: "8px" }}
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center bg-white">
              <h6 className="mb-0">Assessments List ({assessments.length})</h6>
              <Badge bg="primary" className="px-2">
                Click to Play
              </Badge>
            </Card.Header>
            <Card.Body style={{ maxHeight: "500px", overflowY: "auto" }}>
              <ListGroup variant="flush">
                {assessments.map((assessment, index) => (
                  <ListGroup.Item 
                    key={assessment.id}
                    className={`py-3 ${currentAssessment?.id === assessment.id ? 'bg-primary bg-opacity-10 border-start border-primary border-3' : ''}`}
                    onClick={() => handleAssessmentClick(assessment)}
                    style={{ 
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="d-flex align-items-start">
                        <div className="me-2">
                          <div 
                            className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center"
                            style={{ width: "30px", height: "30px" }}
                          >
                            <i className="bi bi-play-fill text-primary"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center mb-1">
                            <span 
                              className={`fw-medium ${assessment.completed ? 'text-success' : ''} ${currentAssessment?.id === assessment.id ? 'text-primary' : ''}`}
                              style={{ fontSize: "0.95rem" }}
                            >
                              {assessment.title}
                            </span>
                            <Badge bg="secondary" className="ms-2" style={{ fontSize: "0.7rem" }}>
                              {assessment.points} pts
                            </Badge>
                            {currentAssessment?.id === assessment.id && (
                              <Badge bg="primary" className="ms-2" style={{ fontSize: "0.7rem" }}>
                                Playing
                              </Badge>
                            )}
                          </div>
                          <small className="text-muted d-block" style={{ fontSize: "0.85rem" }}>
                            {assessment.description}
                          </small>
                          <small className="text-muted d-block mt-1">
                            <i className="bi bi-youtube me-1"></i>
                            Video ID: {assessment.videoId}
                          </small>
                        </div>
                      </div>
                      
                      <div className="btn-group btn-group-sm">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={(e) => openEdit(assessment, e)}
                          title="Edit"
                        >
                          ✏️
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={(e) => handleDelete(assessment.id, e)}
                          title="Delete"
                        >
                          🗑️
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-2 d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <Form.Check
                          type="checkbox"
                          id={`assessment-${assessment.id}`}
                          className="me-2"
                          checked={assessment.completed}
                          onChange={(e) => toggleAssessment(assessment.id, e)}
                          onClick={(e) => e.stopPropagation()}
                          label="Completed"
                        />
                      </div>
                      
                      <div className="d-flex align-items-center">
                        <div className="btn-group btn-group-sm me-2">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            disabled={index === 0}
                            onClick={(e) => moveUp(index, e)}
                            title="Move Up"
                          >
                            ↑
                          </Button>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            disabled={index === assessments.length - 1}
                            onClick={(e) => moveDown(index, e)}
                            title="Move Down"
                          >
                            ↓
                          </Button>
                        </div>
                        <Badge 
                          bg={assessment.completed ? "success" : "secondary"}
                          className="px-2"
                        >
                          {assessment.completed ? "✓ Done" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              
              {assessments.length === 0 && (
                <div className="text-center py-4 text-muted">
                  <i className="bi bi-film display-6 mb-3 d-block"></i>
                  <p>No assessments added yet.</p>
                  <Button variant="primary" size="sm" onClick={openAdd}>
                    + Add Your First Assessment & Video
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Submit Section */}
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h6 className="mb-0">Submission</h6>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Current Video:</span>
                  <Badge bg="info">
                    {currentAssessment?.title || "None"}
                  </Badge>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Video Status:</span>
                  <Badge bg={videoCompleted ? "success" : "danger"}>
                    {videoCompleted ? "✓ Complete" : "✗ Incomplete"}
                  </Badge>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Assessments Status:</span>
                  <Badge bg={allAssessmentsDone ? "success" : "danger"}>
                    {allAssessmentsDone ? "✓ Complete" : "✗ Incomplete"}
                  </Badge>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Total Points:</span>
                  <Badge bg="primary">
                    {earnedPoints}/{totalPoints}
                  </Badge>
                </div>
              </div>

              <Button
                variant={canSubmit ? "success" : "secondary"}
                disabled={!canSubmit || isSubmitting}
                onClick={handleSubmit}
                className="w-100 mb-2"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Saving Progress...
                  </>
                ) : (
                  "✓ Verify & Submit All"
                )}
              </Button>

              <Button
                variant="outline-secondary"
                onClick={resetAll}
                className="w-100"
                size="sm"
              >
                Reset All Progress
              </Button>

              {submitResult && (
                <Alert 
                  variant={submitResult.success ? "success" : "danger"} 
                  className="mt-3"
                >
                  <Alert.Heading>
                    {submitResult.success ? "Success!" : "Error!"}
                  </Alert.Heading>
                  <p className="mb-2">{submitResult.message}</p>
                  {submitResult.success && submitResult.points && (
                    <p className="mb-0">
                      <strong>Points Earned:</strong> {submitResult.points}/{submitResult.total} points
                    </p>
                  )}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Assessment & Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editItem && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Title *</Form.Label>
                <Form.Control
                  value={editItem.title}
                  onChange={(e) =>
                    setEditItem({ ...editItem, title: e.target.value })
                  }
                  placeholder="Enter assessment title"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editItem.description}
                  onChange={(e) =>
                    setEditItem({ ...editItem, description: e.target.value })
                  }
                  placeholder="Enter assessment description"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>YouTube Video ID *</Form.Label>
                <Form.Control
                  type="text"
                  value={editItem.videoId}
                  onChange={handleEditVideoIdChange}
                  placeholder="Enter YouTube video ID (e.g., dQw4w9WgXcQ)"
                />
                <Form.Text className="text-muted">
                  Enter just the video ID from YouTube URL
                </Form.Text>
                {editItem.youtubeLink && (
                  <div className="mt-2">
                    <small className="text-success">
                      <i className="bi bi-link-45deg me-1"></i>
                      Video URL: {editItem.youtubeLink}
                    </small>
                  </div>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Points Value</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max="100"
                  value={editItem.points}
                  onChange={(e) =>
                    setEditItem({ ...editItem, points: parseInt(e.target.value) || 10 })
                  }
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Modal */}
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Assessment & Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title *</Form.Label>
            <Form.Control
              value={newAssessment.title}
              onChange={(e) =>
                setNewAssessment({ ...newAssessment, title: e.target.value })
              }
              placeholder="Enter assessment title"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newAssessment.description}
              onChange={(e) =>
                setNewAssessment({ ...newAssessment, description: e.target.value })
              }
              placeholder="Enter assessment description"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>YouTube Video ID *</Form.Label>
            <Form.Control
              type="text"
              value={newAssessment.videoId}
              onChange={handleVideoIdChange}
              placeholder="Enter YouTube video ID (e.g., dQw4w9WgXcQ)"
            />
            <Form.Text className="text-muted">
              Enter just the video ID from YouTube URL
            </Form.Text>
            {newAssessment.youtubeLink && (
              <div className="mt-2">
                <small className="text-success">
                  <i className="bi bi-link-45deg me-1"></i>
                  Video URL: {newAssessment.youtubeLink}
                </small>
              </div>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Points Value</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="100"
              value={newAssessment.points}
              onChange={(e) =>
                setNewAssessment({ ...newAssessment, points: parseInt(e.target.value) || 10 })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={saveAdd} 
            disabled={!newAssessment.title.trim() || !newAssessment.videoId.trim()}
          >
            Add Assessment & Video
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}