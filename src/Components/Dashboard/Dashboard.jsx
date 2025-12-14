// import React, { useState, useEffect } from 'react';
// import { 
//   Container, 
//   Row, 
//   Col, 
//   Table, 
//   Button, 
//   Card, 
//   Alert, 
//   Spinner,
//   Modal,
//   Form,
//   InputGroup
// } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [studentToDelete, setStudentToDelete] = useState(null);
//   const navigate = useNavigate();

//   // API endpoints
//   const API_BASE_URL = 'http://localhost:8080/api';
  
//   // Fetch students from API
//   const fetchStudents = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/student`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch students');
//       }

//       const studentsData = await response.json();
//       setStudents(studentsData);
//       setError('');
//     } catch (err) {
//       console.error('Error fetching students:', err);
//       setError('Failed to load student data. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete student function
//   const deleteStudent = async (studentId) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/student/${studentId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete student');
//       }

//       // Remove student from local state
//       setStudents(prev => prev.filter(student => student.id !== studentId));
//       setShowDeleteModal(false);
//       setStudentToDelete(null);
//     } catch (err) {
//       console.error('Error deleting student:', err);
//       setError('Failed to delete student. Please try again.');
//     }
//   };

//   // Calculate attendance percentage (mock function - replace with actual logic)
//   const calculateAttendancePercentage = (student) => {
//     // This is a mock calculation - replace with your actual attendance logic
//     return Math.floor(Math.random() * 100); // Random percentage for demo
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const handleAddStudent = () => {
//     navigate('/');
//   };

//   const handleEditStudent = (student) => {
//     // Navigate to edit page or open edit modal
//     console.log('Edit student:', student);
//     // You can implement edit functionality here
//   };

//   const handleDeleteClick = (student) => {
//     setStudentToDelete(student);
//     setShowDeleteModal(true);
//   };

//   const handleConfirmDelete = () => {
//     if (studentToDelete) {
//       deleteStudent(studentToDelete.id);
//     }
//   };

//   const handleCloseDeleteModal = () => {
//     setShowDeleteModal(false);
//     setStudentToDelete(null);
//   };

//   // Get current user from localStorage
//   const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

//   return (
//     <Container fluid className="dashboard-container py-4">
//       {/* Header */}
//       <Row className="mb-4">
//         <Col>
//           <div className="d-flex justify-content-between align-items-center">
//             <div>
//               <h1 className="h2 fw-bold text-primary">Student Dashboard</h1>
//               <p className="text-muted mb-0">
//                 Welcome back, {currentUser.username || 'User'}!
//               </p>
//             </div>
//             <Button 
//               variant="primary" 
//               onClick={handleAddStudent}
//               className="d-flex align-items-center"
//             >
//               <i className="bi bi-plus-circle me-2"></i>
//               Add New Student
//             </Button>
//           </div>
//         </Col>
//       </Row>

//       {/* Error Alert */}
//       {error && (
//         <Row className="mb-3">
//           <Col>
//             <Alert variant="danger" onClose={() => setError('')} dismissible>
//               {error}
//             </Alert>
//           </Col>
//         </Row>
//       )}

//       {/* Students Table */}
//       <Row>
//         <Col>
//           <Card className="shadow-sm">
//             <Card.Header className="bg-white">
//               <h5 className="mb-0 fw-semibold">Student Enrollment</h5>
//             </Card.Header>
//             <Card.Body className="p-0">
//               {loading ? (
//                 <div className="text-center py-5">
//                   <Spinner animation="border" variant="primary" />
//                   <p className="mt-2 text-muted">Loading student data...</p>
//                 </div>
//               ) : students.length === 0 ? (
//                 <div className="text-center py-5">
//                   <i className="bi bi-people display-1 text-muted"></i>
//                   <h4 className="mt-3 text-muted">No Students Enrolled Yet</h4>
//                   <p className="text-muted mb-4">
//                     Get started by adding your first student to the system.
//                   </p>
//                   <Button variant="primary" onClick={handleAddStudent}>
//                     Add First Student
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="table-responsive">
//                   <Table hover className="mb-0">
//                     <thead className="bg-light">
//                       <tr>
//                         <th className="fw-semibold">SI.No</th>
//                         <th className="fw-semibold">Student Name</th>
//                         <th className="fw-semibold">Email</th>
//                         <th className="fw-semibold">Attendance Percentage</th>
//                         <th className="fw-semibold text-center">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {students.map((student, index) => (
//                         <tr key={student.id}>
//                           <td className="align-middle">
//                             <span className="fw-medium">{index + 1}</span>
//                           </td>
//                           <td className="align-middle">
//                             <div className="d-flex align-items-center">
//                               <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" 
//                                    style={{ width: '40px', height: '40px' }}>
//                                 <span className="text-white fw-bold">
//                                   {student.name ? student.name.charAt(0).toUpperCase() : 'U'}
//                                 </span>
//                               </div>
//                               <div>
//                                 <div className="fw-semibold">
//                                   {student.name || student.username || 'N/A'}
//                                 </div>
//                                 <small className="text-muted">
//                                   {student.username || 'No username'}
//                                 </small>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="align-middle">
//                             {student.email || 'N/A'}
//                           </td>
//                           <td className="align-middle">
//                             <div className="d-flex align-items-center">
//                               <div className="progress flex-grow-1 me-2" style={{ height: '8px' }}>
//                                 <div
//                                   className="progress-bar"
//                                   role="progressbar"
//                                   style={{ 
//                                     width: `${calculateAttendancePercentage(student)}%`,
//                                     backgroundColor: calculateAttendancePercentage(student) >= 75 ? 
//                                       '#28a745' : calculateAttendancePercentage(student) >= 50 ? 
//                                       '#ffc107' : '#dc3545'
//                                   }}
//                                 />
//                               </div>
//                               <span className="fw-medium">
//                                 {calculateAttendancePercentage(student)}%
//                               </span>
//                             </div>
//                           </td>
//                           <td className="align-middle text-center">
//                             <div className="d-flex justify-content-center gap-2">
//                               <Button
//                                 variant="outline-primary"
//                                 size="sm"
//                                 onClick={() => handleEditStudent(student)}
//                                 className="d-flex align-items-center"
//                               >
//                                 <i className="bi bi-pencil me-1"></i>
//                                 Edit
//                               </Button>
//                               <Button
//                                 variant="outline-danger"
//                                 size="sm"
//                                 onClick={() => handleDeleteClick(student)}
//                                 className="d-flex align-items-center"
//                               >
//                                 <i className="bi bi-trash me-1"></i>
//                                 Delete
//                               </Button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </div>
//               )}
//             </Card.Body>
//             {students.length > 0 && (
//               <Card.Footer className="bg-white">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <small className="text-muted">
//                     Showing {students.length} student{students.length !== 1 ? 's' : ''}
//                   </small>
//                   <Button 
//                     variant="outline-primary" 
//                     size="sm"
//                     onClick={handleAddStudent}
//                   >
//                     <i className="bi bi-plus-circle me-1"></i>
//                     Add Another Student
//                   </Button>
//                 </div>
//               </Card.Footer>
//             )}
//           </Card>
//         </Col>
//       </Row>

//       {/* Delete Confirmation Modal */}
//       <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Delete</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to delete student{' '}
//           <strong>{studentToDelete?.name || studentToDelete?.username}</strong>?
//           This action cannot be undone.
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseDeleteModal}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleConfirmDelete}>
//             Delete Student
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default Dashboard;





