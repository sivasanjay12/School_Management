// // AssessmentPlayer.jsx
// import React, { useState, useRef, useEffect } from "react";
// import { 
//   Button, 
//   ProgressBar, 
//   Form, 
//   Modal, 
//   Card, 
//   Badge,
//   Container,
//   Row,
//   Col,
//   Alert,
//   ListGroup
// } from "react-bootstrap";

// // Mock YouTube video IDs - replace with actual video IDs
// const YOUTUBE_VIDEO_IDS = [
//   "dQw4w9WgXcQ", // Assessment 1
//   "L_jWHffIx5E", // Assessment 2
//   "CduA0TULnow", // Assessment 3
//   "9bZkp7q19f0", // Assessment 4
//   "kffacxfA7G4", // Assessment 5
//   "JGwWNGJdvx8", // Assessment 6
//   "QcIy9NiNbmo", // Assessment 7
//   "OPf0YbXqDm0", // Assessment 8
//   "pRpeEdMmmQ0", // Assessment 9
//   "0KSOMA3QBU0"  // Assessment 10
// ];

// const API_ENDPOINT = "https://jsonplaceholder.typicode.com/posts"; // Mock API endpoint

// const initialAssessments = [
//   { 
//     id: 1, 
//     title: "Understanding Basic Concepts", 
//     description: "Test your understanding of fundamental concepts covered in the video", 
//     completed: false, 
//     points: 10,
//     videoId: YOUTUBE_VIDEO_IDS[0],
//     youtubeLink: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[0]}`
//   },
//   { 
//     id: 2, 
//     title: "Application Exercises", 
//     description: "Apply the concepts to solve practical problems", 
//     completed: false, 
//     points: 15,
//     videoId: YOUTUBE_VIDEO_IDS[1],
//     youtubeLink: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[1]}`
//   },
//   { 
//     id: 3, 
//     title: "Critical Thinking Questions", 
//     description: "Analyze and evaluate the information presented", 
//     completed: false, 
//     points: 20,
//     videoId: YOUTUBE_VIDEO_IDS[2],
//     youtubeLink: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[2]}`
//   },
//   { 
//     id: 4, 
//     title: "Real-world Scenarios", 
//     description: "Connect concepts to real-world applications", 
//     completed: false, 
//     points: 15,
//     videoId: YOUTUBE_VIDEO_IDS[3],
//     youtubeLink: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[3]}`
//   },
//   { 
//     id: 5, 
//     title: "Problem Solving", 
//     description: "Solve complex problems using learned techniques", 
//     completed: false, 
//     points: 25,
//     videoId: YOUTUBE_VIDEO_IDS[4],
//     youtubeLink: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[4]}`
//   },
//   { 
//     id: 6, 
//     title: "Review Questions", 
//     description: "Review key points and important details", 
//     completed: false, 
//     points: 10,
//     videoId: YOUTUBE_VIDEO_IDS[5],
//     youtubeLink: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[5]}`
//   },
//   { 
//     id: 7, 
//     title: "Advanced Concepts", 
//     description: "Explore advanced topics and extensions", 
//     completed: false, 
//     points: 20,
//     videoId: YOUTUBE_VIDEO_IDS[6],
//     youtubeLink: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[6]}`
//   },
//   { 
//     id: 8, 
//     title: "Practical Implementation", 
//     description: "Implement solutions in practical settings", 
//     completed: false, 
//     points: 25,
//     videoId: YOUTUBE_VIDEO_IDS[7],
//     youtubeLink: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[7]}`
//   },
//   { 
//     id: 9, 
//     title: "Self-assessment", 
//     description: "Evaluate your own understanding and progress", 
//     completed: false, 
//     points: 10,
//     videoId: YOUTUBE_VIDEO_IDS[8],
//     youtubeLink: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[8]}`
//   },
//   { 
//     id: 10, 
//     title: "Final Evaluation", 
//     description: "Comprehensive assessment of all topics", 
//     completed: false, 
//     points: 30,
//     videoId: YOUTUBE_VIDEO_IDS[9],
//     youtubeLink: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[9]}`
//   }
// ];

