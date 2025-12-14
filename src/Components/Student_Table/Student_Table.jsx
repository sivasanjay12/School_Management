


import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Table, 
  Button, 
  Card, 
  Alert, 
  Spinner,
  Modal,
  Form,
  InputGroup,
  Badge,
  Pagination
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Student_Table = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [teacher, setTeacher] = useState(null); // Teacher state
  const navigate = useNavigate();

  // API endpoints
  const API_BASE_URL = 'http://localhost:8080/api/students';
  
  // Fetch students from API
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }

      const studentsData = await response.json();
      setStudents(studentsData);
      setFilteredStudents(studentsData);
      setError('');
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Failed to load student data. Please check server connection.');
    } finally {
      setLoading(false);
    }
  };

  // Delete student function - API CALL
  const deleteStudent = async (studentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${studentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete student');
      }

      // Remove student from local state
      setStudents(prev => prev.filter(student => student.id !== studentId));
      setFilteredStudents(prev => prev.filter(student => student.id !== studentId));
      setShowDeleteModal(false);
      setStudentToDelete(null);
      
      alert('Student deleted successfully!');
    } catch (err) {
      console.error('Error deleting student:', err);
      setError('Failed to delete student. Please try again.');
    }
  };

  // Edit student function - API CALL
  const editStudent = async (studentId, updatedData) => {
    try {
      setEditLoading(true);
      const response = await fetch(`${API_BASE_URL}/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update student');
      }

      const updatedStudent = await response.json();
      
      // Update student in local state
      setStudents(prev => prev.map(student => 
        student.id === studentId ? updatedStudent.student || updatedStudent : student
      ));
      setFilteredStudents(prev => prev.map(student => 
        student.id === studentId ? updatedStudent.student || updatedStudent : student
      ));
      
      setShowEditModal(false);
      setStudentToEdit(null);
      setEditFormData({});
      
      alert('Student updated successfully!');
    } catch (err) {
      console.error('Error updating student:', err);
      setError('Failed to update student. Please try again.');
    } finally {
      setEditLoading(false);
    }
  };

  // Filter students based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student => {
        const searchLower = searchTerm.toLowerCase();
        return (
          student.name?.toLowerCase().includes(searchLower) ||
          student.rollNo?.toString().toLowerCase().includes(searchLower) ||
          student.email?.toLowerCase().includes(searchLower) ||
          student.standard?.toLowerCase().includes(searchLower) ||
          student.section?.toLowerCase().includes(searchLower) ||
          student.phoneNumber?.toString().includes(searchLower) ||
          student.attendancePercentage?.toString().includes(searchLower)
        );
      });
      setFilteredStudents(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, students]);

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  // Check if teacher is logged in
  useEffect(() => {
    // In a real app, you would check localStorage or make an API call
    // to verify if a teacher is logged in
    const loggedInTeacher = localStorage.getItem('teacher');
    if (loggedInTeacher) {
      setTeacher(JSON.parse(loggedInTeacher));
    }
    
    fetchStudents();
  }, 
  []);

    const handleBackToDashboard = () => {
    navigate('/dashboard');
  };
  const handleAddStudent = () => {
    navigate('/student-details');
  };

  const handleAddTeacher = () => {
    navigate('/signup');
  };
   const handleListTeacher = () => {
    navigate('/teacherlist');
  };

  const handleEditClick = (student) => {
    setStudentToEdit(student);
    setEditFormData({
      name: student.name || '',
      rollNo: student.rollNo || '',
      email: student.email || '',
      phoneNumber: student.phoneNumber || '',
      standard: student.standard || '',
      section: student.section || '',
      attendancePercentage: student.attendancePercentage || 0
    });
    setShowEditModal(true);
  };

  const handleViewStudent = (student) => {
    alert(`Viewing: ${student.name}\nEmail: ${student.email}\nRoll No: ${student.rollNo}\nPhone: ${student.phoneNumber}\nAttendance: ${student.attendancePercentage || 0}%`);
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (studentToDelete) {
      deleteStudent(studentToDelete.id);
    }
  };

  const handleConfirmEdit = () => {
    if (studentToEdit) {
      editStudent(studentToEdit.id, editFormData);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setStudentToDelete(null);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setStudentToEdit(null);
    setEditFormData({});
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: name === 'attendancePercentage' ? parseFloat(value) || 0 : value
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('teacher');
    setTeacher(null);
    navigate('/');
  };

  // Function to get attendance badge color based on percentage
  const getAttendanceBadgeColor = (percentage) => {
    if (percentage >= 75) return 'success';
    if (percentage >= 50) return 'warning';
    return 'danger';
  };

  return (
    <Container fluid className="py-4">
      {/* Header with Teacher Welcome Message */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Student_Table</h2>
              {teacher && (
                <p className="text-muted mb-0">
                  Welcome, <strong>{teacher.name}</strong>!
                </p>
              )}
            </div>
            <div className="d-flex gap-2">
              {teacher && (
                <Button variant="outline-secondary" onClick={handleLogout}>
                  Logout
                </Button>
                
                              
                             
              )}
              <Button variant="outline-secondary" onClick={handleBackToDashboard}>
                                Back to Dashboard
                              </Button>
              {/* <Button variant="secondary" onClick={handleListTeacher}>
                List Teacher
              </Button>
              <Button variant="secondary" onClick={handleAddTeacher}>
                Add Teacher
              </Button>
              <Button variant="primary" onClick={handleAddStudent}>
                Add New Student
              </Button> */}
            </div>
          </div>
        </Col>
      </Row>

      {/* Error Alert */}
      {error && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      {/* Students Table */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Student Records</h5>
            </Card.Header>
            <Card.Body className="p-0">
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2">Loading student data...</p>
                </div>
              ) : filteredStudents.length === 0 ? (
                <div className="text-center py-5">
                  {students.length === 0 ? (
                    <>
                      <h5>No Students Found</h5>
                      <p className="mb-4">Add your first student to get started.</p>
                      <Button variant="primary" onClick={handleAddStudent}>
                        Add First Student
                      </Button>
                    </>
                  ) : (
                    <>
                      <h5>No Matching Students</h5>
                      <p className="mb-4">No students found for your search.</p>
                      <Button variant="outline-secondary" onClick={() => setSearchTerm('')}>
                        Clear Search
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover>
                    <thead>
                      <tr>
                        <th>Roll No</th>
                        <th>Student Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Attendance</th>
                        <th>Standard</th>
                        <th>Section</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStudents.map((student) => (
                        <tr key={student.id}>
                          <td>
                            <Badge bg="secondary">
                              {student.rollNo || 'N/A'}
                            </Badge>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="bg-primary rounded-circle text-white d-flex align-items-center justify-content-center me-2"
                                   style={{ width: '35px', height: '35px' }}>
                                {student.name ? student.name.charAt(0).toUpperCase() : 'U'}
                              </div>
                              <div>
                                <div className="fw-bold">
                                  {student.name || 'N/A'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {student.email || 'N/A'}
                          </td>
                          <td>
                            {student.phoneNumber || 'N/A'}
                          </td>
                          <td>
                            <Badge bg={getAttendanceBadgeColor(student.attendancePercentage || 0)}>
                              {(student.attendancePercentage || 0).toFixed(0)}%
                            </Badge>
                          </td>
                          <td>
                            <Badge bg="info">
                              {student.standard || 'N/A'}
                            </Badge>
                          </td>
                          <td>
                            <Badge bg="secondary">
                              {student.section || 'N/A'}
                            </Badge>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleViewStudent(student)}
                              >
                                View
                              </Button>
                              <Button
                                variant="outline-warning"
                                size="sm"
                                onClick={() => handleEditClick(student)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeleteClick(student)}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
            
            {/* Pagination */}
            {filteredStudents.length > itemsPerPage && (
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <div className="text-muted">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredStudents.length)} of {filteredStudents.length} students
                </div>
                <Pagination className="mb-0">
                  <Pagination.Prev 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Pagination.Prev>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    
                    return (
                      <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === currentPage}
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </Pagination.Item>
                    );
                  })}
                  
                  <Pagination.Next 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Pagination.Next>
                </Pagination>
              </Card.Footer>
            )}
          </Card>
        </Col>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete student <strong>{studentToDelete?.name}</strong>?</p>
          <div className="alert alert-warning">
            <small>This action cannot be undone.</small>
          </div>
          <div>
            <strong>Student Details:</strong>
            <ul>
              <li>Roll No: {studentToDelete?.rollNo}</li>
              <li>Email: {studentToDelete?.email}</li>
              <li>Standard: {studentToDelete?.standard}</li>
              <li>Section: {studentToDelete?.section}</li>
              <li>Attendance: {studentToDelete?.attendancePercentage || 0}%</li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete Student
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Student Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {studentToEdit && (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={editFormData.name || ''}
                      onChange={handleEditInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Roll Number *</Form.Label>
                    <Form.Control
                      type="text"
                      name="rollNo"
                      value={editFormData.rollNo || ''}
                      onChange={handleEditInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={editFormData.email || ''}
                      onChange={handleEditInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number *</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phoneNumber"
                      value={editFormData.phoneNumber || ''}
                      onChange={handleEditInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Attendance Percentage *</Form.Label>
                    <Form.Control
                      type="number"
                      name="attendancePercentage"
                      min="0"
                      max="100"
                      step="0.1"
                      value={editFormData.attendancePercentage || 0}
                      onChange={handleEditInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Standard *</Form.Label>
                    <Form.Control
                      type="text"
                      name="standard"
                      value={editFormData.standard || ''}
                      onChange={handleEditInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Section *</Form.Label>
                    <Form.Select
                      name="section"
                      value={editFormData.section || ''}
                      onChange={handleEditInputChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleConfirmEdit}
            disabled={editLoading}
          >
            {editLoading ? 'Updating...' : 'Update Student'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Student_Table;