// import React, { useState, useEffect } from 'react';
// import { 
//   Container, 
//   Row, 
//   Col, 
//   Table, 
//   Button, 
//   Card, 
//   Alert, 
//   Spinner,
//   Modal,
//   Form,
//   InputGroup
// } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [studentToDelete, setStudentToDelete] = useState(null);
//   const navigate = useNavigate();

//   // API endpoints - Updated to use /api/dashboard
//   const API_BASE_URL = 'http://localhost:8080/api/students';
  
//   // Fetch students from API - Updated endpoint
//   const fetchStudents = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}`, {  // Now pointing to /api/dashboard
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch students');
//       }

//       const studentsData = await response.json();
//       setStudents(studentsData);
//       setError('');
//     } catch (err) {
//       console.error('Error fetching students:', err);
//       setError('Failed to load student data. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete student function - Updated endpoint
//   const deleteStudent = async (studentId) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/${studentId}`, {  // Now /api/dashboard/{id}
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete student');
//       }

//       // Remove student from local state
//       setStudents(prev => prev.filter(student => student.id !== studentId));
//       setShowDeleteModal(false);
//       setStudentToDelete(null);
//     } catch (err) {
//       console.error('Error deleting student:', err);
//       setError('Failed to delete student. Please try again.');
//     }
//   };