// export default function AssessmentPlayer() {
//   const [assessments, setAssessments] = useState(initialAssessments);
//   const [currentVideo, setCurrentVideo] = useState(initialAssessments[0]?.youtubeLink || "");
//   const [currentAssessment, setCurrentAssessment] = useState(initialAssessments[0] || null);
//   const [videoStarted, setVideoStarted] = useState(false);
//   const [videoPaused, setVideoPaused] = useState(false);
//   const [videoCompleted, setVideoCompleted] = useState(false);
//   const [videoProgress, setVideoProgress] = useState(0);
//   const [currentTime, setCurrentTime] = useState("0:00");
//   const [duration, setDuration] = useState("10:00");
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [newAssessment, setNewAssessment] = useState({ 
//     title: "", 
//     description: "", 
//     points: 10,
//     videoId: "",
//     youtubeLink: ""
//   });
//   const iframeRef = useRef(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitResult, setSubmitResult] = useState(null);
//   const [playerReady, setPlayerReady] = useState(false);

//   // Calculate total points
//   const totalPoints = assessments.reduce((sum, assessment) => sum + assessment.points, 0);
//   const earnedPoints = assessments.reduce((sum, assessment) => 
//     assessment.completed ? sum + assessment.points : sum, 0
//   );
//   const completionPercentage = assessments.length > 0 
//     ? (assessments.filter(a => a.completed).length / assessments.length) * 100 
//     : 0;

//   // Initialize YouTube player
//   useEffect(() => {
//     const tag = document.createElement('script');
//     tag.src = 'https://www.youtube.com/iframe_api';
//     const firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//     window.onYouTubeIframeAPIReady = () => {
//       setPlayerReady(true);
//     };
//   }, []);

//   // Simulate video progress
//   useEffect(() => {
//     let timer;
//     if (videoStarted && !videoCompleted && !videoPaused) {
//       timer = setInterval(() => {
//         setVideoProgress((prev) => {
//           const next = prev + 1;
//           if (next >= 100) {
//             setVideoCompleted(true);
//             clearInterval(timer);
//             return 100;
//           }
//           // Update current time display
//           const totalSeconds = 600; // 10 minutes video
//           const currentSeconds = Math.floor((next / 100) * totalSeconds);
//           const minutes = Math.floor(currentSeconds / 60);
//           const seconds = currentSeconds % 60;
//           setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
//           return next;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [videoStarted, videoCompleted, videoPaused]);

//   // Handle clicking on assessment to play its video
//   const handleAssessmentClick = (assessment) => {
//     setCurrentAssessment(assessment);
//     setCurrentVideo(assessment.youtubeLink);
//     setVideoStarted(false);
//     setVideoCompleted(false);
//     setVideoProgress(0);
//     setVideoPaused(false);
//     setCurrentTime("0:00");
//     setSubmitResult(null);
    
//     // Reset iframe to load new video
//     if (iframeRef.current) {
//       iframeRef.current.src = `${assessment.youtubeLink}?enablejsapi=1&rel=0&modestbranding=1`;
//     }
//   };

//   const handlePlayClick = () => {
//     setVideoStarted(true);
//     setVideoPaused(false);
//     if (iframeRef.current && playerReady) {
//       const iframe = iframeRef.current;
//       iframe.contentWindow?.postMessage(
//         JSON.stringify({
//           event: "command",
//           func: "playVideo",
//           args: [],
//         }),
//         "*"
//       );
//     }
//   };

//   const handlePauseClick = () => {
//     setVideoPaused(!videoPaused);
//     if (iframeRef.current && playerReady) {
//       const iframe = iframeRef.current;
//       iframe.contentWindow?.postMessage(
//         JSON.stringify({
//           event: "command",
//           func: videoPaused ? "playVideo" : "pauseVideo",
//           args: [],
//         }),
//         "*"
//       );
//     }
//   };

//   const handleRestartClick = () => {
//     setVideoStarted(false);
//     setVideoCompleted(false);
//     setVideoProgress(0);
//     setVideoPaused(false);
//     setCurrentTime("0:00");
//     if (iframeRef.current && playerReady) {
//       const iframe = iframeRef.current;
//       iframe.contentWindow?.postMessage(
//         JSON.stringify({
//           event: "command",
//           func: "stopVideo",
//           args: [],
//         }),
//         "*"
//       );
//     }
//   };

//   const toggleAssessment = (id, e) => {
//     e.stopPropagation();
//     setAssessments((prev) =>
//       prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
//     );
//   };

//   const handleDelete = (id, e) => {
//     e.stopPropagation();
//     setAssessments((prev) => prev.filter((a) => a.id !== id));
//     // If we're deleting the currently playing assessment, switch to first available
//     if (currentAssessment?.id === id) {
//       const remainingAssessments = assessments.filter(a => a.id !== id);
//       if (remainingAssessments.length > 0) {
//         handleAssessmentClick(remainingAssessments[0]);
//       } else {
//         setCurrentVideo("");
//         setCurrentAssessment(null);
//       }
//     }
//   };

//   const moveUp = (index, e) => {
//     e.stopPropagation();
//     if (index === 0) return;
//     setAssessments((prev) => {
//       const arr = [...prev];
//       [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
//       return arr;
//     });
//   };

//   const moveDown = (index, e) => {
//     e.stopPropagation();
//     setAssessments((prev) => {
//       if (index === prev.length - 1) return prev;
//       const arr = [...prev];
//       [arr[index + 1], arr[index]] = [arr[index], arr[index + 1]];
//       return arr;
//     });
//   };

//   const openEdit = (item, e) => {
//     e.stopPropagation();
//     setEditItem({ ...item });
//     setShowEditModal(true);
//   };

//   const openAdd = () => {
//     setNewAssessment({ 
//       title: "", 
//       description: "", 
//       points: 10,
//       videoId: "",
//       youtubeLink: ""
//     });
//     setShowAddModal(true);
//   };

//   const saveEdit = () => {
//     if (!editItem) return;
//     const updatedItem = {
//       ...editItem,
//       youtubeLink: editItem.videoId 
//         ? `https://www.youtube.com/embed/${editItem.videoId}`
//         : editItem.youtubeLink || ""
//     };
    
//     setAssessments((prev) =>
//       prev.map((a) => (a.id === updatedItem.id ? updatedItem : a))
//     );
    
//     // Update current video if we're editing it
//     if (currentAssessment?.id === updatedItem.id) {
//       setCurrentAssessment(updatedItem);
//       setCurrentVideo(updatedItem.youtubeLink);
//       if (iframeRef.current) {
//         iframeRef.current.src = `${updatedItem.youtubeLink}?enablejsapi=1&rel=0&modestbranding=1`;
//       }
//     }
    
//     setShowEditModal(false);
//   };

//   const saveAdd = () => {
//     if (!newAssessment.title.trim() || !newAssessment.videoId.trim()) return;
    
//     const youtubeLink = `https://www.youtube.com/embed/${newAssessment.videoId}`;
//     const newItem = {
//       id: assessments.length > 0 ? Math.max(...assessments.map(a => a.id)) + 1 : 1,
//       title: newAssessment.title,
//       description: newAssessment.description,
//       points: parseInt(newAssessment.points) || 10,
//       videoId: newAssessment.videoId,
//       youtubeLink: youtubeLink,
//       completed: false
//     };
    
//     setAssessments((prev) => [...prev, newItem]);
//     setShowAddModal(false);
//   };

//   const handleVideoIdChange = (e) => {
//     const videoId = e.target.value;
//     setNewAssessment({
//       ...newAssessment,
//       videoId: videoId,
//       youtubeLink: videoId ? `https://www.youtube.com/embed/${videoId}` : ""
//     });
//   };

//   const handleEditVideoIdChange = (e) => {
//     const videoId = e.target.value;
//     setEditItem({
//       ...editItem,
//       videoId: videoId,
//       youtubeLink: videoId ? `https://www.youtube.com/embed/${videoId}` : editItem.youtubeLink
//     });
//   };

//   const allAssessmentsDone = assessments.length > 0 && assessments.every((a) => a.completed);
//   const canSubmit = videoCompleted && allAssessmentsDone;

//   const handleSubmit = async () => {
//     if (!canSubmit) return;
//     setIsSubmitting(true);
//     setSubmitResult(null);
//     try {
//       const body = {
//         videoCompleted,
//         videoProgress,
//         videoDuration: duration,
//         currentAssessment: currentAssessment?.title || "None",
//         assessments: assessments.map(({ id, title, completed, points }) => ({
//           id,
//           title,
//           completed,
//           points
//         })),
//         totalPoints,
//         earnedPoints,
//         completionPercentage: Math.round(completionPercentage),
//         finishedAll: canSubmit,
//         submittedAt: new Date().toISOString(),
//       };

//       const res = await fetch(API_ENDPOINT, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data = await res.json();
//       setSubmitResult({ 
//         success: true, 
//         message: "Progress saved successfully!", 
//         data,
//         points: earnedPoints,
//         total: totalPoints
//       });
//     } catch (err) {
//       setSubmitResult({
//         success: false,
//         message: `Failed to save: ${err.message}`,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const resetAll = () => {
//     setAssessments(initialAssessments.map(a => ({ ...a, completed: false })));
//     handleAssessmentClick(initialAssessments[0]);
//     setVideoStarted(false);
//     setVideoCompleted(false);
//     setVideoProgress(0);
//     setVideoPaused(false);
//     setCurrentTime("0:00");
//     setSubmitResult(null);
//   };

//   return (
//     <Container fluid className="py-4">
//       <Row>
//         <Col lg={8}>
//           <Card className="shadow-sm mb-4">
//             <Card.Header className="d-flex justify-content-between align-items-center bg-white">
//               <div>
//                 <h5 className="mb-0">Video Assessment Session</h5>
//                 <small className="text-muted">
//                   {currentAssessment 
//                     ? `Now Playing: ${currentAssessment.title}` 
//                     : "Select an assessment to start"}
//                 </small>
//               </div>
//               <div className="d-flex gap-2">
//                 <Button 
//                   variant="outline-primary" 
//                   size="sm" 
//                   onClick={handleRestartClick}
//                   disabled={!videoStarted || !currentAssessment}
//                 >
//                   ↺ Restart
//                 </Button>
//                 <Button 
//                   variant="primary" 
//                   size="sm" 
//                   onClick={handlePlayClick}
//                   disabled={(videoStarted && !videoPaused) || !currentAssessment}
//                 >
//                   ▶ {videoStarted && !videoPaused ? "Playing" : "Play Video"}
//                 </Button>
//                 {videoStarted && currentAssessment && (
//                   <Button 
//                     variant="outline-secondary" 
//                     size="sm" 
//                     onClick={handlePauseClick}
//                   >
//                     {videoPaused ? "▶ Resume" : "⏸ Pause"}
//                   </Button>
//                 )}
//               </div>
//             </Card.Header>

//             <Card.Body>
//               {/* Video Player */}
//               <div className="mb-4">
//                 <div className="ratio ratio-16x9 border rounded overflow-hidden bg-dark">
//                   {currentVideo ? (
//                     <iframe
//                       ref={iframeRef}
//                       title="Assessment Video"
//                       src={`${currentVideo}?enablejsapi=1&rel=0&modestbranding=1`}
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                       style={{ border: "none" }}
//                     />
//                   ) : (
//                     <div className="d-flex align-items-center justify-content-center h-100 text-white">
//                       <div className="text-center">
//                         <div className="mb-3">
//                           <i className="bi bi-play-circle" style={{ fontSize: "3rem" }}></i>
//                         </div>
//                         <p>Select an assessment to load video</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 <div className="mt-2 d-flex justify-content-between align-items-center">
//                   <small className="text-muted">
//                     Current: {currentTime} • {currentAssessment?.title || "No video selected"}
//                   </small>
//                   <small className="text-muted">Duration: {duration}</small>
//                 </div>
//               </div>

//               {/* Video Progress */}
//               <div className="mb-4">
//                 <div className="d-flex justify-content-between align-items-center mb-2">
//                   <span className="fw-medium">Video Progress</span>
//                   <Badge bg={videoCompleted ? "success" : "info"} className="px-2 py-1">
//                     {videoProgress}%
//                   </Badge>
//                 </div>
//                 <ProgressBar
//                   now={videoProgress}
//                   variant={videoCompleted ? "success" : "info"}
//                   striped={!videoCompleted}
//                   animated={!videoCompleted && videoStarted}
//                   style={{ height: "10px" }}
//                 />
//                 <div className="mt-2 d-flex justify-content-between">
//                   <small className={videoCompleted ? "text-success fw-medium" : "text-muted"}>
//                     {videoCompleted ? "✓ Video completed!" : "Watch the entire video to proceed"}
//                   </small>
//                   <small className="text-muted">
//                     {!currentAssessment ? "⏸ No video" : 
//                      videoStarted ? (videoPaused ? "⏸ Paused" : "▶ Playing") : "⏸ Not started"}
//                   </small>
//                 </div>
//               </div>

//               {/* Assessments Progress */}
//               <div className="mb-4">
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <h6 className="mb-0">Assessments Progress</h6>
//                   <div className="d-flex gap-2">
//                     <Button variant="outline-primary" size="sm" onClick={openAdd}>
//                       + Add Assessment & Video
//                     </Button>
//                   </div>
//                 </div>
                
//                 <div className="mb-3">
//                   <div className="d-flex justify-content-between mb-1">
//                     <span>Completion: {assessments.filter(a => a.completed).length} of {assessments.length} assessments</span>
//                     <span>{Math.round(completionPercentage)}%</span>
//                   </div>
//                   <ProgressBar
//                     now={completionPercentage}
//                     variant={allAssessmentsDone ? "success" : "warning"}
//                     style={{ height: "8px" }}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <div className="d-flex justify-content-between mb-1">
//                     <span>Points: {earnedPoints} of {totalPoints} points</span>
//                     <span>{Math.round((earnedPoints / totalPoints) * 100)}%</span>
//                   </div>
//                   <ProgressBar
//                     now={(earnedPoints / totalPoints) * 100}
//                     variant={allAssessmentsDone ? "success" : "info"}
//                     style={{ height: "8px" }}
//                   />
//                 </div>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col lg={4}>
//           <Card className="shadow-sm mb-4">
//             <Card.Header className="d-flex justify-content-between align-items-center bg-white">
//               <h6 className="mb-0">Assessments List ({assessments.length})</h6>
//               <Badge bg="primary" className="px-2">
//                 Click to Play
//               </Badge>
//             </Card.Header>
//             <Card.Body style={{ maxHeight: "500px", overflowY: "auto" }}>
//               <ListGroup variant="flush">
//                 {assessments.map((assessment, index) => (
//                   <ListGroup.Item 
//                     key={assessment.id}
//                     className={`py-3 ${currentAssessment?.id === assessment.id ? 'bg-primary bg-opacity-10 border-start border-primary border-3' : ''}`}
//                     onClick={() => handleAssessmentClick(assessment)}
//                     style={{ 
//                       cursor: 'pointer',
//                       transition: 'all 0.2s ease'
//                     }}
//                   >
//                     <div className="d-flex justify-content-between align-items-start">
//                       <div className="d-flex align-items-start">
//                         <div className="me-2">
//                           <div 
//                             className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center"
//                             style={{ width: "30px", height: "30px" }}
//                           >
//                             <i className="bi bi-play-fill text-primary"></i>
//                           </div>
//                         </div>
//                         <div className="flex-grow-1">
//                           <div className="d-flex align-items-center mb-1">
//                             <span 
//                               className={`fw-medium ${assessment.completed ? 'text-success' : ''} ${currentAssessment?.id === assessment.id ? 'text-primary' : ''}`}
//                               style={{ fontSize: "0.95rem" }}
//                             >
//                               {assessment.title}
//                             </span>
//                             <Badge bg="secondary" className="ms-2" style={{ fontSize: "0.7rem" }}>
//                               {assessment.points} pts
//                             </Badge>
//                             {currentAssessment?.id === assessment.id && (
//                               <Badge bg="primary" className="ms-2" style={{ fontSize: "0.7rem" }}>
//                                 Playing
//                               </Badge>
//                             )}
//                           </div>
//                           <small className="text-muted d-block" style={{ fontSize: "0.85rem" }}>
//                             {assessment.description}
//                           </small>
//                           <small className="text-muted d-block mt-1">
//                             <i className="bi bi-youtube me-1"></i>
//                             Video ID: {assessment.videoId}
//                           </small>
//                         </div>
//                       </div>
                      
//                       <div className="btn-group btn-group-sm">
//                         <Button
//                           variant="outline-secondary"
//                           size="sm"
//                           onClick={(e) => openEdit(assessment, e)}
//                           title="Edit"
//                         >
//                           ✏️
//                         </Button>
//                         <Button
//                           variant="outline-danger"
//                           size="sm"
//                           onClick={(e) => handleDelete(assessment.id, e)}
//                           title="Delete"
//                         >
//                           🗑️
//                         </Button>
//                       </div>
//                     </div>
                    
//                     <div className="mt-2 d-flex justify-content-between align-items-center">
//                       <div className="d-flex align-items-center">
//                         <Form.Check
//                           type="checkbox"
//                           id={`assessment-${assessment.id}`}
//                           className="me-2"
//                           checked={assessment.completed}
//                           onChange={(e) => toggleAssessment(assessment.id, e)}
//                           onClick={(e) => e.stopPropagation()}
//                           label="Completed"
//                         />
//                       </div>
                      
//                       <div className="d-flex align-items-center">
//                         <div className="btn-group btn-group-sm me-2">
//                           <Button
//                             variant="outline-secondary"
//                             size="sm"
//                             disabled={index === 0}
//                             onClick={(e) => moveUp(index, e)}
//                             title="Move Up"
//                           >
//                             ↑
//                           </Button>
//                           <Button
//                             variant="outline-secondary"
//                             size="sm"
//                             disabled={index === assessments.length - 1}
//                             onClick={(e) => moveDown(index, e)}
//                             title="Move Down"
//                           >
//                             ↓
//                           </Button>
//                         </div>
//                         <Badge 
//                           bg={assessment.completed ? "success" : "secondary"}
//                           className="px-2"
//                         >
//                           {assessment.completed ? "✓ Done" : "Pending"}
//                         </Badge>
//                       </div>
//                     </div>
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
              
//               {assessments.length === 0 && (
//                 <div className="text-center py-4 text-muted">
//                   <i className="bi bi-film display-6 mb-3 d-block"></i>
//                   <p>No assessments added yet.</p>
//                   <Button variant="primary" size="sm" onClick={openAdd}>
//                     + Add Your First Assessment & Video
//                   </Button>
//                 </div>
//               )}
//             </Card.Body>
//           </Card>

//           {/* Submit Section */}
//           <Card className="shadow-sm">
//             <Card.Header className="bg-white">
//               <h6 className="mb-0">Submission</h6>
//             </Card.Header>
//             <Card.Body>
//               <div className="mb-3">
//                 <div className="d-flex justify-content-between mb-2">
//                   <span>Current Video:</span>
//                   <Badge bg="info">
//                     {currentAssessment?.title || "None"}
//                   </Badge>
//                 </div>
//                 <div className="d-flex justify-content-between mb-2">
//                   <span>Video Status:</span>
//                   <Badge bg={videoCompleted ? "success" : "danger"}>
//                     {videoCompleted ? "✓ Complete" : "✗ Incomplete"}
//                   </Badge>
//                 </div>
//                 <div className="d-flex justify-content-between mb-2">
//                   <span>Assessments Status:</span>
//                   <Badge bg={allAssessmentsDone ? "success" : "danger"}>
//                     {allAssessmentsDone ? "✓ Complete" : "✗ Incomplete"}
//                   </Badge>
//                 </div>
//                 <div className="d-flex justify-content-between mb-3">
//                   <span>Total Points:</span>
//                   <Badge bg="primary">
//                     {earnedPoints}/{totalPoints}
//                   </Badge>
//                 </div>
//               </div>

//               <Button
//                 variant={canSubmit ? "success" : "secondary"}
//                 disabled={!canSubmit || isSubmitting}
//                 onClick={handleSubmit}
//                 className="w-100 mb-2"
//                 size="lg"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2"></span>
//                     Saving Progress...
//                   </>
//                 ) : (
//                   "✓ Verify & Submit All"
//                 )}
//               </Button>

//               <Button
//                 variant="outline-secondary"
//                 onClick={resetAll}
//                 className="w-100"
//                 size="sm"
//               >
//                 Reset All Progress
//               </Button>

//               {submitResult && (
//                 <Alert 
//                   variant={submitResult.success ? "success" : "danger"} 
//                   className="mt-3"
//                 >
//                   <Alert.Heading>
//                     {submitResult.success ? "Success!" : "Error!"}
//                   </Alert.Heading>
//                   <p className="mb-2">{submitResult.message}</p>
//                   {submitResult.success && submitResult.points && (
//                     <p className="mb-0">
//                       <strong>Points Earned:</strong> {submitResult.points}/{submitResult.total} points
//                     </p>
//                   )}
//                 </Alert>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Edit Modal */}
//       <Modal
//         show={showEditModal}
//         onHide={() => setShowEditModal(false)}
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Assessment & Video</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {editItem && (
//             <>
//               <Form.Group className="mb-3">
//                 <Form.Label>Title *</Form.Label>
//                 <Form.Control
//                   value={editItem.title}
//                   onChange={(e) =>
//                     setEditItem({ ...editItem, title: e.target.value })
//                   }
//                   placeholder="Enter assessment title"
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={3}
//                   value={editItem.description}
//                   onChange={(e) =>
//                     setEditItem({ ...editItem, description: e.target.value })
//                   }
//                   placeholder="Enter assessment description"
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>YouTube Video ID *</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={editItem.videoId}
//                   onChange={handleEditVideoIdChange}
//                   placeholder="Enter YouTube video ID (e.g., dQw4w9WgXcQ)"
//                 />
//                 <Form.Text className="text-muted">
//                   Enter just the video ID from YouTube URL
//                 </Form.Text>
//                 {editItem.youtubeLink && (
//                   <div className="mt-2">
//                     <small className="text-success">
//                       <i className="bi bi-link-45deg me-1"></i>
//                       Video URL: {editItem.youtubeLink}
//                     </small>
//                   </div>
//                 )}
//               </Form.Group>
//               <Form.Group>
//                 <Form.Label>Points Value</Form.Label>
//                 <Form.Control
//                   type="number"
//                   min="1"
//                   max="100"
//                   value={editItem.points}
//                   onChange={(e) =>
//                     setEditItem({ ...editItem, points: parseInt(e.target.value) || 10 })
//                   }
//                 />
//               </Form.Group>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={saveEdit}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Add Modal */}
//       <Modal
//         show={showAddModal}
//         onHide={() => setShowAddModal(false)}
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Assessment & Video</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group className="mb-3">
//             <Form.Label>Title *</Form.Label>
//             <Form.Control
//               value={newAssessment.title}
//               onChange={(e) =>
//                 setNewAssessment({ ...newAssessment, title: e.target.value })
//               }
//               placeholder="Enter assessment title"
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={newAssessment.description}
//               onChange={(e) =>
//                 setNewAssessment({ ...newAssessment, description: e.target.value })
//               }
//               placeholder="Enter assessment description"
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>YouTube Video ID *</Form.Label>
//             <Form.Control
//               type="text"
//               value={newAssessment.videoId}
//               onChange={handleVideoIdChange}
//               placeholder="Enter YouTube video ID (e.g., dQw4w9WgXcQ)"
//             />
//             <Form.Text className="text-muted">
//               Enter just the video ID from YouTube URL
//             </Form.Text>
//             {newAssessment.youtubeLink && (
//               <div className="mt-2">
//                 <small className="text-success">
//                   <i className="bi bi-link-45deg me-1"></i>
//                   Video URL: {newAssessment.youtubeLink}
//                 </small>
//               </div>
//             )}
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Points Value</Form.Label>
//             <Form.Control
//               type="number"
//               min="1"
//               max="100"
//               value={newAssessment.points}
//               onChange={(e) =>
//                 setNewAssessment({ ...newAssessment, points: parseInt(e.target.value) || 10 })
//               }
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowAddModal(false)}>
//             Cancel
//           </Button>
//           <Button 
//             variant="primary" 
//             onClick={saveAdd} 
//             disabled={!newAssessment.title.trim() || !newAssessment.videoId.trim()}
//           >
//             Add Assessment & Video
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// }











// AssessmentPlayer.jsx
// AssessmentPlayer.jsx
// import React, { useState, useEffect } from "react";
// import { 
//   Button, 
//   Form, 
//   Modal, 
//   Card, 
//   Container,
//   Row,
//   Col,
//   Alert,
//   ListGroup,
//   Spinner,
//   Badge,
//   Table,
//   Tab,
//   Tabs
// } from "react-bootstrap";

// // API Base URL
// const API_BASE_URL = 'http://localhost:8080/api/activities';

// // API Helper Function
// const apiRequest = async (endpoint, method = 'GET', body = null) => {
//   const headers = {
//     'Content-Type': 'application/json',
//   };

//   const config = {
//     method,
//     headers,
//   };

//   if (body) {
//     config.body = JSON.stringify(body);
//   }

//   try {
//     const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
//     if (!response.ok) {
//       throw new Error(`API Error: ${response.status} ${response.statusText}`);
//     }
    
//     const contentType = response.headers.get('content-type');
//     if (contentType && contentType.includes('application/json')) {
//       return await response.json();
//     }
//     return null;
//   } catch (error) {
//     console.error('API Request Error:', error);
//     throw error;
//   }
// };

// // ALL API Methods from your Spring Boot Controller
// const activityApi = {
//   // Basic CRUD operations
//   createActivity: (activity) => apiRequest('', 'POST', activity),
//   createBulkActivities: (activities) => apiRequest('/bulk', 'POST', activities),
//   getAllActivities: () => apiRequest(''),
//   getActivityById: (id) => apiRequest(`/${id}`),
//   getStudentActivities: (studentId) => apiRequest(`/student/${studentId}`),
//   updateActivity: (id, activity) => apiRequest(`/${id}`, 'PUT', activity),
//   deleteActivity: (id) => apiRequest(`/${id}`, 'DELETE'),
//   deleteStudentActivities: (studentId) => apiRequest(`/student/${studentId}`, 'DELETE'),
  
//   // Search and Query operations
//   searchActivities: (studentId, subject, studentName) => {
//     const params = new URLSearchParams();
//     if (studentId) params.append('studentId', studentId);
//     if (subject) params.append('subject', subject);
//     if (studentName) params.append('studentName', studentName);
//     return apiRequest(`/search?${params.toString()}`);
//   },
  
//   // Stats and analytics
//   getActivityStats: () => apiRequest('/stats'),
//   getStudentSummary: (studentId) => apiRequest(`/student/${studentId}/summary`),
//   getActivitiesWithVideoLinks: () => apiRequest('/with-videos'),
  
//   // Lists and metadata
//   getAllStudentIds: () => apiRequest('/student-ids'),
//   getAllSubjects: () => apiRequest('/subjects'),
  
//   // Import/Export operations
//   importActivities: (data) => apiRequest('/import', 'POST', data),
//   exportActivities: () => apiRequest('/export'),
  
//   // Existing assessment methods
//   getStudentAssessments: (studentId) => apiRequest(`/student/${studentId}`),
//   submitAssessment: (data) => apiRequest('/submit', 'POST', data),
// };

// export default function AssessmentPlayer() {
//   const [assessments, setAssessments] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showSubmitModal, setShowSubmitModal] = useState(false);
//   const [newAssessment, setNewAssessment] = useState({ 
//     title: "", 
//     description: "", 
//     subject: "",
//     youtubeLink: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
  
//   // New states for additional features
//   const [activeTab, setActiveTab] = useState("assessments");
//   const [searchParams, setSearchParams] = useState({
//     studentId: "",
//     subject: "",
//     studentName: ""
//   });
//   const [searchResults, setSearchResults] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [studentIds, setStudentIds] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [videoActivities, setVideoActivities] = useState([]);

//   const studentId = "STU001"; // Replace with actual student ID from auth
//   const studentName = "John Doe"; // Replace with actual student name from auth

//   // Load assessments from backend
//   useEffect(() => {
//     loadAssessments();
//     loadAdditionalData();
//   }, []);

//   const loadAssessments = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const data = await activityApi.getStudentActivities(studentId);
      
//       if (data && Array.isArray(data)) {
//         setAssessments(data);
//       } else {
//         setAssessments([]);
//       }
//     } catch (err) {
//       setError("Failed to load assessments. Please try again.");
//       console.error("Error loading assessments:", err);
//       setAssessments([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadAdditionalData = async () => {
//     try {
//       // Load stats
//       const statsData = await activityApi.getActivityStats();
//       setStats(statsData);
      
//       // Load student IDs
//       const ids = await activityApi.getAllStudentIds();
//       setStudentIds(ids);
      
//       // Load subjects
//       const subjectsData = await activityApi.getAllSubjects();
//       setSubjects(subjectsData);
      
//       // Load video activities
//       const videos = await activityApi.getActivitiesWithVideoLinks();
//       setVideoActivities(videos);
//     } catch (err) {
//       console.error("Error loading additional data:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await activityApi.deleteActivity(id);
//       setAssessments(prev => prev.filter(a => a.id !== id));
//     } catch (err) {
//       console.error("Error deleting assessment:", err);
//       alert("Failed to delete assessment. Please try again.");
//     }
//   };

//   const handleAddAssessment = async () => {
//     if (!newAssessment.title.trim() || !newAssessment.youtubeLink.trim()) {
//       alert("Title and YouTube link are required");
//       return;
//     }

//     try {
//       const assessmentData = {
//         studentId: studentId,
//         studentName: studentName,
//         subject: newAssessment.subject,
//         description: newAssessment.description,
//         currentTime: new Date().toISOString(),
//         videoLink: newAssessment.youtubeLink
//       };

//       const created = await activityApi.createActivity(assessmentData);
//       setAssessments(prev => [...prev, created]);
//       setNewAssessment({ title: "", description: "", subject: "", youtubeLink: "" });
//       setShowAddModal(false);
//     } catch (err) {
//       console.error("Error adding assessment:", err);
//       alert("Failed to add assessment. Please try again.");
//     }
//   };

//   const handleSubmitAll = async () => {
//     setSubmitting(true);
//     try {
//       // Create bulk activities
//       const activitiesToSubmit = assessments.map(a => ({
//         studentId: a.studentId || studentId,
//         studentName: a.studentName || studentName,
//         subject: a.subject,
//         description: a.description,
//         currentTime: a.currentTime || new Date().toISOString(),
//         videoLink: a.videoLink
//       }));

//       await activityApi.createBulkActivities(activitiesToSubmit);
//       setSubmitSuccess(true);
//       setTimeout(() => {
//         setSubmitSuccess(false);
//         setShowSubmitModal(false);
//         loadAssessments(); // Refresh to show updated status
//       }, 2000);
//     } catch (err) {
//       console.error("Error submitting assessments:", err);
//       alert("Failed to submit. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       const results = await activityApi.searchActivities(
//         searchParams.studentId,
//         searchParams.subject,
//         searchParams.studentName
//       );
//       setSearchResults(results);
//     } catch (err) {
//       console.error("Error searching activities:", err);
//       alert("Failed to search activities.");
//     }
//   };

//   const openAddModal = () => {
//     setNewAssessment({ title: "", description: "", subject: "", youtubeLink: "" });
//     setShowAddModal(true);
//   };

//   const renderStats = () => (
//     <Card className="shadow-sm mb-4">
//       <Card.Header>
//         <h5 className="mb-0">Activity Statistics</h5>
//       </Card.Header>
//       <Card.Body>
//         {stats ? (
//           <Row>
//             <Col md={4} className="text-center">
//               <h2 className="text-primary">{stats.totalActivities || 0}</h2>
//               <p className="text-muted">Total Activities</p>
//             </Col>
//             <Col md={4} className="text-center">
//               <h2 className="text-success">{stats.uniqueStudents || 0}</h2>
//               <p className="text-muted">Unique Students</p>
//             </Col>
//             <Col md={4} className="text-center">
//               <h2 className="text-info">{stats.subjectsCount || 0}</h2>
//               <p className="text-muted">Subjects</p>
//             </Col>
//           </Row>
//         ) : (
//           <Spinner animation="border" size="sm" />
//         )}
//       </Card.Body>
//     </Card>
//   );

//   const renderVideoActivities = () => (
//     <Card className="shadow-sm mb-4">
//       <Card.Header>
//         <h5 className="mb-0">Video Activities ({videoActivities.length})</h5>
//       </Card.Header>
//       <Card.Body>
//         {videoActivities.length === 0 ? (
//           <p className="text-muted">No video activities found.</p>
//         ) : (
//           <ListGroup variant="flush">
//             {videoActivities.slice(0, 5).map((activity, index) => (
//               <ListGroup.Item key={index}>
//                 <div className="d-flex justify-content-between">
//                   <div>
//                     <strong>{activity.studentName}</strong>
//                     <Badge bg="info" className="ms-2">{activity.subject}</Badge>
//                   </div>
//                   <a href={activity.videoLink} target="_blank" rel="noopener noreferrer">
//                     Watch Video
//                   </a>
//                 </div>
//                 <p className="mb-0 text-muted">{activity.description}</p>
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         )}
//       </Card.Body>
//     </Card>
//   );

//   const renderSearchTab = () => (
//     <Card className="shadow-sm">
//       <Card.Header>
//         <h5 className="mb-0">Search Activities</h5>
//       </Card.Header>
//       <Card.Body>
//         <Row className="mb-3">
//           <Col md={4}>
//             <Form.Group>
//               <Form.Label>Student ID</Form.Label>
//               <Form.Control
//                 value={searchParams.studentId}
//                 onChange={(e) => setSearchParams({...searchParams, studentId: e.target.value})}
//                 placeholder="Enter student ID"
//               />
//             </Form.Group>
//           </Col>
//           <Col md={4}>
//             <Form.Group>
//               <Form.Label>Student Name</Form.Label>
//               <Form.Control
//                 value={searchParams.studentName}
//                 onChange={(e) => setSearchParams({...searchParams, studentName: e.target.value})}
//                 placeholder="Enter student name"
//               />
//             </Form.Group>
//           </Col>
//           <Col md={4}>
//             <Form.Group>
//               <Form.Label>Subject</Form.Label>
//               <Form.Control
//                 value={searchParams.subject}
//                 onChange={(e) => setSearchParams({...searchParams, subject: e.target.value})}
//                 placeholder="Enter subject"
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Button variant="primary" onClick={handleSearch} className="mb-3">
//           Search
//         </Button>
        
//         {searchResults.length > 0 && (
//           <div className="mt-3">
//             <h6>Search Results ({searchResults.length})</h6>
//             <Table striped bordered hover size="sm">
//               <thead>
//                 <tr>
//                   <th>Student</th>
//                   <th>Subject</th>
//                   <th>Description</th>
//                   <th>Video</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {searchResults.map((result, index) => (
//                   <tr key={index}>
//                     <td>{result.studentName}</td>
//                     <td>{result.subject}</td>
//                     <td>{result.description}</td>
//                     <td>
//                       {result.videoLink && (
//                         <a href={result.videoLink} target="_blank" rel="noopener noreferrer">
//                           Link
//                         </a>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>
//         )}
//       </Card.Body>
//     </Card>
//   );

//   if (loading && activeTab === "assessments") {
//     return (
//       <Container fluid className="py-4">
//         <Row className="justify-content-center">
//           <Col md={6} className="text-center">
//             <Spinner animation="border" variant="primary" />
//             <p className="mt-3">Loading assessments...</p>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }

//   return (
//     <Container fluid className="py-4">
//       <Tabs
//         activeKey={activeTab}
//         onSelect={(k) => setActiveTab(k)}
//         className="mb-4"
//       >
//         <Tab eventKey="assessments" title="Assessments">
//           <Row>
//             <Col lg={12}>
//               <Card className="shadow-sm mb-4">
//                 <Card.Header className="d-flex justify-content-between align-items-center bg-white">
//                   <div>
//                     <h5 className="mb-0">Assessments</h5>
//                     <small className="text-muted">
//                       {assessments.length} assessment(s) found
//                     </small>
//                   </div>
//                   <div className="d-flex gap-2">
//                     {assessments.length > 0 && (
//                       <Button 
//                         variant="primary" 
//                         onClick={() => setShowSubmitModal(true)}
//                       >
//                         Verify & Submit All
//                       </Button>
//                     )}
//                     <Button 
//                       variant="outline-primary" 
//                       onClick={openAddModal}
//                     >
//                       + Add Assessment
//                     </Button>
//                   </div>
//                 </Card.Header>

//                 <Card.Body>
//                   {error ? (
//                     <Alert variant="danger" className="mb-0">
//                       <Alert.Heading>Error Loading Assessments</Alert.Heading>
//                       <p>{error}</p>
//                       <Button variant="primary" onClick={loadAssessments}>
//                         Retry
//                       </Button>
//                     </Alert>
//                   ) : assessments.length === 0 ? (
//                     <div className="text-center py-5">
//                       <div className="mb-4">
//                         <i className="bi bi-clipboard-check" style={{ fontSize: "3rem", color: "#6c757d" }}></i>
//                       </div>
//                       <h5 className="text-muted mb-3">No assessments found</h5>
//                       <p className="text-muted mb-4">Add your first assessment to get started</p>
//                       <Button variant="primary" onClick={openAddModal}>
//                         + Add Your First Assessment
//                       </Button>
//                     </div>
//                   ) : (
//                     <ListGroup variant="flush">
//                       {assessments.map((assessment) => (
//                         <ListGroup.Item 
//                           key={assessment.id}
//                           className="py-3"
//                         >
//                           <div className="d-flex justify-content-between align-items-start">
//                             <div className="d-flex align-items-start flex-grow-1">
//                               <div className="me-3">
//                                 <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center"
//                                   style={{ width: "40px", height: "40px" }}>
//                                   <i className="bi bi-play-btn text-primary"></i>
//                                 </div>
//                               </div>
//                               <div className="flex-grow-1">
//                                 <div className="d-flex align-items-center mb-1">
//                                   <h6 className="mb-0 me-2">{assessment.subject || 'Untitled'}</h6>
//                                   <Badge 
//                                     bg="info"
//                                     className="ms-2"
//                                   >
//                                     {assessment.subject || 'General'}
//                                   </Badge>
//                                 </div>
//                                 {assessment.description && (
//                                   <p className="text-muted mb-1" style={{ fontSize: "0.9rem" }}>
//                                     {assessment.description}
//                                   </p>
//                                 )}
//                                 <div className="d-flex align-items-center mt-2">
//                                   {assessment.videoLink && (
//                                     <small className="text-muted">
//                                       <i className="bi bi-youtube me-1"></i>
//                                       <a href={assessment.videoLink} target="_blank" rel="noopener noreferrer">
//                                         Watch Video
//                                       </a>
//                                     </small>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
                            
//                             <Button
//                               variant="outline-danger"
//                               size="sm"
//                               onClick={() => handleDelete(assessment.id)}
//                               title="Delete"
//                             >
//                               <i className="bi bi-trash"></i>
//                             </Button>
//                           </div>
//                         </ListGroup.Item>
//                       ))}
//                     </ListGroup>
//                   )}
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Tab>
        
//         <Tab eventKey="stats" title="Statistics">
//           {renderStats()}
//           {renderVideoActivities()}
//         </Tab>
        
//         <Tab eventKey="search" title="Search">
//           {renderSearchTab()}
//         </Tab>
        
//         <Tab eventKey="students" title="Students">
//           <Card className="shadow-sm">
//             <Card.Header>
//               <h5 className="mb-0">All Student IDs</h5>
//             </Card.Header>
//             <Card.Body>
//               {studentIds.length === 0 ? (
//                 <p className="text-muted">No student IDs found.</p>
//               ) : (
//                 <ListGroup>
//                   {studentIds.map((id, index) => (
//                     <ListGroup.Item key={index}>
//                       {id}
//                       <Button 
//                         size="sm" 
//                         variant="outline-primary" 
//                         className="ms-3"
//                         onClick={() => {
//                           setSearchParams({...searchParams, studentId: id});
//                           setActiveTab("search");
//                         }}
//                       >
//                         View Activities
//                       </Button>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               )}
//             </Card.Body>
//           </Card>
//         </Tab>
        
//         <Tab eventKey="subjects" title="Subjects">
//           <Card className="shadow-sm">
//             <Card.Header>
//               <h5 className="mb-0">All Subjects</h5>
//             </Card.Header>
//             <Card.Body>
//               {subjects.length === 0 ? (
//                 <p className="text-muted">No subjects found.</p>
//               ) : (
//                 <div className="d-flex flex-wrap gap-2">
//                   {subjects.map((subject, index) => (
//                     <Badge 
//                       key={index} 
//                       bg="info" 
//                       className="p-2"
//                       style={{ fontSize: "1rem" }}
//                       onClick={() => {
//                         setSearchParams({...searchParams, subject: subject});
//                         setActiveTab("search");
//                       }}
//                       // style={{ cursor: 'pointer' }}
//                     >
//                       {subject}
//                     </Badge>
//                   ))}
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Tab>
//       </Tabs>

//       {/* Add Assessment Modal */}
//       <Modal
//         show={showAddModal}
//         onHide={() => setShowAddModal(false)}
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Assessment</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group className="mb-3">
//             <Form.Label>Title *</Form.Label>
//             <Form.Control
//               value={newAssessment.title}
//               onChange={(e) =>
//                 setNewAssessment({ ...newAssessment, title: e.target.value })
//               }
//               placeholder="Enter assessment title"
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={newAssessment.description}
//               onChange={(e) =>
//                 setNewAssessment({ ...newAssessment, description: e.target.value })
//               }
//               placeholder="Enter assessment description (optional)"
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Subject</Form.Label>
//             <Form.Control
//               value={newAssessment.subject}
//               onChange={(e) =>
//                 setNewAssessment({ ...newAssessment, subject: e.target.value })
//               }
//               placeholder="Enter subject (optional)"
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>YouTube Link *</Form.Label>
//             <Form.Control
//               type="text"
//               value={newAssessment.youtubeLink}
//               onChange={(e) =>
//                 setNewAssessment({ ...newAssessment, youtubeLink: e.target.value })
//               }
//               placeholder="Enter full YouTube URL"
//             />
//             <Form.Text className="text-muted">
//               Enter the full YouTube video URL
//             </Form.Text>
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowAddModal(false)}>
//             Cancel
//           </Button>
//           <Button 
//             variant="primary" 
//             onClick={handleAddAssessment} 
//             disabled={!newAssessment.title.trim() || !newAssessment.youtubeLink.trim()}
//           >
//             Add Assessment
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Submit Confirmation Modal */}
//       <Modal
//         show={showSubmitModal}
//         onHide={() => !submitting && setShowSubmitModal(false)}
//         centered
//       >
//         <Modal.Header closeButton={!submitting}>
//           <Modal.Title>Submit All Assessments</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {submitSuccess ? (
//             <div className="text-center py-3">
//               <div className="mb-3">
//                 <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "3rem" }}></i>
//               </div>
//               <h5 className="text-success">Success!</h5>
//               <p>All assessments have been submitted successfully.</p>
//             </div>
//           ) : (
//             <>
//               <p>You are about to submit {assessments.length} assessment(s).</p>
//               <div className="mb-3">
//                 <h6>Details to be submitted:</h6>
//                 <ul className="text-muted">
//                   <li>Student ID: {studentId}</li>
//                   <li>Student Name: {studentName}</li>
//                   <li>Number of assessments: {assessments.length}</li>
//                 </ul>
//               </div>
//               <Alert variant="info">
//                 <i className="bi bi-info-circle me-2"></i>
//                 Only assessment details will be sent to the server.
//               </Alert>
//             </>
//           )}
//         </Modal.Body>
//         {!submitSuccess && (
//           <Modal.Footer>
//             <Button 
//               variant="secondary" 
//               onClick={() => setShowSubmitModal(false)}
//               disabled={submitting}
//             >
//               Cancel
//             </Button>
//             <Button 
//               variant="primary" 
//               onClick={handleSubmitAll}
//               disabled={submitting}
//             >
//               {submitting ? (
//                 <>
//                   <span className="spinner-border spinner-border-sm me-2"></span>
//                   Submitting...
//                 </>
//               ) : (
//                 'Confirm Submit'
//               )}
//             </Button>
//           </Modal.Footer>
//         )}
//       </Modal>
//     </Container>
//   );
// }






