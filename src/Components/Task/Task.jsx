import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  Badge,
  Alert,
  ListGroup,
  InputGroup,
  FormControl,
  ProgressBar
} from 'react-bootstrap';

// Helper functions to replace date-fns
const formatDate = (date) => {
  const d = new Date(date);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  return {
    full: `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`,
    day: d.getDate().toString().padStart(2, '0'),
    month: months[d.getMonth()],
    year: d.getFullYear(),
    weekday: days[d.getDay()],
    shortMonth: months[d.getMonth()].substring(0, 3),
    iso: d.toISOString().split('T')[0],
    time: `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  };
};

const addDaysToDate = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

const isTomorrow = (date) => {
  const tomorrow = addDaysToDate(new Date(), 1);
  const checkDate = new Date(date);
  return (
    checkDate.getDate() === tomorrow.getDate() &&
    checkDate.getMonth() === tomorrow.getMonth() &&
    checkDate.getFullYear() === tomorrow.getFullYear()
  );
};

const parseISO = (dateString) => {
  return new Date(dateString);
};

// API endpoints
const API_BASE = 'https://jsonplaceholder.typicode.com'; // Mock API - replace with your actual API
const TASKS_API = `${API_BASE}/tasks`;
const SUBJECTS_API = `${API_BASE}/subjects`;
const REMINDERS_API = `${API_BASE}/reminders`;

// Initial subjects
const initialSubjects = [
  { id: 1, name: 'Mathematics', color: '#4f46e5', icon: '📐' },
  { id: 2, name: 'Science', color: '#059669', icon: '🔬' },
  { id: 3, name: 'English', color: '#dc2626', icon: '📚' },
  { id: 4, name: 'History', color: '#d97706', icon: '🏛️' },
  { id: 5, name: 'Computer Science', color: '#2563eb', icon: '💻' },
  { id: 6, name: 'Physical Education', color: '#7c3aed', icon: '⚽' }
];

// Initial reminders for each subject
const initialReminders = [
  { subjectId: 1, message: 'Complete algebra exercises from Chapter 5' },
  { subjectId: 2, message: 'Prepare for chemistry lab experiment tomorrow' },
  { subjectId: 3, message: 'Write essay on climate change (500 words)' },
  { subjectId: 4, message: 'Study French Revolution timeline' },
  { subjectId: 5, message: 'Complete coding assignment - React Todo App' },
  { subjectId: 6, message: 'Practice basketball drills for 30 minutes' }
];

const TaskDiary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState(initialSubjects);
  const [reminders, setReminders] = useState(initialReminders);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    subjectId: '',
    dueDate: formatDate(new Date()).iso,
    priority: 'medium',
    status: 'pending'
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [teacherNotes, setTeacherNotes] = useState('');
  const [viewMode, setViewMode] = useState('daily'); // daily, weekly, monthly

  // Load initial data
  useEffect(() => {
    fetchTasks();
    fetchReminders();
  }, []);

  // Filter tasks for selected date
  const filteredTasks = tasks.filter(task => {
    const taskDate = parseISO(task.dueDate);
    const selectedDateObj = new Date(selectedDate);
    return (
      taskDate.getDate() === selectedDateObj.getDate() &&
      taskDate.getMonth() === selectedDateObj.getMonth() &&
      taskDate.getFullYear() === selectedDateObj.getFullYear()
    );
  });

  const fetchTasks = async () => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API
      const response = await fetch(TASKS_API);
      const data = await response.json();
      // For demo, use mock data
      const mockTasks = [
        {
          id: 1,
          title: 'Algebra Homework',
          description: 'Complete exercises 1-20 from Chapter 5',
          subjectId: 1,
          dueDate: formatDate(new Date()).iso,
          priority: 'high',
          status: 'pending',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Science Project',
          description: 'Prepare lab report on chemical reactions',
          subjectId: 2,
          dueDate: formatDate(addDaysToDate(new Date(), 1)).iso,
          priority: 'medium',
          status: 'in-progress',
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          title: 'English Essay',
          description: 'Write 500-word essay on environmental issues',
          subjectId: 3,
          dueDate: formatDate(new Date()).iso,
          priority: 'high',
          status: 'completed',
          createdAt: new Date().toISOString()
        }
      ];
      setTasks(mockTasks);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReminders = async () => {
    try {
      // Mock API call - replace with actual API
      const response = await fetch(REMINDERS_API);
      const data = await response.json();
      // For demo, use initial reminders
      setReminders(initialReminders);
    } catch (err) {
      console.error('Failed to fetch reminders:', err);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const taskToAdd = {
        ...newTask,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        assignedBy: 'Teacher',
        assignedDate: formatDate(new Date()).iso
      };

      // Mock API call - replace with actual API
      const response = await fetch(TASKS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskToAdd)
      });

      if (!response.ok) throw new Error('Failed to add task');

      setTasks([...tasks, taskToAdd]);
      setSuccess('Task added successfully!');
      setNewTask({
        title: '',
        description: '',
        subjectId: '',
        dueDate: formatDate(new Date()).iso,
        priority: 'medium',
        status: 'pending'
      });
      setShowAddModal(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);

      // Mock API call - replace with actual API
      await fetch(`${TASKS_API}/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      setTasks(tasks.filter(task => task.id !== taskId));
      
      // Mock API call - replace with actual API
      await fetch(`${TASKS_API}/${taskId}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const handleAddTeacherNote = async () => {
    if (!teacherNotes.trim()) return;

    try {
      const noteToAdd = {
        id: Date.now(),
        message: teacherNotes,
        date: formatDate(new Date()).iso,
        type: 'teacher-note'
      };

      // Mock API call - replace with actual API
      await fetch(REMINDERS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteToAdd)
      });

      setReminders([...reminders, { subjectId: 0, message: teacherNotes }]);
      setTeacherNotes('');
      setSuccess('Teacher note added!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to add note');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'pending': return 'danger';
      default: return 'secondary';
    }
  };

  const getSubjectById = (subjectId) => {
    return subjects.find(subject => subject.id === subjectId) || {};
  };

  const getReminderForSubject = (subjectId) => {
    return reminders.find(reminder => reminder.subjectId === subjectId)?.message || '';
  };

  const calculateCompletionRate = () => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  const getTodaysReminders = () => {
    const todayStr = formatDate(new Date()).iso;
    const todayTasks = tasks.filter(task => task.dueDate === todayStr);
    
    return todayTasks.map(task => {
      const subject = getSubjectById(task.subjectId);
      return `📌 ${subject.name}: ${task.title}`;
    });
  };

  const renderRuledLines = (count) => {
    return Array.from({ length: count }).map((_, index) => (
      <div 
        key={index}
        style={{
          borderBottom: '1px solid #e5e7eb',
          height: '24px',
          margin: '2px 0'
        }}
      />
    ));
  };

  return (
    <Container fluid className="py-4" style={{ 
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      minHeight: '100vh'
    }}>
      <Row>
        <Col lg={12}>
          {/* Header */}
          <Card className="shadow-sm mb-4 border-0" style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
            borderRadius: '15px'
          }}>
            <Card.Body className="py-4">
              <Row className="align-items-center">
                <Col md={6}>
                  <h1 className="fw-bold mb-3" style={{ 
                    color: '#1f2937',
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                  }}>
                    📓 Student Task Diary
                  </h1>
                  <div className="d-flex align-items-center gap-3">
                    <Badge bg="info" className="px-3 py-2">
                      <i className="bi bi-calendar-check me-2"></i>
                      {formatDate(selectedDate).full}
                    </Badge>
                    <Badge bg="success" className="px-3 py-2">
                      <i className="bi bi-check-circle me-2"></i>
                      {calculateCompletionRate()}% Completed
                    </Badge>
                  </div>
                </Col>
                <Col md={6} className="text-end">
                  <div className="d-flex justify-content-end gap-2">
                    <Button 
                      variant="outline-primary" 
                      onClick={() => setSelectedDate(new Date())}
                      className="rounded-pill px-4"
                    >
                      <i className="bi bi-calendar-day me-2"></i>
                      Today
                    </Button>
                    <Button 
                      variant="primary" 
                      onClick={() => setShowAddModal(true)}
                      className="rounded-pill px-4"
                    >
                      <i className="bi bi-plus-circle me-2"></i>
                      Add New Task
                    </Button>
                    <Button 
                      variant="success" 
                      onClick={() => setShowSubjectModal(true)}
                      className="rounded-pill px-4"
                    >
                      <i className="bi bi-journal-text me-2"></i>
                      Teacher Notes
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Left Column - Date Navigation & Subjects */}
        <Col lg={3}>
          {/* Date Navigation */}
          <Card className="shadow-sm mb-4 border-0" style={{
            background: '#ffffff',
            borderRadius: '15px',
            border: '1px solid #e5e7eb'
          }}>
            <Card.Body>
              <h6 className="fw-bold mb-3" style={{ color: '#4f46e5' }}>
                <i className="bi bi-calendar3 me-2"></i>
                Date Navigation
              </h6>
              <div className="text-center mb-4">
                <div className="display-6 fw-bold mb-2" style={{ color: '#1f2937' }}>
                  {formatDate(selectedDate).day}
                </div>
                <div className="text-muted">{formatDate(selectedDate).month} {formatDate(selectedDate).year}</div>
                <div className="small text-muted">{formatDate(selectedDate).weekday}</div>
              </div>
              
              <div className="d-flex justify-content-between mb-3">
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={() => setSelectedDate(addDaysToDate(selectedDate, -1))}
                  className="rounded-circle"
                >
                  <i className="bi bi-chevron-left"></i>
                </Button>
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={() => setSelectedDate(addDaysToDate(selectedDate, 1))}
                  className="rounded-circle"
                >
                  <i className="bi bi-chevron-right"></i>
                </Button>
              </div>

              {/* Today's Reminders */}
              <div className="mt-4">
                <h6 className="fw-bold mb-3" style={{ color: '#dc2626' }}>
                  <i className="bi bi-bell me-2"></i>
                  Today's Reminders
                </h6>
                <div style={{
                  background: '#fef3c7',
                  borderRadius: '10px',
                  padding: '15px',
                  borderLeft: '4px solid #f59e0b'
                }}>
                  {getTodaysReminders().map((reminder, index) => (
                    <div key={index} className="mb-2">
                      <small>{reminder}</small>
                    </div>
                  ))}
                  {getTodaysReminders().length === 0 && (
                    <small className="text-muted">No reminders for today</small>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Subjects List */}
          <Card className="shadow-sm border-0" style={{
            background: '#ffffff',
            borderRadius: '15px',
            border: '1px solid #e5e7eb'
          }}>
            <Card.Body>
              <h6 className="fw-bold mb-3" style={{ color: '#059669' }}>
                <i className="bi bi-book me-2"></i>
                Subjects ({subjects.length})
              </h6>
              <ListGroup variant="flush">
                {subjects.map(subject => (
                  <ListGroup.Item 
                    key={subject.id}
                    className="border-0 py-3"
                    style={{ 
                      borderLeft: `4px solid ${subject.color}`,
                      marginBottom: '8px',
                      background: `${subject.color}10`
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          background: subject.color,
                          color: 'white',
                          fontSize: '18px'
                        }}
                      >
                        {subject.icon}
                      </div>
                      <div>
                        <div className="fw-medium">{subject.name}</div>
                        <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                          {getReminderForSubject(subject.id)}
                        </small>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Main Content - Ruled Diary */}
        <Col lg={6}>
          <Card className="shadow-sm border-0 h-100" style={{
            background: '#ffffff',
            borderRadius: '15px',
            backgroundImage: `repeating-linear-gradient(
              white 0px,
              white 24px,
              #e5e7eb 25px
            )`,
            padding: '40px 30px',
            minHeight: '600px'
          }}>
            <Card.Body>
              {/* Diary Header */}
              <div className="text-center mb-4" style={{ borderBottom: '2px solid #4f46e5', paddingBottom: '15px' }}>
                <h3 className="fw-bold" style={{ color: '#1f2937' }}>
                  Daily Tasks Diary
                </h3>
                <div className="text-muted">
                  {formatDate(selectedDate).full}
                  {isToday(selectedDate) && (
                    <Badge bg="success" className="ms-2">Today</Badge>
                  )}
                  {isTomorrow(selectedDate) && (
                    <Badge bg="warning" className="ms-2">Tomorrow</Badge>
                  )}
                </div>
              </div>

              {/* Tasks List */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold" style={{ color: '#4f46e5' }}>
                    <i className="bi bi-list-task me-2"></i>
                    Tasks for Today
                  </h5>
                  <Badge bg="info" className="px-3 py-2">
                    {filteredTasks.length} tasks
                  </Badge>
                </div>

                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : filteredTasks.length === 0 ? (
                  <div className="text-center py-5" style={{ color: '#9ca3af' }}>
                    <i className="bi bi-journal-x display-4 mb-3"></i>
                    <p className="lead">No tasks for this date</p>
                    <Button 
                      variant="outline-primary" 
                      onClick={() => setShowAddModal(true)}
                      className="rounded-pill"
                    >
                      Add Your First Task
                    </Button>
                  </div>
                ) : (
                  <div>
                    {filteredTasks.map(task => {
                      const subject = getSubjectById(task.subjectId);
                      const taskDate = parseISO(task.dueDate);
                      return (
                        <div 
                          key={task.id}
                          className="mb-4 p-3 rounded"
                          style={{
                            background: 'white',
                            border: `2px solid ${subject.color || '#e5e7eb'}`,
                            borderRadius: '10px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div className="d-flex align-items-center">
                              <div 
                                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                style={{ 
                                  width: '36px', 
                                  height: '36px', 
                                  background: subject.color,
                                  color: 'white',
                                  fontSize: '14px'
                                }}
                              >
                                {subject.icon}
                              </div>
                              <div>
                                <h6 className="fw-bold mb-0">{task.title}</h6>
                                <small className="text-muted">{subject.name}</small>
                              </div>
                            </div>
                            <div className="d-flex gap-2">
                              <Badge bg={getPriorityColor(task.priority)} className="px-3">
                                {task.priority}
                              </Badge>
                              <Badge bg={getStatusColor(task.status)} className="px-3">
                                {task.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="mb-3" style={{ 
                            paddingLeft: '50px',
                            borderLeft: '3px solid #e5e7eb'
                          }}>
                            <p className="mb-2">{task.description}</p>
                            <small className="text-muted">
                              <i className="bi bi-clock me-1"></i>
                              Due: {formatDate(taskDate).month} {taskDate.getDate()}, {taskDate.getFullYear()}
                            </small>
                          </div>

                          <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                              <Button
                                variant={task.status === 'pending' ? 'warning' : 'outline-warning'}
                                size="sm"
                                onClick={() => handleUpdateTaskStatus(task.id, 'in-progress')}
                              >
                                <i className="bi bi-play me-1"></i> Start
                              </Button>
                              <Button
                                variant={task.status === 'completed' ? 'success' : 'outline-success'}
                                size="sm"
                                onClick={() => handleUpdateTaskStatus(task.id, 'completed')}
                              >
                                <i className="bi bi-check me-1"></i> Complete
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeleteTask(task.id)}
                              >
                                <i className="bi bi-trash me-1"></i> Delete
                              </Button>
                            </div>
                            <small className="text-muted">
                              Assigned by: {task.assignedBy || 'Teacher'}
                            </small>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Ruled Lines for Notes */}
              <div className="mt-5">
                <h6 className="fw-bold mb-3" style={{ color: '#d97706' }}>
                  <i className="bi bi-pencil me-2"></i>
                  Student Notes
                </h6>
                <div style={{ 
                  padding: '15px',
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  minHeight: '150px'
                }}>
                  {renderRuledLines(6)}
                  <div className="mt-2">
                    <Form.Control
                      as="textarea"
                      placeholder="Write your notes here..."
                      rows={3}
                      style={{ 
                        border: 'none',
                        background: 'transparent',
                        resize: 'none',
                        lineHeight: '24px'
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column - Progress & Quick Actions */}
        <Col lg={3}>
          {/* Progress Summary */}
          <Card className="shadow-sm mb-4 border-0" style={{
            background: '#ffffff',
            borderRadius: '15px',
            border: '1px solid #e5e7eb'
          }}>
            <Card.Body>
              <h6 className="fw-bold mb-3" style={{ color: '#7c3aed' }}>
                <i className="bi bi-graph-up me-2"></i>
                Progress Summary
              </h6>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Overall Completion</span>
                  <span>{calculateCompletionRate()}%</span>
                </div>
                <ProgressBar 
                  now={calculateCompletionRate()} 
                  variant="success" 
                  style={{ height: '10px' }}
                />
              </div>

              <div className="row text-center">
                <div className="col-4">
                  <div className="display-6 fw-bold text-danger">
                    {tasks.filter(t => t.status === 'pending').length}
                  </div>
                  <small className="text-muted">Pending</small>
                </div>
                <div className="col-4">
                  <div className="display-6 fw-bold text-warning">
                    {tasks.filter(t => t.status === 'in-progress').length}
                  </div>
                  <small className="text-muted">In Progress</small>
                </div>
                <div className="col-4">
                  <div className="display-6 fw-bold text-success">
                    {tasks.filter(t => t.status === 'completed').length}
                  </div>
                  <small className="text-muted">Completed</small>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Teacher's Corner */}
          <Card className="shadow-sm mb-4 border-0" style={{
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            borderRadius: '15px',
            border: '2px dashed #0ea5e9'
          }}>
            <Card.Body>
              <h6 className="fw-bold mb-3" style={{ color: '#0369a1' }}>
                <i className="bi bi-person-badge me-2"></i>
                Teacher's Corner
              </h6>
              
              <div className="mb-3">
                <InputGroup>
                  <FormControl
                    placeholder="Add reminder for students..."
                    value={teacherNotes}
                    onChange={(e) => setTeacherNotes(e.target.value)}
                  />
                  <Button 
                    variant="primary"
                    onClick={handleAddTeacherNote}
                  >
                    <i className="bi bi-send"></i>
                  </Button>
                </InputGroup>
              </div>

              <div className="mt-3">
                <h6 className="fw-bold mb-2" style={{ fontSize: '0.9rem' }}>
                  Recent Teacher Notes:
                </h6>
                {reminders.slice(0, 3).map((reminder, index) => (
                  <div 
                    key={index}
                    className="mb-2 p-2 rounded"
                    style={{
                      background: 'white',
                      borderLeft: '3px solid #0ea5e9'
                    }}
                  >
                    <small>{reminder.message}</small>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-sm border-0" style={{
            background: '#ffffff',
            borderRadius: '15px',
            border: '1px solid #e5e7eb'
          }}>
            <Card.Body>
              <h6 className="fw-bold mb-3" style={{ color: '#dc2626' }}>
                <i className="bi bi-lightning me-2"></i>
                Quick Actions
              </h6>
              
              <div className="d-grid gap-2">
                <Button variant="outline-primary" className="text-start">
                  <i className="bi bi-download me-2"></i>
                  Export Tasks
                </Button>
                <Button variant="outline-success" className="text-start">
                  <i className="bi bi-printer me-2"></i>
                  Print Diary
                </Button>
                <Button variant="outline-warning" className="text-start">
                  <i className="bi bi-clock-history me-2"></i>
                  View History
                </Button>
                <Button variant="outline-info" className="text-start">
                  <i className="bi bi-share me-2"></i>
                  Share with Parents
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Alerts */}
      {error && (
        <Alert 
          variant="danger" 
          className="position-fixed top-0 end-0 m-3" 
          style={{ zIndex: 9999 }}
          onClose={() => setError('')}
          dismissible
        >
          <Alert.Heading>Error!</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      {success && (
        <Alert 
          variant="success" 
          className="position-fixed top-0 end-0 m-3" 
          style={{ zIndex: 9999 }}
          onClose={() => setSuccess('')}
          dismissible
        >
          <Alert.Heading>Success!</Alert.Heading>
          <p>{success}</p>
        </Alert>
      )}

      {/* Add Task Modal */}
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold" style={{ color: '#4f46e5' }}>
            <i className="bi bi-plus-circle me-2"></i>
            Add New Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddTask}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Task Title *</Form.Label>
                  <Form.Control
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    placeholder="Enter task title"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Subject *</Form.Label>
                  <Form.Select
                    value={newTask.subjectId}
                    onChange={(e) => setNewTask({...newTask, subjectId: e.target.value})}
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.id}>
                        {subject.icon} {subject.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                placeholder="Enter task details..."
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Due Date *</Form.Label>
                  <Form.Control
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button 
                variant="secondary" 
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Task'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Subject/Teacher Modal */}
      <Modal
        show={showSubjectModal}
        onHide={() => setShowSubjectModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold" style={{ color: '#059669' }}>
            <i className="bi bi-journal-text me-2"></i>
            Subject Management & Teacher Notes
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="fw-bold mb-3">Daily Reminders for Subjects</h6>
          <ListGroup variant="flush" className="mb-4">
            {subjects.map(subject => (
              <ListGroup.Item key={subject.id} className="border-0 py-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ 
                        width: '36px', 
                        height: '36px', 
                        background: subject.color,
                        color: 'white',
                        fontSize: '16px'
                      }}
                    >
                      {subject.icon}
                    </div>
                    <div>
                      <div className="fw-medium">{subject.name}</div>
                      <small className="text-muted">
                        {getReminderForSubject(subject.id) || 'No reminder set'}
                      </small>
                    </div>
                  </div>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => {
                      const newReminder = prompt(`Enter reminder for ${subject.name}:`);
                      if (newReminder) {
                        setReminders(prev => {
                          const existing = prev.find(r => r.subjectId === subject.id);
                          if (existing) {
                            return prev.map(r => 
                              r.subjectId === subject.id 
                                ? { ...r, message: newReminder } 
                                : r
                            );
                          }
                          return [...prev, { subjectId: subject.id, message: newReminder }];
                        });
                      }
                    }}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className="mt-4">
            <h6 className="fw-bold mb-3">Add General Announcement</h6>
            <InputGroup>
              <FormControl
                as="textarea"
                placeholder="Enter announcement for all students..."
                rows={3}
                value={teacherNotes}
                onChange={(e) => setTeacherNotes(e.target.value)}
              />
            </InputGroup>
            <div className="d-flex justify-content-end mt-3">
              <Button 
                variant="success" 
                onClick={handleAddTeacherNote}
                disabled={!teacherNotes.trim()}
              >
                <i className="bi bi-megaphone me-2"></i>
                Post Announcement
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TaskDiary;











// TaskDiary.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   Button,
//   Modal,
//   Badge,
//   Alert,
//   ListGroup,
//   InputGroup,
//   FormControl,
//   ProgressBar,
//   Spinner
// } from 'react-bootstrap';

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

// // API Methods
// const activityApi = {
//   getDashboardData: (studentId) => apiRequest(`/student/${studentId}/dashboard`),
//   getTodaysTasks: (studentId) => apiRequest(`/student/${studentId}/tasks/today`),
//   getActiveReminders: (studentId) => apiRequest(`/student/${studentId}/reminders`),
//   createActivity: (activity) => apiRequest('', 'POST', activity),
//   updateTaskStatus: (id, status) => apiRequest(`/${id}/status`, 'PATCH', { status }),
//   deleteActivity: (id) => apiRequest(`/${id}`, 'DELETE'),
//   addTeacherNote: (id, note, priority) => apiRequest(`/${id}/teacher-note`, 'POST', { note, priority }),
// };

// // Helper functions
// const formatDate = (date) => {
//   const d = new Date(date);
//   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
//   return {
//     full: `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`,
//     day: d.getDate().toString().padStart(2, '0'),
//     month: months[d.getMonth()],
//     year: d.getFullYear(),
//     weekday: days[d.getDay()],
//     shortMonth: months[d.getMonth()].substring(0, 3),
//     iso: d.toISOString().split('T')[0],
//     time: `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
//   };
// };

// const addDaysToDate = (date, days) => {
//   const result = new Date(date);
//   result.setDate(result.getDate() + days);
//   return result;
// };

// const isToday = (date) => {
//   const today = new Date();
//   const checkDate = new Date(date);
//   return (
//     checkDate.getDate() === today.getDate() &&
//     checkDate.getMonth() === today.getMonth() &&
//     checkDate.getFullYear() === today.getFullYear()
//   );
// };

// const isTomorrow = (date) => {
//   const tomorrow = addDaysToDate(new Date(), 1);
//   const checkDate = new Date(date);
//   return (
//     checkDate.getDate() === tomorrow.getDate() &&
//     checkDate.getMonth() === tomorrow.getMonth() &&
//     checkDate.getFullYear() === tomorrow.getFullYear()
//   );
// };

// // Initial subjects
// const initialSubjects = [
//   { id: 1, name: 'Mathematics', color: '#4f46e5', icon: '📐' },
//   { id: 2, name: 'Science', color: '#059669', icon: '🔬' },
//   { id: 3, name: 'English', color: '#dc2626', icon: '📚' },
//   { id: 4, name: 'History', color: '#d97706', icon: '🏛️' },
//   { id: 5, name: 'Computer Science', color: '#2563eb', icon: '💻' },
//   { id: 6, name: 'Physical Education', color: '#7c3aed', icon: '⚽' }
// ];

// // Mock data for fallback
// const mockTasks = [
//   {
//     id: 1,
//     activityType: 'TASK',
//     title: 'Algebra Homework',
//     description: 'Complete exercises 1-20 from Chapter 5',
//     subject: 'Mathematics',
//     dueDate: new Date().toISOString().split('T')[0],
//     priority: 'HIGH',
//     status: 'PENDING',
//     points: 10,
//     assignedBy: 'Teacher',
//     assignedTo: 'student1',
//     studentId: 'student1',
//     studentName: 'John Doe',
//     completed: false,
//     earnedPoints: 0
//   },
//   {
//     id: 2,
//     activityType: 'TASK',
//     title: 'Science Project',
//     description: 'Prepare lab report on chemical reactions',
//     subject: 'Science',
//     dueDate: addDaysToDate(new Date(), 1).toISOString().split('T')[0],
//     priority: 'MEDIUM',
//     status: 'PENDING',
//     points: 15,
//     assignedBy: 'Teacher',
//     assignedTo: 'student1',
//     studentId: 'student1',
//     studentName: 'John Doe',
//     completed: false,
//     earnedPoints: 0
//   }
// ];

// const mockDashboardData = {
//   studentId: 'student1',
//   studentName: 'John Doe',
//   assessments: {
//     total: 5,
//     completed: 2,
//     pending: 3
//   },
//   tasks: {
//     total: 10,
//     completed: 3,
//     pending: 7
//   },
//   points: {
//     total: 150,
//     earned: 45
//   },
//   todaysTasks: mockTasks.filter(task => task.dueDate === new Date().toISOString().split('T')[0]),
//   pendingVideos: [],
//   activeReminders: []
// };

// const TaskDiary = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [tasks, setTasks] = useState([]);
//   const [subjects] = useState(initialSubjects);
//   const [newTask, setNewTask] = useState({
//     activityType: 'TASK',
//     title: '',
//     description: '',
//     subject: 'Mathematics',
//     dueDate: formatDate(new Date()).iso,
//     priority: 'MEDIUM',
//     status: 'PENDING',
//     points: 10,
//     assignedBy: 'Teacher',
//     assignedTo: 'student1',
//     studentId: 'student1',
//     studentName: 'John Doe',
//     createdBy: 'system'
//   });
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showSubjectModal, setShowSubjectModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [teacherNotes, setTeacherNotes] = useState('');
//   const [dashboardData, setDashboardData] = useState(null);
//   const [reminders, setReminders] = useState([]);

//   const studentId = 'student1'; // Get from auth context

//   // Load data from backend
//   useEffect(() => {
//     loadDashboardData();
//     loadTodaysTasks();
//     loadReminders();
//   }, []);

//   const loadDashboardData = async () => {
//     try {
//       setLoading(true);
//       let data;
//       try {
//         data = await activityApi.getDashboardData(studentId);
//       } catch (apiError) {
//         console.log('Using mock dashboard data due to API error');
//         data = mockDashboardData;
//       }
//       setDashboardData(data);
//     } catch (err) {
//       console.error('Error loading dashboard:', err);
//       setError('Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadTodaysTasks = async () => {
//     try {
//       let data;
//       try {
//         data = await activityApi.getTodaysTasks(studentId);
//       } catch (apiError) {
//         console.log('Using mock tasks data due to API error');
//         data = mockTasks.filter(task => task.dueDate === new Date().toISOString().split('T')[0]);
//       }
//       setTasks(data || []);
//     } catch (err) {
//       console.error('Error loading tasks:', err);
//       setError('Failed to load tasks');
//     }
//   };

//   const loadReminders = async () => {
//     try {
//       let data;
//       try {
//         data = await activityApi.getActiveReminders(studentId);
//       } catch (apiError) {
//         console.log('Using empty reminders due to API error');
//         data = [];
//       }
//       setReminders(data || []);
//     } catch (err) {
//       console.error('Error loading reminders:', err);
//     }
//   };

//   // Filter tasks for selected date
//   const filteredTasks = tasks.filter(task => {
//     const taskDate = new Date(task.dueDate);
//     const selectedDateObj = new Date(selectedDate);
//     return (
//       taskDate.getDate() === selectedDateObj.getDate() &&
//       taskDate.getMonth() === selectedDateObj.getMonth() &&
//       taskDate.getFullYear() === selectedDateObj.getFullYear()
//     );
//   });

//   const handleAddTask = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       const taskToAdd = {
//         ...newTask,
//         estimatedMinutes: 60
//       };

//       let created;
//       try {
//         created = await activityApi.createActivity(taskToAdd);
//       } catch (apiError) {
//         console.log('Creating task locally due to API error');
//         created = {
//           ...taskToAdd,
//           id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
//           createdAt: new Date().toISOString()
//         };
//       }
      
//       setTasks([...tasks, created]);
//       setSuccess('Task added successfully!');
      
//       // Reset form
//       setNewTask({
//         activityType: 'TASK',
//         title: '',
//         description: '',
//         subject: 'Mathematics',
//         dueDate: formatDate(new Date()).iso,
//         priority: 'MEDIUM',
//         status: 'PENDING',
//         points: 10,
//         assignedBy: 'Teacher',
//         assignedTo: 'student1',
//         studentId: 'student1',
//         studentName: 'John Doe',
//         createdBy: 'system'
//       });
//       setShowAddModal(false);

//       // Clear success message
//       setTimeout(() => setSuccess(''), 3000);
      
//       // Refresh dashboard
//       loadDashboardData();
//     } catch (err) {
//       setError(err.message || 'Failed to add task');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateTaskStatus = async (taskId, newStatus) => {
//     try {
//       let updated;
//       try {
//         updated = await activityApi.updateTaskStatus(taskId, newStatus);
//       } catch (apiError) {
//         console.log('Updating task status locally due to API error');
//         updated = tasks.find(task => task.id === taskId);
//         if (updated) {
//           updated.status = newStatus;
//           updated.completed = newStatus === 'COMPLETED';
//           if (newStatus === 'COMPLETED') {
//             updated.completionDate = new Date().toISOString();
//             updated.earnedPoints = updated.points;
//           }
//         }
//       }
      
//       setTasks(tasks.map(task =>
//         task.id === taskId ? updated : task
//       ));
      
//       // Refresh dashboard
//       loadDashboardData();
//     } catch (err) {
//       console.error('Failed to update task:', err);
//       setError('Failed to update task status');
//     }
//   };

//   const handleDeleteTask = async (taskId) => {
//     try {
//       try {
//         await activityApi.deleteActivity(taskId);
//       } catch (apiError) {
//         console.log('Deleting task locally due to API error');
//       }
      
//       setTasks(tasks.filter(task => task.id !== taskId));
//       setSuccess('Task deleted successfully!');
      
//       setTimeout(() => setSuccess(''), 3000);
//       loadDashboardData();
//     } catch (err) {
//       console.error('Failed to delete task:', err);
//       setError('Failed to delete task');
//     }
//   };

//   const handleAddTeacherNote = async () => {
//     if (!teacherNotes.trim()) return;

//     try {
//       // For simplicity, add note to first task
//       if (tasks.length > 0) {
//         const taskId = tasks[0].id;
//         try {
//           await activityApi.addTeacherNote(taskId, teacherNotes, 'MEDIUM');
//         } catch (apiError) {
//           console.log('Adding teacher note locally due to API error');
//         }
//         setSuccess('Teacher note added!');
//         setTeacherNotes('');
        
//         setTimeout(() => setSuccess(''), 3000);
//         loadReminders();
//       }
//     } catch (err) {
//       setError('Failed to add note');
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'HIGH': return 'danger';
//       case 'MEDIUM': return 'warning';
//       case 'LOW': return 'success';
//       default: return 'secondary';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'COMPLETED': return 'success';
//       case 'IN_PROGRESS': return 'warning';
//       case 'PENDING': return 'danger';
//       default: return 'secondary';
//     }
//   };

//   const getSubjectByName = (subjectName) => {
//     return subjects.find(subject => subject.name === subjectName) || subjects[0];
//   };

//   const calculateCompletionRate = () => {
//     if (!dashboardData || !dashboardData.tasks) return 0;
//     const taskData = dashboardData.tasks;
//     return taskData.total > 0 ? Math.round((taskData.completed / taskData.total) * 100) : 0;
//   };

//   const getTodaysReminders = () => {
//     const todayStr = formatDate(new Date()).iso;
//     const todayTasks = tasks.filter(task => task.dueDate === todayStr);
    
//     return todayTasks.map(task => {
//       const subject = getSubjectByName(task.subject);
//       return `📌 ${subject.name}: ${task.title}`;
//     });
//   };

//   const renderRuledLines = (count) => {
//     return Array.from({ length: count }).map((_, index) => (
//       <div 
//         key={index}
//         style={{
//           borderBottom: '1px solid #e5e7eb',
//           height: '24px',
//           margin: '2px 0'
//         }}
//       />
//     ));
//   };

//   if (loading && !dashboardData) {
//     return (
//       <Container fluid className="py-4">
//         <Row className="justify-content-center">
//           <Col md={6} className="text-center">
//             <Spinner animation="border" variant="primary" />
//             <p className="mt-3">Loading task diary...</p>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }

//   return (
//     <Container fluid className="py-4" style={{ 
//       background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
//       minHeight: '100vh'
//     }}>
//       {/* Rest of the TaskDiary component remains the same... */}
//       {/* The JSX structure is identical to what you had before, just with API integration */}
//     </Container>
//   );
// };

// export default TaskDiary;