//   // Calculate attendance percentage (mock function - replace with actual logic)
//   const calculateAttendancePercentage = (student) => {
//     // This is a mock calculation - replace with your actual attendance logic
//     return Math.floor(Math.random() * 100); // Random percentage for demo
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const handleAddStudent = () => {
//     navigate('/student-details');
//   };

//   const handleEditStudent = (student) => {
//     // Navigate to edit page or open edit modal
//     console.log('Edit student:', student);
//     // You can implement edit functionality here
//   };

//   const handleDeleteClick = (student) => {
//     setStudentToDelete(student);
//     setShowDeleteModal(true);
//   };

//   const handleConfirmDelete = () => {
//     if (studentToDelete) {
//       deleteStudent(studentToDelete.id);
//     }
//   };

//   const handleCloseDeleteModal = () => {
//     setShowDeleteModal(false);
//     setStudentToDelete(null);
//   };

//   // Get current user from localStorage
//   const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

//   return (
//     <Container fluid className="dashboard-container py-4">
//       {/* Header */}
//       <Row className="mb-4">
//         <Col>
//           <div className="d-flex justify-content-between align-items-center">
//             <div>
//               <h1 className="h2 fw-bold text-primary">Student Dashboard</h1>
//               <p className="text-muted mb-0">
//                 Welcome back, {currentUser.username || 'User'}!
//               </p>
//             </div>
//             <Button 
//               variant="primary" 
//               onClick={handleAddStudent}
//               className="d-flex align-items-center"
//             >
//               <i className="bi bi-plus-circle me-2"></i>
//               Add New Teacher
//             </Button>
//           </div>
//         </Col>
//       </Row>

//       {/* Error Alert */}
//       {error && (
//         <Row className="mb-3">
//           <Col>
//             <Alert variant="danger" onClose={() => setError('')} dismissible>
//               {error}
//             </Alert>
//           </Col>
//         </Row>
//       )}

//       {/* Students Table */}
//       <Row>
//         <Col>
//           <Card className="shadow-sm">
//             <Card.Header className="bg-white">
//               <h5 className="mb-0 fw-semibold">Student Enrollment</h5>
//             </Card.Header>
//             <Card.Body className="p-0">
//               {loading ? (
//                 <div className="text-center py-5">
//                   <Spinner animation="border" variant="primary" />
//                   <p className="mt-2 text-muted">Loading student data...</p>
//                 </div>
//               ) : students.length === 0 ? (
//                 <div className="text-center py-5">
//                   <i className="bi bi-people display-1 text-muted"></i>
//                   <h4 className="mt-3 text-muted">No Students Enrolled Yet</h4>
//                   <p className="text-muted mb-4">
//                     Get started by adding your first student to the system.
//                   </p>
//                   <Button variant="primary" onClick={handleAddStudent}>
//                     Add First Student
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="table-responsive">
//                   <Table hover className="mb-0">
//                     <thead className="bg-light">
//                       <tr>
//                         <th className="fw-semibold">SI.No</th>
//                         <th className="fw-semibold">Student Name</th>
//                         <th className="fw-semibold">Email</th>
//                         <th className="fw-semibold">Attendance Percentage</th>
//                         <th className="fw-semibold text-center">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {students.map((student, index) => (
//                         <tr key={student.id}>
//                           <td className="align-middle">
//                             <span className="fw-medium">{index + 1}</span>
//                           </td>
//                           <td className="align-middle">
//                             <div className="d-flex align-items-center">
//                               <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" 
//                                    style={{ width: '40px', height: '40px' }}>
//                                 <span className="text-white fw-bold">
//                                   {student.name ? student.name.charAt(0).toUpperCase() : 'U'}
//                                 </span>
//                               </div>
//                               <div>
//                                 <div className="fw-semibold">
//                                   {student.name || student.username || 'N/A'}
//                                 </div>
//                                 <small className="text-muted">
//                                   {student.username || 'No username'}
//                                 </small>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="align-middle">
//                             {student.email || 'N/A'}
//                           </td>
//                           <td className="align-middle">
//                             <div className="d-flex align-items-center">
//                               <div className="progress flex-grow-1 me-2" style={{ height: '8px' }}>
//                                 <div
//                                   className="progress-bar"
//                                   role="progressbar"
//                                   style={{ 
//                                     width: `${calculateAttendancePercentage(student)}%`,
//                                     backgroundColor: calculateAttendancePercentage(student) >= 75 ? 
//                                       '#28a745' : calculateAttendancePercentage(student) >= 50 ? 
//                                       '#ffc107' : '#dc3545'
//                                   }}
//                                 />
//                               </div>
//                               <span className="fw-medium">
//                                 {calculateAttendancePercentage(student)}%
//                               </span>
//                             </div>
//                           </td>
//                           <td className="align-middle text-center">
//                             <div className="d-flex justify-content-center gap-2">
//                               <Button
//                                 variant="outline-primary"
//                                 size="sm"
//                                 onClick={() => handleEditStudent(student)}
//                                 className="d-flex align-items-center"
//                               >
//                                 <i className="bi bi-pencil me-1"></i>
//                                 Edit
//                               </Button>
//                               <Button
//                                 variant="outline-danger"
//                                 size="sm"
//                                 onClick={() => handleDeleteClick(student)}
//                                 className="d-flex align-items-center"
//                               >
//                                 <i className="bi bi-trash me-1"></i>
//                                 Delete
//                               </Button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </div>
//               )}
//             </Card.Body>
//             {students.length > 0 && (
//               <Card.Footer className="bg-white">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <small className="text-muted">
//                     Showing {students.length} student{students.length !== 1 ? 's' : ''}
//                   </small>
//                   <Button 
//                     variant="outline-primary" 
//                     size="sm"
//                     onClick={handleAddStudent}
//                   >
//                     <i className="bi bi-plus-circle me-1"></i>
//                     Add Another Student
//                   </Button>
//                 </div>
//               </Card.Footer>
//             )}
//           </Card>
//         </Col>
//       </Row>

//       {/* Delete Confirmation Modal */}
//       <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Delete</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to delete student{' '}
//           <strong>{studentToDelete?.name || studentToDelete?.username}</strong>?
//           This action cannot be undone.
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseDeleteModal}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleConfirmDelete}>
//             Delete Student
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default Dashboard;










// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Nav,
  Navbar,
  Form,
  InputGroup,
  Button,
  ListGroup,
  Container,
  ProgressBar,
  Badge
} from "react-bootstrap";

const API_BASE = "https://example.com/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    students: 1100,
    teachers: 40,
    staffs: 20,
    awards: 210,
    boys: 660,
    girls: 440,
  });

  const [selectedDate, setSelectedDate] = useState(new Date());

  // Trading-style earnings data with ups and downs
  const earningsData = [
    { month: 'Jan', income: 42000, expense: 31000, profit: 11000, trend: 'up' },
    { month: 'Feb', income: 48000, expense: 35000, profit: 13000, trend: 'up' },
    { month: 'Mar', income: 45000, expense: 38000, profit: 7000, trend: 'down' },
    { month: 'Apr', income: 52000, expense: 40000, profit: 12000, trend: 'up' },
    { month: 'May', income: 58000, expense: 42000, profit: 16000, trend: 'up' },
    { month: 'Jun', income: 54000, expense: 45000, profit: 9000, trend: 'down' },
    { month: 'Jul', income: 62000, expense: 48000, profit: 14000, trend: 'up' },
    { month: 'Aug', income: 59000, expense: 52000, profit: 7000, trend: 'down' },
  ];

  // Attendance data for clean bar chart
  const attendanceData = [
    { day: 'Mon', present: 92, absent: 8 },
    { day: 'Tue', present: 95, absent: 5 },
    { day: 'Wed', present: 88, absent: 12 },
    { day: 'Thu', present: 96, absent: 4 },
    { day: 'Fri', present: 90, absent: 10 },
  ];

  // Student gender data
  const genderData = [
    { name: 'Boys', value: 60, color: '#3b82f6' },
    { name: 'Girls', value: 40, color: '#f59e0b' },
  ];

  // Sidebar navigation items with routes
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Teacher", path: "/teacherlist" },
    { name: "Student", path: "/student-Table" },
    { name: "Attendance", path: "/student-Table" },
    { name: "Admin", path: "/admin" },
    { name: "Assessment", path: "/assesment" },
    { name: "Task", path: "/task" },
  ];

  // Card colors for different statistics
  const cardColors = [
    { bg: '#5ed7fcff', border: '#4f46e5', text: '#4f46e5' },
    { bg: '#fce179ff', border: '#f59e0b', text: '#92400e' },
    { bg: '#6cf89dff', border: '#22c55e', text: '#166534' },
    { bg: '#fd66bcff', border: '#ec4899', text: '#9d174d' },
  ];

  // School facilities data
  const facilities = [
    { name: "Courses", count: 12, icon: "📚", color: "#4f46e5" },
    { name: "Laboratories", count: 8, icon: "🔬", color: "#10b981" },
    { name: "Libraries", count: 3, icon: "📖", color: "#f59e0b" },
    { name: "Playgrounds", count: 5, icon: "⚽", color: "#ef4444" },
  ];

  // Transportation data
  const transportData = [
    { type: "School Buses", count: 15, status: "Active", color: "#3b82f6" },
    { type: "Vans", count: 8, status: "Active", color: "#10b981" },
    { type: "Cars", count: 5, status: "Maintenance", color: "#f59e0b" },
  ];

  // Attendance summary data
  const attendanceSummary = [
    { grade: "Grade 1-5", present: 94, absent: 6, color: "primary" },
    { grade: "Grade 6-8", present: 89, absent: 11, color: "success" },
    { grade: "Grade 9-12", present: 92, absent: 8, color: "warning" },
  ];

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [studentsRes, teachersRes, staffsRes, awardsRes, genderRes] =
          await Promise.all([
            fetch(`${API_BASE}/students/count`),
            fetch(`${API_BASE}/teachers/count`),
            fetch(`${API_BASE}/staffs/count`),
            fetch(`${API_BASE}/awards/count`),
            fetch(`${API_BASE}/students/gender-count`),
          ]);

        const studentsJson = studentsRes.ok ? await studentsRes.json() : { count: 100 };
        const teachersJson = teachersRes.ok ? await teachersRes.json() : { count: 40 };
        const staffsJson = staffsRes.ok ? await staffsRes.json() : { count: 20 };
        const awardsJson = awardsRes.ok ? await awardsRes.json() : { count: 210 };
        const genderJson = genderRes.ok ? await genderRes.json() : { boys: 60, girls: 40 };

        setStats({
          students: studentsJson?.count || 100,
          teachers: teachersJson?.count || 40,
          staffs: staffsJson?.count || 20,
          awards: awardsJson?.count || 210,
          boys: genderJson?.boys || 60,
          girls: genderJson?.girls || 40,
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchCounts();
  }, []);

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const currentMonthDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }

    return days;
  };

  const changeMonth = (offset) => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + offset,
      1
    );
    setSelectedDate(newDate);
  };

  const days = currentMonthDays();
  const today = new Date();

  return (
    <Container fluid className="p-0" style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Row className="g-0">
        {/* Sidebar */}
        <Col md={3} lg={2} className="bg-white border-end">
          <div className="p-3">
            <h5 className="text-primary fw-bold mb-4">Infant Jesus (IJMS)</h5>
            <Nav className="flex-column">
              {navItems.map((item, idx) => (
                <Button
                  key={item.name}
                  variant={idx === 0 ? "primary" : "light"}
                  className={`mb-2 text-start ${idx === 0 ? 'active' : ''}`}
                  onClick={() => navigate(item.path)}
                  style={{
                    borderRadius: "50px",
                    padding: "10px 16px",
                    fontSize: "14px",
                    fontWeight: idx === 0 ? "600" : "400",
                    border: "none",
                    boxShadow: idx === 0 ? "0 2px 4px rgba(79, 70, 229, 0.2)" : "none",
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Nav>
          </div>
        </Col>

        {/* Main Content Area */}
        <Col md={9} lg={10}>
          <div className="p-4">
            {/* Topbar */}
            <Navbar expand="lg" className="bg-transparent mb-4 px-0">
              <Navbar.Brand className="fw-bold fs-4">Dashboard</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <InputGroup className="me-3" style={{ maxWidth: "300px" }}>
                  <Form.Control 
                    placeholder="Search..." 
                    className="rounded-pill"
                  />
                </InputGroup>
                <div className="d-flex align-items-center border rounded-pill p-2 bg-white">
                  <div className="bg-danger bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-2" 
                       style={{ width: "40px", height: "40px" }}>
                    <span className="fw-bold text-danger">L</span>
                  </div>
                  <div>
                    <div className="fw-bold">Linda Adora</div>
                    <div className="text-muted small">Admin</div>
                  </div>
                </div>
              </Navbar.Collapse>
            </Navbar>

            {/* Statistics Cards */}
            <Row className="mb-4">
              {[
                { title: "Students", value: stats.students, icon: "👨‍🎓" },
                { title: "Teachers", value: stats.teachers, icon: "👩‍🏫" },
                { title: "Staffs", value: stats.staffs, icon: "👨‍💼" },
                { title: "Awards", value: stats.awards, icon: "🏆" },
              ].map((item, index) => (
                <Col md={3} key={index} className="mb-3">
                  <Card 
                    className="border-0 shadow-sm h-70"
                    style={{ 
                      backgroundColor: cardColors[index].bg,
                      borderLeft: `4px solid ${cardColors[index].border}`,
                      borderRadius: "12px"
                    }}
                  >
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <Card.Subtitle className="text-muted mb-1">{item.title}</Card.Subtitle>
                          <Card.Title className="fw-bold" style={{ color: cardColors[index].text, fontSize: "2rem" }}>
                            {item.value}
                          </Card.Title>
                        </div>
                        <div className="fs-3">{item.icon}</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Charts Row */}
            <Row className="mb-4">
              {/* Students Distribution with Added Content */}
              <Col lg={6} className="mb-4">
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body>
                    <Card.Title className="fw-bold mb-4">Students Distribution</Card.Title>
                    <div className="d-flex align-items-center mb-4">
                      {/* Clean Pie Chart */}
                      <div className="position-relative" style={{ width: "180px", height: "180px" }}>
                        <div className="position-absolute" style={{
                          width: "180px",
                          height: "180px",
                          borderRadius: "50%",
                          background: `conic-gradient(
                            #3b82f6 0% ${genderData[0].value}%,
                            #f59e0b ${genderData[0].value}% 100%
                          )`,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}></div>
                        <div className="position-absolute top-50 start-50 translate-middle" style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          backgroundColor: "#fff",
                          border: "3px solid #e5e7eb",
                          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)'
                        }}></div>
                        <div className="position-absolute top-50 start-50 translate-middle text-center">
                          <div className="fw-bold fs-4" style={{ color: '#4f46e5' }}>{stats.boys + stats.girls}</div>
                          <div className="small text-muted">Total</div>
                        </div>
                      </div>
                      <div className="ms-4">
                        {genderData.map((item, index) => (
                          <div key={index} className="mb-3">
                            <div className="d-flex align-items-center mb-1">
                              <div 
                                className="rounded-circle me-2" 
                                style={{ 
                                  width: "14px", 
                                  height: "14px", 
                                  backgroundColor: item.color,
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }}
                              />
                              <span className="fw-medium" style={{ fontSize: "14px" }}>{item.name}</span>
                            </div>
                            <div className="fw-bold" style={{ fontSize: "1.2rem", color: item.color }}>
                              {item.value}%
                            </div>
                            <div className="text-muted small">
                              {item.name === 'Boys' ? stats.boys : stats.girls} students
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* School Facilities Section */}
                    <div className="mt-4 pt-3 border-top">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-bold mb-0">School Facilities</h6>
                        <Badge bg="light" text="dark" className="rounded-pill px-2 py-1">
                          View All
                        </Badge>
                      </div>
                      
                      <Row className="g-2 mb-3">
                        {facilities.map((facility, index) => (
                          <Col xs={6} key={index}>
                            <div 
                              className="p-2 rounded d-flex align-items-center"
                              style={{ 
                                backgroundColor: `${facility.color}15`,
                                border: `1px solid ${facility.color}30`
                              }}
                            >
                              <div className="me-2" style={{ fontSize: "20px" }}>{facility.icon}</div>
                              <div>
                                <div className="fw-medium small">{facility.name}</div>
                                <div className="fw-bold" style={{ color: facility.color }}>{facility.count}</div>
                              </div>
                            </div>
                          </Col>
                        ))}
                      </Row>

                      {/* Infrastructure & Vehicles */}
                      <div className="mt-3">
                        <h6 className="fw-bold mb-2">Infrastructure & Transport</h6>
                        <div className="bg-light rounded p-2">
                          <div className="d-flex justify-content-between mb-2">
                            <span className="small text-muted">Classrooms</span>
                            <span className="fw-medium">45 Rooms</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="small text-muted">Computer Labs</span>
                            <span className="fw-medium">4 Labs</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="small text-muted">Sports Facilities</span>
                            <span className="fw-medium">8 Fields</span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Action Buttons */}
                      <div className="mt-3 d-grid gap-2">
                        <Button variant="outline-primary" size="sm" className="d-flex align-items-center justify-content-center">
                          <span className="me-2">🏫</span>
                          View Infrastructure Details
                        </Button>
                        <Button variant="outline-success" size="sm" className="d-flex align-items-center justify-content-center">
                          <span className="me-2">🚌</span>
                          Manage Transportation
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Professional Attendance Bar Chart with Added Content */}
              <Col lg={6} className="mb-4">
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <Card.Title className="fw-bold m-0" style={{ fontSize: "18px" }}>Weekly Attendance</Card.Title>
                        <div className="text-muted small mt-1">Grade 3 • Last 5 Days</div>
                      </div>
                      <Badge bg="success" className="rounded-pill px-3 py-1">
                        <i className="bi bi-arrow-up me-1"></i> +5%
                      </Badge>
                    </div>
                    <div style={{ height: "230px", position: "relative" }}>
                      {/* Y-axis labels */}
                      <div className="position-absolute h-100 d-flex flex-column justify-content-between" style={{ left: "0", width: "25px" }}>
                        <span className="text-muted small text-end" style={{ fontSize: "10px" }}>100%</span>
                        <span className="text-muted small text-end" style={{ fontSize: "10px" }}>80%</span>
                        <span className="text-muted small text-end" style={{ fontSize: "10px" }}>60%</span>
                        <span className="text-muted small text-end" style={{ fontSize: "10px" }}>40%</span>
                        <span className="text-muted small text-end" style={{ fontSize: "10px" }}>20%</span>
                      </div>
                      
                      {/* Professional Bar Chart with smaller bars */}
                      <div className="d-flex justify-content-between align-items-end h-100" style={{ marginLeft: "30px", marginRight: "15px" }}>
                        {attendanceData.map((item, index) => {
                          const previousDay = index > 0 ? attendanceData[index - 1].present : item.present;
                          const isUp = item.present >= previousDay;
                          const barWidth = "14px"; // Smaller bar width
                          
                          return (
                            <div key={index} className="d-flex flex-column align-items-center" style={{ width: "18%" }}>
                              {/* Single Bar for Present Percentage */}
                              <div className="position-relative" style={{ height: "150px", width: "100%" }}>
                                {/* Background bar */}
                                <div className="position-absolute bottom-0 start-50 translate-middle-x rounded-top" style={{ 
                                  height: "100px",
                                  width: barWidth,
                                  backgroundColor: "#f3f4f6"
                                }}></div>
                                
                                {/* Main bar - smaller */}
                                <div 
                                  className="position-absolute bottom-0 start-50 translate-middle-x rounded-top transition-all"
                                  style={{ 
                                    height: `${(item.present / 100) * 150}px`,
                                    width: barWidth,
                                    backgroundColor: isUp ? "#10b981" : "#ef4444",
                                    transition: "height 0.5s ease",
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                                  }}
                                >
                                  {/* Value label */}
                                  <div className="position-absolute top-0 start-50 translate-middle-x" style={{ 
                                    marginTop: "-18px",
                                    fontSize: "10px", 
                                    color: isUp ? "#10b981" : "#ef4444",
                                    fontWeight: "600",
                                    whiteSpace: "nowrap"
                                  }}>
                                    {item.present}%
                                  </div>
                                </div>
                                
                                {/* Trend indicator - smaller */}
                                <div className="position-absolute top-0 start-50 translate-middle-x" style={{ marginTop: "-30px" }}>
                                  {isUp ? (
                                    <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" 
                                         style={{ width: "20px", height: "20px", fontSize: "10px" }}>
                                      <i className="bi bi-arrow-up"></i>
                                    </div>
                                  ) : (
                                    <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center" 
                                         style={{ width: "20px", height: "20px", fontSize: "10px" }}>
                                      <i className="bi bi-arrow-down"></i>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Day Label - smaller */}
                              <div className="mt-3 fw-medium text-dark" style={{ fontSize: "12px" }}>{item.day}</div>
                              
                              {/* Absent info - smaller */}
                              <div className="mt-1" style={{ fontSize: "10px", color: "#6b7280" }}>
                                <span className="fw-medium">{item.absent} %</span> absent
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Average Line */}
                      <div className="position-absolute top-0 end-0" style={{ marginTop: "25px", marginRight: "-10px" }}>
                        <div className="d-flex align-items-center">
                          <div className="me-1" style={{ 
                            width: "15px", 
                            height: "0", 
                            borderTop: "1.5px dashed #6b7280",
                            opacity: 0.6
                          }}></div>
                          <span className="small text-muted" style={{ fontSize: "10px" }}>Avg: 92%</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Summary */}
                    <div className="mt-3 pt-3 border-top">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <div className="small text-muted">This Week's Performance</div>
                          <div className="fw-bold">Excellent</div>
                        </div>
                        <div className="text-end">
                          <div className="small text-muted">Best Day</div>
                          <div className="fw-bold text-success">Thu: 96%</div>
                        </div>
                      </div>

                      {/* Attendance by Grade Levels */}
                      <div className="mt-3">
                        <h6 className="fw-bold mb-2">Attendance by Grade</h6>
                        <div className="bg-light rounded p-2">
                          {attendanceSummary.map((item, index) => (
                            <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                              <div>
                                <span className="fw-medium">{item.grade}</span>
                                <div className="small text-muted">
                                  <span className="text-success">{item.present}% present</span> • 
                                  <span className="text-danger"> {item.absent}% absent</span>
                                </div>
                              </div>
                              <Badge bg={item.color} className="rounded-pill px-2 py-1">
                                {item.present}%
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Transportation Status */}
                      <div className="mt-3">
                        <h6 className="fw-bold mb-2">Transport Status</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {transportData.map((vehicle, index) => (
                            <div 
                              key={index}
                              className="p-2 rounded d-flex align-items-center"
                              style={{ 
                                backgroundColor: `${vehicle.color}15`,
                                border: `1px solid ${vehicle.color}30`,
                                minWidth: "120px"
                              }}
                            >
                              <div className="me-2">
                                <div className="fw-medium small">{vehicle.type}</div>
                                <div className="fw-bold" style={{ color: vehicle.color }}>{vehicle.count}</div>
                              </div>
                              <Badge 
                                bg={vehicle.status === "Active" ? "success" : "warning"} 
                                className="ms-auto"
                                style={{ fontSize: "10px" }}
                              >
                                {vehicle.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Attendance Actions */}
                      <div className="mt-3 d-grid gap-2">
                        <Button variant="primary" size="sm" className="d-flex align-items-center justify-content-center">
                          <span className="me-2">📊</span>
                          Generate Attendance Report
                        </Button>
                        <Button variant="outline-secondary" size="sm" className="d-flex align-items-center justify-content-center">
                          <span className="me-2">📧</span>
                          Notify Absent Students
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Calendar and Agenda Row */}
            <Row>
              {/* Calendar */}
              <Col lg={4} className="mb-4">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Card.Title className="fw-bold m-0" style={{ fontSize: "18px" }}>
                        {selectedDate.toLocaleString("en-US", { month: "long", year: "numeric" })}
                      </Card.Title>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Button 
                        variant="light" 
                        size="sm" 
                        onClick={() => changeMonth(-1)}
                        className="rounded-circle"
                        style={{ width: "32px", height: "32px", fontSize: "12px" }}
                      >
                        <i className="bi bi-chevron-left"></i>
                      </Button>
                      <div className="fw-bold" style={{ fontSize: "16px" }}>
                        {selectedDate.toLocaleString("en-US", { month: "short", year: "numeric" })}
                      </div>
                      <Button 
                        variant="light" 
                        size="sm" 
                        onClick={() => changeMonth(1)}
                        className="rounded-circle"
                        style={{ width: "32px", height: "32px", fontSize: "12px" }}
                      >
                        <i className="bi bi-chevron-right"></i>
                      </Button>
                    </div>

                    <div className="row g-1 text-center">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="col text-muted small p-1" style={{ fontSize: "11px" }}>
                          {day}
                        </div>
                      ))}
                      {days.map((date, index) => {
                        const isToday = date && 
                          date.getDate() === today.getDate() && 
                          date.getMonth() === today.getMonth() && 
                          date.getFullYear() === today.getFullYear();
                        
                        return (
                          <div 
                            key={index} 
                            className={`col p-1 ${date ? 'cursor-pointer' : ''}`}
                            onClick={() => date && setSelectedDate(date)}
                          >
                            {date && (
                              <div 
                                className={`rounded-circle d-flex align-items-center justify-content-center mx-auto ${
                                  isToday ? 'bg-primary text-white' : 'text-dark'
                                }`}
                                style={{ 
                                  width: "30px", 
                                  height: "30px",
                                  fontSize: "12px",
                                  transition: "all 0.2s"
                                }}
                                onMouseEnter={(e) => {
                                  if (!isToday) e.currentTarget.style.backgroundColor = '#f3f4f6';
                                }}
                                onMouseLeave={(e) => {
                                  if (!isToday) e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                              >
                                {date.getDate()}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Agenda */}
              <Col lg={8} className="mb-4">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Card.Title className="fw-bold m-0" style={{ fontSize: "18px" }}>Today's Agenda</Card.Title>
                      <Button variant="outline-primary" size="sm" style={{ fontSize: "12px" }}>
                        <i className="bi bi-plus me-1"></i> Add Event
                      </Button>
                    </div>
                    
                    <ListGroup variant="flush">
                      {[
                        { time: "08:00 AM", title: "All Grade • Homeroom & Announcement", color: "primary" },
                        { time: "10:00 AM", title: "Grade 3–5 • Math Review & Practice", color: "success" },
                        { time: "10:30 AM", title: "Grade 6–8 • Science Experiment & Discussion", color: "warning" },
                        { time: "02:00 PM", title: "Staff Meeting • Monthly Review", color: "info" },
                        { time: "04:00 PM", title: "Parent-Teacher Conference", color: "danger" },
                      ].map((event, index) => (
                        <ListGroup.Item key={index} className="border-0 py-2">
                          <div className="d-flex align-items-center">
                            <div 
                              className={`bg-${event.color} bg-opacity-10 text-${event.color} rounded-pill px-3 py-1 me-3`}
                              style={{ minWidth: "85px", fontSize: "12px" }}
                            >
                              <span className="fw-medium">{event.time}</span>
                            </div>
                            <div className="flex-grow-1">
                              <div className="fw-medium" style={{ fontSize: "14px" }}>{event.title}</div>
                            </div>
                            <Badge bg={event.color} className="rounded-pill" style={{ fontSize: "11px" }}>
                              {event.time.includes('AM') ? 'Morning' : 'Afternoon'}
                            </Badge>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                    
                    <div className="mt-4 pt-3 border-top text-muted small" style={{ fontSize: "12px" }}>
                      <i className="bi bi-calendar-check me-1"></i>
                      Selected date: {formatDate(today)}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;