import React, { useState, useEffect } from "react";
import { 
  Button, 
  Form, 
  Modal, 
  Card, 
  Container,
  Row,
  Col,
  Alert,
  ListGroup,
  Spinner,
  Badge,
  Table,
  Tab,
  Tabs
} from "react-bootstrap";

// API Base URL
const API_BASE_URL = 'http://localhost:8080/api/activities';

// API Helper Function
const apiRequest = async (endpoint, method = 'GET', body = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// ALL API Methods from your Spring Boot Controller
const activityApi = {
  // Basic CRUD operations
  createActivity: (activity) => apiRequest('', 'POST', activity),
  createBulkActivities: (activities) => apiRequest('/bulk', 'POST', activities),
  getAllActivities: () => apiRequest(''),
  getActivityById: (id) => apiRequest(`/${id}`),
  getStudentActivities: (studentId) => apiRequest(`/student/${studentId}`),
  updateActivity: (id, activity) => apiRequest(`/${id}`, 'PUT', activity),
  deleteActivity: (id) => apiRequest(`/${id}`, 'DELETE'),
  deleteStudentActivities: (studentId) => apiRequest(`/student/${studentId}`, 'DELETE'),
  
  // Search and Query operations
  searchActivities: (studentId, subject, studentName) => {
    const params = new URLSearchParams();
    if (studentId) params.append('studentId', studentId);
    if (subject) params.append('subject', subject);
    if (studentName) params.append('studentName', studentName);
    return apiRequest(`/search?${params.toString()}`);
  },
  
  // Stats and analytics
  getActivityStats: () => apiRequest('/stats'),
  getStudentSummary: (studentId) => apiRequest(`/student/${studentId}/summary`),
  getActivitiesWithVideoLinks: () => apiRequest('/with-videos'),
  
  // Lists and metadata
  getAllStudentIds: () => apiRequest('/student-ids'),
  getAllSubjects: () => apiRequest('/subjects'),
  
  // Import/Export operations
  importActivities: (data) => apiRequest('/import', 'POST', data),
  exportActivities: () => apiRequest('/export'),
  
  // Existing assessment methods
  getStudentAssessments: (studentId) => apiRequest(`/student/${studentId}`),
  submitAssessment: (data) => apiRequest('/submit', 'POST', data),
};

// Helper function to extract YouTube video ID from URL
const extractYouTubeId = (url) => {
  if (!url) return null;
  
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export default function AssessmentPlayer() {
  const [assessments, setAssessments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newAssessment, setNewAssessment] = useState({ 
    title: "", 
    description: "", 
    subject: "",
    youtubeLink: "",
    studentId: "",
    studentName: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // New states for video player
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentVideoTitle, setCurrentVideoTitle] = useState("");
  
  // New states for additional features
  const [activeTab, setActiveTab] = useState("assessments");
  const [searchParams, setSearchParams] = useState({
    studentId: "",
    subject: "",
    studentName: ""
  });
  const [searchResults, setSearchResults] = useState([]);
  const [stats, setStats] = useState(null);
  const [studentIds, setStudentIds] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [videoActivities, setVideoActivities] = useState([]);

  // Load assessments from backend on component mount
  useEffect(() => {
    loadAssessments();
    loadAdditionalData();
  }, []);

  const loadAssessments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load all activities initially
      const data = await activityApi.getAllActivities();
      
      if (data && Array.isArray(data)) {
        setAssessments(data);
      } else {
        setAssessments([]);
      }
    } catch (err) {
      setError("Failed to load assessments. Please try again.");
      console.error("Error loading assessments:", err);
      setAssessments([]);
    } finally {
      setLoading(false);
    }
  };

  const loadAdditionalData = async () => {
    try {
      // Load stats
      const statsData = await activityApi.getActivityStats();
      setStats(statsData);
      
      // Load student IDs
      const ids = await activityApi.getAllStudentIds();
      setStudentIds(ids);
      
      // Load subjects
      const subjectsData = await activityApi.getAllSubjects();
      setSubjects(subjectsData);
      
      // Load video activities
      const videos = await activityApi.getActivitiesWithVideoLinks();
      setVideoActivities(videos);
    } catch (err) {
      console.error("Error loading additional data:", err);
    }
  };

  // Function to open video player
  const openVideoPlayer = (videoLink, title) => {
    const videoId = extractYouTubeId(videoLink);
    if (videoId) {
      setCurrentVideo(videoId);
      setCurrentVideoTitle(title || "Assessment Video");
      setShowVideoModal(true);
    } else {
      alert("Invalid YouTube URL. Please check the video link.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this assessment?")) {
      try {
        await activityApi.deleteActivity(id);
        setAssessments(prev => prev.filter(a => a.id !== id));
      } catch (err) {
        console.error("Error deleting assessment:", err);
        alert("Failed to delete assessment. Please try again.");
      }
    }
  };

  const handleAddAssessment = async () => {
    if (!newAssessment.title.trim() || !newAssessment.youtubeLink.trim()) {
      alert("Title and YouTube link are required");
      return;
    }

    if (!newAssessment.studentId.trim()) {
      alert("Student ID is required");
      return;
    }

    if (!newAssessment.studentName.trim()) {
      alert("Student Name is required");
      return;
    }

    try {
      const assessmentData = {
        studentId: newAssessment.studentId,
        studentName: newAssessment.studentName,
        subject: newAssessment.subject,
        description: newAssessment.description,
        currentTime: new Date().toISOString(),
        videoLink: newAssessment.youtubeLink
      };

      const created = await activityApi.createActivity(assessmentData);
      setAssessments(prev => [...prev, created]);
      setNewAssessment({ 
        title: "", 
        description: "", 
        subject: "", 
        youtubeLink: "",
        studentId: "",
        studentName: ""
      });
      setShowAddModal(false);
    } catch (err) {
      console.error("Error adding assessment:", err);
      alert("Failed to add assessment. Please try again.");
    }
  };

  const handleSubmitAll = async () => {
    setSubmitting(true);
    try {
      // Create bulk activities - using data from each assessment
      const activitiesToSubmit = assessments.map(a => ({
        studentId: a.studentId,
        studentName: a.studentName,
        subject: a.subject,
        description: a.description,
        currentTime: a.currentTime || new Date().toISOString(),
        videoLink: a.videoLink
      }));

      await activityApi.createBulkActivities(activitiesToSubmit);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowSubmitModal(false);
        loadAssessments(); // Refresh all assessments
      }, 2000);
    } catch (err) {
      console.error("Error submitting assessments:", err);
      alert("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSearch = async () => {
    try {
      const results = await activityApi.searchActivities(
        searchParams.studentId,
        searchParams.subject,
        searchParams.studentName
      );
      setSearchResults(results);
    } catch (err) {
      console.error("Error searching activities:", err);
      alert("Failed to search activities.");
    }
  };

  const openAddModal = () => {
    setNewAssessment({ 
      title: "", 
      description: "", 
      subject: "", 
      youtubeLink: "",
      studentId: "",
      studentName: ""
    });
    setShowAddModal(true);
  };

  const renderStats = () => (
    <Card className="shadow-sm mb-4">
      <Card.Header>
        <h5 className="mb-0">Activity Statistics</h5>
      </Card.Header>
      <Card.Body>
        {stats ? (
          <Row>
            <Col md={4} className="text-center">
              <h2 className="text-primary">{stats.totalActivities || 0}</h2>
              <p className="text-muted">Total Activities</p>
            </Col>
            <Col md={4} className="text-center">
              <h2 className="text-success">{stats.uniqueStudents || 0}</h2>
              <p className="text-muted">Unique Students</p>
            </Col>
            <Col md={4} className="text-center">
              <h2 className="text-info">{stats.subjectsCount || 0}</h2>
              <p className="text-muted">Subjects</p>
            </Col>
          </Row>
        ) : (
          <Spinner animation="border" size="sm" />
        )}
      </Card.Body>
    </Card>
  );

  const renderVideoActivities = () => (
    <Card className="shadow-sm mb-4">
      <Card.Header>
        <h5 className="mb-0">Video Activities ({videoActivities.length})</h5>
      </Card.Header>
      <Card.Body>
        {videoActivities.length === 0 ? (
          <p className="text-muted">No video activities found.</p>
        ) : (
          <ListGroup variant="flush">
            {videoActivities.slice(0, 5).map((activity, index) => (
              <ListGroup.Item key={index}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{activity.studentName}</strong>
                    <Badge bg="info" className="ms-2">{activity.subject}</Badge>
                    <p className="mb-0 text-muted">{activity.description}</p>
                  </div>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => openVideoPlayer(activity.videoLink, `${activity.studentName} - ${activity.subject}`)}
                  >
                    <i className="bi bi-play-circle me-1"></i> Play
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );

  const renderSearchTab = () => (
    <Card className="shadow-sm">
      <Card.Header>
        <h5 className="mb-0">Search Activities</h5>
      </Card.Header>
      <Card.Body>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                value={searchParams.studentId}
                onChange={(e) => setSearchParams({...searchParams, studentId: e.target.value})}
                placeholder="Enter student ID"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                value={searchParams.studentName}
                onChange={(e) => setSearchParams({...searchParams, studentName: e.target.value})}
                placeholder="Enter student name"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                value={searchParams.subject}
                onChange={(e) => setSearchParams({...searchParams, subject: e.target.value})}
                placeholder="Enter subject"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" onClick={handleSearch} className="mb-3">
          Search
        </Button>
        
        {searchResults.length > 0 && (
          <div className="mt-3">
            <h6>Search Results ({searchResults.length})</h6>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Subject</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((result, index) => (
                  <tr key={index}>
                    <td>{result.studentId}</td>
                    <td>{result.studentName}</td>
                    <td>{result.subject}</td>
                    <td>{result.description}</td>
                    <td>
                      {result.videoLink && (
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => openVideoPlayer(result.videoLink, `${result.studentName} - ${result.subject}`)}
                        >
                          <i className="bi bi-play-fill me-1"></i> Play
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );

  if (loading && activeTab === "assessments") {
    return (
      <Container fluid className="py-4">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading assessments...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="assessments" title="Assessments">
          <Row>
            <Col lg={12}>
              <Card className="shadow-sm mb-4">
                <Card.Header className="d-flex justify-content-between align-items-center bg-white">
                  <div>
                    <h5 className="mb-0">Assessment Panel</h5>
                    <small className="text-muted">
                      {assessments.length} assessment(s) found
                    </small>
                  </div>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="outline-primary" 
                      onClick={openAddModal}
                    >
                      <i className="bi bi-plus-circle me-1"></i> Add Assessment
                    </Button>
                  </div>
                </Card.Header>

                <Card.Body>
                  {error ? (
                    <Alert variant="danger" className="mb-0">
                      <Alert.Heading>Error Loading Assessments</Alert.Heading>
                      <p>{error}</p>
                      <Button variant="primary" onClick={loadAssessments}>
                        Retry
                      </Button>
                    </Alert>
                  ) : assessments.length === 0 ? (
                    <div className="text-center py-5">
                      <div className="mb-4">
                        <i className="bi bi-camera-video-off" style={{ fontSize: "3rem", color: "#6c757d" }}></i>
                      </div>
                      <h5 className="text-muted mb-3">No assessments found</h5>
                      <p className="text-muted mb-4">Add your first video assessment to get started</p>
                      <Button variant="primary" onClick={openAddModal}>
                        <i className="bi bi-plus-circle me-1"></i> Add Your First Assessment
                      </Button>
                    </div>
                  ) : (
                    <Row>
                      {assessments.map((assessment) => {
                        const videoId = extractYouTubeId(assessment.videoLink);
                        
                        return (
                          <Col md={4} key={assessment.id} className="mb-4">
                            <Card className="h-100 shadow-sm">
                              {/* Video Player - Displayed in 3-column grid */}
                              {videoId && (
                                <div>
                                  <div className="ratio ratio-16x9">
                                    <iframe
                                      src={`https://www.youtube.com/embed/${videoId}`}
                                      title="Assessment Video Player"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                      style={{ border: "none" }}
                                    ></iframe>
                                  </div>
                                </div>
                              )}
                              
                              <Card.Body className="d-flex flex-column">
                                <div className="flex-grow-1">
                                  <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h6 className="mb-0 text-truncate" title={assessment.subject || assessment.title}>
                                      {assessment.subject || 'Untitled'}
                                    </h6>
                                    <Badge bg="info">
                                      {assessment.subject || 'General'}
                                    </Badge>
                                  </div>
                                  
                                  <div className="mb-2">
                                    <small className="text-muted d-block">
                                      <i className="bi bi-person-circle me-1"></i>
                                      {assessment.studentName}
                                    </small>
                                    <small className="text-muted d-block mt-1">
                                      <i className="bi bi-id-card me-1"></i>
                                      ID: {assessment.studentId}
                                    </small>
                                  </div>
                                  
                                  {assessment.description && (
                                    <p className="text-muted mb-2 small" style={{ height: "40px", overflow: "hidden" }}>
                                      {assessment.description}
                                    </p>
                                  )}
                                  
                                  {assessment.currentTime && (
                                    <small className="text-muted d-block mt-2">
                                      <i className="bi bi-calendar me-1"></i>
                                      {new Date(assessment.currentTime).toLocaleDateString()}
                                    </small>
                                  )}
                                </div>
                                
                                <div className="mt-3 d-flex gap-2">
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="flex-grow-1"
                                    onClick={() => openVideoPlayer(assessment.videoLink, assessment.subject || 'Assessment Video')}
                                  >
                                    <i className="bi bi-arrows-fullscreen me-1"></i> Fullscreen
                                  </Button>
                                  <a 
                                    href={assessment.videoLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn btn-outline-secondary btn-sm flex-grow-1"
                                  >
                                    <i className="bi bi-box-arrow-up-right me-1"></i> YouTube
                                  </a>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="flex-grow-1"
                                    onClick={() => handleDelete(assessment.id)}
                                    title="Delete Assessment"
                                  >
                                    <i className="bi bi-trash me-1"></i> Delete
                                  </Button>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        );
                      })}
                    </Row>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
        
        <Tab eventKey="stats" title="Statistics">
          {renderStats()}
          {renderVideoActivities()}
        </Tab>
        
        <Tab eventKey="search" title="Search">
          {renderSearchTab()}
        </Tab>
        
        <Tab eventKey="students" title="Students">
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">All Student IDs</h5>
            </Card.Header>
            <Card.Body>
              {studentIds.length === 0 ? (
                <p className="text-muted">No student IDs found.</p>
              ) : (
                <ListGroup>
                  {studentIds.map((id, index) => (
                    <ListGroup.Item key={index}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>
                          <i className="bi bi-person-badge me-2"></i>
                          {id}
                        </span>
                        <div className="d-flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline-primary"
                            onClick={() => {
                              setSearchParams({...searchParams, studentId: id});
                              setActiveTab("search");
                            }}
                          >
                            Search Activities
                          </Button>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Tab>
        
        <Tab eventKey="subjects" title="Subjects">
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">All Subjects</h5>
            </Card.Header>
            <Card.Body>
              {subjects.length === 0 ? (
                <p className="text-muted">No subjects found.</p>
              ) : (
                <div className="d-flex flex-wrap gap-2">
                  {subjects.map((subject, index) => (
                    <Badge 
                      key={index} 
                      bg="info" 
                      className="p-3"
                      style={{ 
                        fontSize: "1rem", 
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                      }}
                      onClick={() => {
                        setSearchParams({...searchParams, subject: subject});
                        setActiveTab("search");
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <i className="bi bi-book me-2"></i>
                      {subject}
                    </Badge>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {/* Add Assessment Modal */}
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <i className="bi bi-plus-circle me-2"></i>
            Add New Video Assessment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={8}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Student ID *</Form.Label>
                    <Form.Control
                      value={newAssessment.studentId}
                      onChange={(e) =>
                        setNewAssessment({ ...newAssessment, studentId: e.target.value })
                      }
                      placeholder="Enter student ID"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Standard *</Form.Label>
                    <Form.Control
                      value={newAssessment.studentName}
                      onChange={(e) =>
                        setNewAssessment({ ...newAssessment, studentName: e.target.value })
                      }
                      placeholder="Enter Student Class"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Label>Assessment Title *</Form.Label>
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
                  rows={2}
                  value={newAssessment.description}
                  onChange={(e) =>
                    setNewAssessment({ ...newAssessment, description: e.target.value })
                  }
                  placeholder="Enter assessment description (optional)"
                />
              </Form.Group>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      value={newAssessment.subject}
                      onChange={(e) =>
                        setNewAssessment({ ...newAssessment, subject: e.target.value })
                      }
                      placeholder="e.g., Mathematics, Science"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>YouTube Link *</Form.Label>
                    <Form.Control
                      type="text"
                      value={newAssessment.youtubeLink}
                      onChange={(e) =>
                        setNewAssessment({ ...newAssessment, youtubeLink: e.target.value })
                      }
                      placeholder="https://youtube.com/watch?v=..."
                    />
                    <Form.Text className="text-muted">
                      Paste the full YouTube video URL
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            
            <Col md={4} className="d-flex flex-column">
              <div className="border rounded p-3 text-center h-100 d-flex flex-column justify-content-center">
                <i className="bi bi-youtube text-danger fs-1 mb-3"></i>
                <h6>Video Preview</h6>
                {newAssessment.youtubeLink && extractYouTubeId(newAssessment.youtubeLink) ? (
                  <div className="mt-2">
                    <div className="ratio ratio-16x9">
                      <iframe
                        src={`https://www.youtube.com/embed/${extractYouTubeId(newAssessment.youtubeLink)}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <small className="text-success mt-2 d-block">
                      <i className="bi bi-check-circle me-1"></i>
                      Valid YouTube link detected
                    </small>
                  </div>
                ) : (
                  <p className="text-muted small">
                    Enter a YouTube URL to see preview
                  </p>
                )}
                
                <div className="mt-3 pt-3 border-top">
                  <small className="text-muted">
                    <i className="bi bi-info-circle me-1"></i>
                    Assessment will be created for:
                  </small>
                  {newAssessment.studentId && newAssessment.studentName && (
                    <div className="mt-2">
                      <Badge bg="info" className="mb-1">
                        ID: {newAssessment.studentId}
                      </Badge>
                      <br />
                      <Badge bg="primary">
                        Standard: {newAssessment.studentName}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAddAssessment} 
            disabled={
              !newAssessment.title.trim() || 
              !newAssessment.youtubeLink.trim() ||
              !newAssessment.studentId.trim() ||
              !newAssessment.studentName.trim()
            }
          >
            <i className="bi bi-plus-circle me-1"></i>
            Add Assessment
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Submit Confirmation Modal - Kept but not used */}
      <Modal
        show={showSubmitModal}
        onHide={() => !submitting && setShowSubmitModal(false)}
        centered
      >
        <Modal.Header closeButton={!submitting} className="bg-warning">
          <Modal.Title>
            <i className="bi bi-send-check me-2"></i>
            Submit All Assessments
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitSuccess ? (
            <div className="text-center py-4">
              <div className="mb-3">
                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "3rem" }}></i>
              </div>
              <h5 className="text-success">Success!</h5>
              <p className="text-muted">All assessments have been submitted successfully.</p>
              <p className="text-muted small">You will be redirected shortly...</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-4">
                <i className="bi bi-send-fill text-warning" style={{ fontSize: "2.5rem" }}></i>
              </div>
              <p className="text-center">You are about to submit <strong>{assessments.length} assessment(s)</strong>.</p>
              
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                <strong>Important:</strong> This action will submit all assessment details to the server.
              </div>
              
              <div className="border rounded p-3 mt-3">
                <h6>Submission Details:</h6>
                <ul className="list-unstyled">
                  {assessments.length > 0 && (
                    <>
                      <li className="mb-2">
                        <i className="bi bi-person-check me-2 text-primary"></i>
                        Total Students: <strong>{new Set(assessments.map(a => a.studentId)).size}</strong>
                      </li>
                    </>
                  )}
                  <li className="mb-2">
                    <i className="bi bi-card-checklist me-2 text-primary"></i>
                    Assessments: <strong>{assessments.length}</strong>
                  </li>
                  <li>
                    <i className="bi bi-calendar-check me-2 text-primary"></i>
                    Date: <strong>{new Date().toLocaleDateString()}</strong>
                  </li>
                </ul>
              </div>
            </>
          )}
        </Modal.Body>
        {!submitSuccess && (
          <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={() => setShowSubmitModal(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button 
              variant="warning" 
              onClick={handleSubmitAll}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <i className="bi bi-send-check me-1"></i>
                  Confirm & Submit All
                </>
              )}
            </Button>
          </Modal.Footer>
        )}
      </Modal>

      {/* Video Player Modal */}
      <Modal
        show={showVideoModal}
        onHide={() => setShowVideoModal(false)}
        centered
        size="lg"
        fullscreen="md-down"
      >
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>
            <i className="bi bi-play-btn me-2"></i>
            {currentVideoTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="ratio ratio-16x9">
            {currentVideo && (
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&rel=0&modestbranding=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: "none" }}
              ></iframe>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <div className="d-flex justify-content-between w-100 align-items-center">
            <small className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              Video is playing in assessment mode
            </small>
            <Button
              variant="secondary"
              onClick={() => setShowVideoModal(false)}
            >
              Close Player
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}