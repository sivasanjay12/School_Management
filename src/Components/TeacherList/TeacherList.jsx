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
  Badge,
  Pagination
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [teacherToEdit, setTeacherToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  // API endpoint for teachers
  const API_BASE_URL = 'http://localhost:8080/api/student';

  // Fetch teachers from API
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch teachers: ${response.status} ${response.statusText}`);
      }

      const teachersData = await response.json();
      setTeachers(teachersData);
      setFilteredTeachers(teachersData);
    } catch (err) {
      console.error('Error fetching teachers:', err);
      setError('Failed to load teacher data. Please check server connection or try again later.');
      setTeachers([]);
      setFilteredTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  // Delete teacher function - API CALL
  const deleteTeacher = async (teacherId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${teacherId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete teacher');
      }

      // Remove teacher from local state
      setTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
      setFilteredTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
      setShowDeleteModal(false);
      setTeacherToDelete(null);
      
      alert('Teacher deleted successfully!');
    } catch (err) {
      console.error('Error deleting teacher:', err);
      setError('Failed to delete teacher. Please try again.');
    }
  };

  // Edit teacher function - API CALL
  const editTeacher = async (teacherId, updatedData) => {
    try {
      setEditLoading(true);
      const response = await fetch(`${API_BASE_URL}/${teacherId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update teacher');
      }

      const updatedTeacher = await response.json();
      
      // Update teacher in local state
      setTeachers(prev => prev.map(teacher => 
        teacher.id === teacherId ? updatedTeacher.teacher || updatedTeacher : teacher
      ));
      setFilteredTeachers(prev => prev.map(teacher => 
        teacher.id === teacherId ? updatedTeacher.teacher || updatedTeacher : teacher
      ));
      
      setShowEditModal(false);
      setTeacherToEdit(null);
      setEditFormData({});
      
      alert('Teacher updated successfully!');
    } catch (err) {
      console.error('Error updating teacher:', err);
      setError('Failed to update teacher. Please try again.');
    } finally {
      setEditLoading(false);
    }
  };

  // Filter teachers based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTeachers(teachers);
    } else {
      const filtered = teachers.filter(teacher => {
        const searchLower = searchTerm.toLowerCase();
        return (
          teacher.name?.toLowerCase().includes(searchLower) ||
          teacher.email?.toLowerCase().includes(searchLower) ||
          teacher.username?.toLowerCase().includes(searchLower) ||
          teacher.subject?.toLowerCase().includes(searchLower) ||
          teacher.phone?.toString().includes(searchLower)
        );
      });
      setFilteredTeachers(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, teachers]);

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleAddStudent = () => {
    navigate('/student-details');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleEditClick = (teacher) => {
    setTeacherToEdit(teacher);
    setEditFormData({
      name: teacher.name || '',
      email: teacher.email || '',
      username: teacher.username || '',
      subject: teacher.subject || '',
      phone: teacher.phone || ''
    });
    setShowEditModal(true);
  };

  const handleViewTeacher = (teacher) => {
    alert(`Viewing: ${teacher.name}\nEmail: ${teacher.email}\nUsername: ${teacher.username}\nSubject: ${teacher.subject}\nPhone: ${teacher.phone}`);
  };

  const handleDeleteClick = (teacher) => {
    setTeacherToDelete(teacher);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (teacherToDelete) {
      deleteTeacher(teacherToDelete.id);
    }
  };

  const handleConfirmEdit = () => {
    if (teacherToEdit) {
      editTeacher(teacherToEdit.id, editFormData);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setTeacherToDelete(null);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setTeacherToEdit(null);
    setEditFormData({});
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to get subject badge color
  const getSubjectBadgeColor = (subject) => {
    const colors = {
      'Mathematics': 'primary',
      'Physics': 'info',
      'Chemistry': 'warning',
      'Biology': 'success',
      'History': 'secondary',
      'English': 'dark',
      'Computer Science': 'danger',
      'Art': 'light',
      'Physical Education': 'primary',
      'Music': 'info'
    };
    return colors[subject] || 'secondary';
  };

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Teacher Management</h2>
              <p className="text-muted mb-0">Manage all teaching staff</p>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" onClick={handleBackToDashboard}>
                Back to Dashboard
              </Button>
              <Button variant="primary" onClick={handleAddStudent}>
                Add New Student
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Search Bar - Only show when there are teachers */}
      {teachers.length > 0 && (
        <Row className="mb-3">
          <Col>
            <Card>
              <Card.Body>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Search teachers by name, email, username, or subject..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  {searchTerm && (
                    <div className="mt-2">
                      <small className="text-muted">
                        Found {filteredTeachers.length} teacher(s) matching "{searchTerm}"
                        <Button 
                          variant="link" 
                          size="sm" 
                          onClick={() => setSearchTerm('')}
                          className="ms-2 p-0"
                        >
                          Clear
                        </Button>
                      </small>
                    </div>
                  )}
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Error Alert */}
      {error && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              <Alert.Heading>Error Loading Data</Alert.Heading>
              <p>{error}</p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button variant="outline-danger" onClick={fetchTeachers}>
                  Retry
                </Button>
              </div>
            </Alert>
          </Col>
        </Row>
      )}

      {/* Teachers Table */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Teacher Records</h5>
                {!loading && teachers.length > 0 && (
                  <Badge bg="primary" pill>
                    {filteredTeachers.length} Teachers
                  </Badge>
                )}
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2">Loading teacher data...</p>
                </div>
              ) : error ? (
                <div className="text-center py-5">
                  <Alert variant="warning" className="text-center border-0 bg-transparent">
                    <div className="mb-3">
                      <i className="bi bi-exclamation-triangle-fill text-warning" style={{ fontSize: '3rem' }}></i>
                    </div>
                    <h5>Technical Issues</h5>
                    <p className="mb-3">Unable to fetch teacher data from the server.</p>
                    <div className="d-flex justify-content-center gap-2">
                      <Button variant="outline-primary" onClick={fetchTeachers}>
                        Retry
                      </Button>
                      <Button variant="outline-secondary" onClick={handleBackToDashboard}>
                        Go Back
                      </Button>
                    </div>
                  </Alert>
                </div>
              ) : teachers.length === 0 ? (
                <div className="text-center py-5">
                  <div className="mb-3">
                    <i className="bi bi-people text-muted" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5>No Teachers Found</h5>
                  <p className="mb-4">No teacher records available in the system.</p>
                  <Button variant="primary" onClick={handleAddTeacher}>
                    Add First Teacher
                  </Button>
                </div>
              ) : filteredTeachers.length === 0 ? (
                <div className="text-center py-5">
                  <h5>No Matching Teachers</h5>
                  <p className="mb-4">No teachers found for your search.</p>
                  <Button variant="outline-secondary" onClick={() => setSearchTerm('')}>
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Teacher Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        {/* <th>Subject</th>
                        <th>Phone</th> */}
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTeachers.map((teacher, index) => (
                        <tr key={teacher.id}>
                          <td>{indexOfFirstItem + index + 1}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="bg-primary rounded-circle text-white d-flex align-items-center justify-content-center me-2"
                                   style={{ width: '35px', height: '35px' }}>
                                {teacher.name ? teacher.name.charAt(0).toUpperCase() : 'T'}
                              </div>
                              <div>
                                <div className="fw-bold">
                                  {teacher.name || 'N/A'}
                                </div>
                                <small className="text-muted">ID: {teacher.id}</small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <a href={`mailto:${teacher.email}`} className="text-decoration-none">
                              {teacher.email || 'N/A'}
                            </a>
                          </td>
                          <td>
                            <Badge bg="dark" class="lg">
                              @{teacher.username || 'N/A'}
                            </Badge>
                          </td>
                          {/* <td>
                            <Badge bg={getSubjectBadgeColor(teacher.subject)}>
                              {teacher.subject || 'N/A'}
                            </Badge>
                          </td>
                          <td>
                            {teacher.phone || 'N/A'}
                          </td> */}
                          <td>
                            <div className="d-flex gap-2">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleViewTeacher(teacher)}
                              >
                                View
                              </Button>
                              <Button
                                variant="outline-warning"
                                size="sm"
                                onClick={() => handleEditClick(teacher)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeleteClick(teacher)}
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
            
            {/* Pagination - Only show when there are enough teachers */}
            {!loading && !error && filteredTeachers.length > itemsPerPage && (
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <div className="text-muted">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTeachers.length)} of {filteredTeachers.length} teachers
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
          <p>Are you sure you want to delete teacher <strong>{teacherToDelete?.name}</strong>?</p>
          <div className="alert alert-warning">
            <small>This action cannot be undone. All associated data will be removed.</small>
          </div>
          <div>
            <strong>Teacher Details:</strong>
            <ul>
              <li>Email: {teacherToDelete?.email}</li>
              <li>Username: @{teacherToDelete?.username}</li>
              <li>Subject: {teacherToDelete?.subject}</li>
              <li>Phone: {teacherToDelete?.phone}</li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete Teacher
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Teacher Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {teacherToEdit && (
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
                    <Form.Label>Username *</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={editFormData.username || ''}
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
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={editFormData.phone || ''}
                      onChange={handleEditInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Subject *</Form.Label>
                    <Form.Select
                      name="subject"
                      value={editFormData.subject || ''}
                      onChange={handleEditInputChange}
                      required
                    >
                      <option value="">Select Subject</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Biology">Biology</option>
                      <option value="History">History</option>
                      <option value="English">English</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Art">Art</option>
                      <option value="Physical Education">Physical Education</option>
                      <option value="Music">Music</option>
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
            {editLoading ? 'Updating...' : 'Update Teacher'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TeacherList;