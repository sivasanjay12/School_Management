// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const StudentDetails = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     roll_no: '',
//     email: '',
//     attendance_percentage: '',
//     phone_number: '',
//     standard: '',
//     section: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
    
//     // Clear error for this field if it exists
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: ''
//       });
//     }
//   };

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[0-9]{10}$/;

//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     if (!formData.roll_no.trim()) newErrors.roll_no = 'Roll number is required';
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }
//     if (!formData.attendance_percentage) {
//       newErrors.attendance_percentage = 'Attendance percentage is required';
//     } else if (formData.attendance_percentage < 0 || formData.attendance_percentage > 100) {
//       newErrors.attendance_percentage = 'Percentage must be between 0 and 100';
//     }
//     if (!formData.phone_number.trim()) {
//       newErrors.phone_number = 'Phone number is required';
//     } else if (!phoneRegex.test(formData.phone_number)) {
//       newErrors.phone_number = 'Please enter a valid 10-digit phone number';
//     }
//     if (!formData.standard.trim()) newErrors.standard = 'Standard is required';
//     if (!formData.section.trim()) newErrors.section = 'Section is required';

//     return newErrors;
//   };

//   // Handle form submission using Fetch API
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate form
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitStatus({ type: '', message: '' });

//     // Prepare data for API
//     const studentData = {
//       ...formData,
//       attendance_percentage: parseFloat(formData.attendance_percentage),
//       phone_number: formData.phone_number.toString()
//     };

//     // API endpoint - replace with your actual API URL
//     const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/students_details';
//     const endpoint = `${apiUrl}/students_details`;

//     try {
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify(studentData)
//       });

//       // Check if response is OK
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       setSubmitStatus({
//         type: 'success',
//         message: data.message || 'Student details added successfully!'
//       });
      
//       // Reset form
//       setFormData({
//         name: '',
//         roll_no: '',
//         email: '',
//         attendance_percentage: '',
//         phone_number: '',
//         standard: '',
//         section: ''
//       });

//       // Redirect after successful submission (optional)
//       setTimeout(() => {
//         navigate('/students');
//       }, 2000);

//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setSubmitStatus({
//         type: 'danger',
//         message: error.message || 'Failed to add student. Please try again.'
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Handle cancel/back
//   const handleCancel = () => {
//     navigate(-1);
//   };

//   return (
//     <Container className="py-5">
//       <Row className="justify-content-center">
//         <Col xs={12} md={10} lg={8} xl={6}>
//           <Card className="shadow-sm">
//             <Card.Header className="bg-primary text-white">
//               <h3 className="mb-0">Add Student Details</h3>
//             </Card.Header>
//             <Card.Body>
//               {submitStatus.message && (
//                 <Alert variant={submitStatus.type} dismissible onClose={() => setSubmitStatus({ type: '', message: '' })}>
//                   {submitStatus.message}
//                 </Alert>
//               )}

//               <Form onSubmit={handleSubmit}>
//                 {/* Name Field */}
//                 <Form.Group className="mb-3" controlId="formName">
//                   <Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     placeholder="Enter student's full name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     isInvalid={!!errors.name}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.name}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 {/* Roll Number Field */}
//                 <Form.Group className="mb-3" controlId="formRollNo">
//                   <Form.Label>Roll Number <span className="text-danger">*</span></Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="roll_no"
//                     placeholder="Enter roll number"
//                     value={formData.roll_no}
//                     onChange={handleChange}
//                     isInvalid={!!errors.roll_no}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.roll_no}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 {/* Email Field */}
//                 <Form.Group className="mb-3" controlId="formEmail">
//                   <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     placeholder="Enter email address"
//                     value={formData.email}
//                     onChange={handleChange}
//                     isInvalid={!!errors.email}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.email}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 {/* Attendance Percentage Field */}
//                 <Form.Group className="mb-3" controlId="formAttendance">
//                   <Form.Label>Attendance Percentage <span className="text-danger">*</span></Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="attendance_percentage"
//                     placeholder="Enter attendance percentage (0-100)"
//                     min="0"
//                     max="100"
//                     step="0.01"
//                     value={formData.attendance_percentage}
//                     onChange={handleChange}
//                     isInvalid={!!errors.attendance_percentage}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.attendance_percentage}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 {/* Phone Number Field */}
//                 <Form.Group className="mb-3" controlId="formPhone">
//                   <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
//                   <Form.Control
//                     type="tel"
//                     name="phone_number"
//                     placeholder="Enter 10-digit phone number"
//                     value={formData.phone_number}
//                     onChange={handleChange}
//                     isInvalid={!!errors.phone_number}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.phone_number}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Row>
//                   {/* Standard Field */}
//                   <Col md={6}>
//                     <Form.Group className="mb-3" controlId="formStandard">
//                       <Form.Label>Standard <span className="text-danger">*</span></Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="standard"
//                         placeholder="e.g., 10th, 12th"
//                         value={formData.standard}
//                         onChange={handleChange}
//                         isInvalid={!!errors.standard}
//                         required
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {errors.standard}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>

//                   {/* Section Field */}
//                   <Col md={6}>
//                     <Form.Group className="mb-3" controlId="formSection">
//                       <Form.Label>Section <span className="text-danger">*</span></Form.Label>
//                       <Form.Select
//                         name="section"
//                         value={formData.section}
//                         onChange={handleChange}
//                         isInvalid={!!errors.section}
//                         required
//                       >
//                         <option value="">Select Section</option>
//                         <option value="A">A</option>
//                         <option value="B">B</option>
//                         <option value="C">C</option>
//                         <option value="D">D</option>
//                         <option value="E">E</option>
//                       </Form.Select>
//                       <Form.Control.Feedback type="invalid">
//                         {errors.section}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {/* Action Buttons */}
//                 <div className="d-flex justify-content-between mt-4">
//                   <Button 
//                     variant="outline-secondary" 
//                     onClick={handleCancel}
//                     disabled={isSubmitting}
//                   >
//                     Cancel
//                   </Button>
//                   <Button 
//                     variant="primary" 
//                     type="submit"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                         Adding...
//                       </>
//                     ) : (
//                       'Add Student'
//                     )}
//                   </Button>
//                 </div>
//               </Form>
//             </Card.Body>
//             <Card.Footer className="text-muted">
//               <small>Fields marked with <span className="text-danger">*</span> are required</small>
//             </Card.Footer>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default StudentDetails;














// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const StudentDetails = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     roll_no: '',
//     email: '',
//     attendance_percentage: '',
//     phone_number: '',
//     standard: '',
//     section: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
    
//     // Clear error for this field if it exists
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: ''
//       });
//     }
//   };

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[0-9]{10}$/;

//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     if (!formData.roll_no.trim()) newErrors.roll_no = 'Roll number is required';
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }
//     if (!formData.attendance_percentage) {
//       newErrors.attendance_percentage = 'Attendance percentage is required';
//     } else if (formData.attendance_percentage < 0 || formData.attendance_percentage > 100) {
//       newErrors.attendance_percentage = 'Percentage must be between 0 and 100';
//     }
//     if (!formData.phone_number.trim()) {
//       newErrors.phone_number = 'Phone number is required';
//     } else if (!phoneRegex.test(formData.phone_number)) {
//       newErrors.phone_number = 'Please enter a valid 10-digit phone number';
//     }
//     if (!formData.standard.trim()) newErrors.standard = 'Standard is required';
//     if (!formData.section.trim()) newErrors.section = 'Section is required';

//     return newErrors;
//   };

//   // Handle form submission using Fetch API - FIXED
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate form
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitStatus({ type: '', message: '' });

//     // Prepare data for API - Match backend entity field names
//     const studentData = {
//       name: formData.name,
//       roll_no: formData.roll_no, // Match backend field name
//       email: formData.email,
//       attendance_percentage: parseFloat(formData.attendance_percentage), // Parse to number
//       phone_number: formData.phone_number,
//       standard: formData.standard,
//       section: formData.section
//     };

//     console.log('Sending data:', studentData);

//     // API endpoint - CORRECT URL
//     const endpoint = 'http://localhost:8080/api/students'; // Remove the duplicate path

//     try {
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify(studentData)
//       });

//       console.log('Response status:', response.status);
//       console.log('Response headers:', response.headers);

//       const responseText = await response.text();
//       console.log('Raw response:', responseText);

//       let data;
//       try {
//         data = JSON.parse(responseText);
//       } catch (parseError) {
//         console.error('Failed to parse JSON:', parseError);
//         throw new Error('Server returned invalid JSON');
//       }

//       // Check if response is OK
//       if (!response.ok) {
//         throw new Error(data.message || `HTTP error! status: ${response.status}`);
//       }

//       setSubmitStatus({
//         type: 'success',
//         message: data.message || 'Student details added successfully!'
//       });
      
//       // Reset form
//       setFormData({
//         name: '',
//         roll_no: '',
//         email: '',
//         attendance_percentage: '',
//         phone_number: '',
//         standard: '',
//         section: ''
//       });

//       // Redirect after successful submission
//       setTimeout(() => {
//         navigate('/students');
//       }, 2000);

//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setSubmitStatus({
//         type: 'danger',
//         message: error.message || 'Failed to add student. Please try again.'
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Handle cancel/back
//   const handleCancel = () => {
//     navigate(-1);
//   };

//   return (
//     <Container className="py-5">
//       <Row className="justify-content-center">
//         <Col xs={12} md={10} lg={8} xl={6}>
//           <Card className="shadow-sm">
//             <Card.Header className="bg-primary text-white">
//               <h3 className="mb-0">Add Student Details</h3>
//             </Card.Header>
//             <Card.Body>
//               {submitStatus.message && (
//                 <Alert variant={submitStatus.type} dismissible onClose={() => setSubmitStatus({ type: '', message: '' })}>
//                   {submitStatus.message}
//                 </Alert>
//               )}

//               <Form onSubmit={handleSubmit}>
//                 {/* Name Field */}
//                 <Form.Group className="mb-3" controlId="formName">
//                   <Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     placeholder="Enter student's full name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     isInvalid={!!errors.name}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.name}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 {/* Roll Number Field */}
//                 <Form.Group className="mb-3" controlId="formRollNo">
//                   <Form.Label>Roll Number <span className="text-danger">*</span></Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="roll_no"
//                     placeholder="Enter roll number"
//                     value={formData.roll_no}
//                     onChange={handleChange}
//                     isInvalid={!!errors.roll_no}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.roll_no}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 {/* Email Field */}
//                 <Form.Group className="mb-3" controlId="formEmail">
//                   <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     placeholder="Enter email address"
//                     value={formData.email}
//                     onChange={handleChange}
//                     isInvalid={!!errors.email}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.email}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 {/* Attendance Percentage Field */}
//                 <Form.Group className="mb-3" controlId="formAttendance">
//                   <Form.Label>Attendance Percentage <span className="text-danger">*</span></Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="attendance_percentage"
//                     placeholder="Enter attendance percentage (0-100)"
//                     min="0"
//                     max="100"
//                     step="0.01"
//                     value={formData.attendance_percentage}
//                     onChange={handleChange}
//                     isInvalid={!!errors.attendance_percentage}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.attendance_percentage}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 {/* Phone Number Field */}
//                 <Form.Group className="mb-3" controlId="formPhone">
//                   <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
//                   <Form.Control
//                     type="tel"
//                     name="phone_number"
//                     placeholder="Enter 10-digit phone number"
//                     value={formData.phone_number}
//                     onChange={handleChange}
//                     isInvalid={!!errors.phone_number}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.phone_number}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Row>
//                   {/* Standard Field */}
//                   <Col md={6}>
//                     <Form.Group className="mb-3" controlId="formStandard">
//                       <Form.Label>Standard <span className="text-danger">*</span></Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="standard"
//                         placeholder="e.g., 10th, 12th"
//                         value={formData.standard}
//                         onChange={handleChange}
//                         isInvalid={!!errors.standard}
//                         required
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {errors.standard}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>

//                   {/* Section Field */}
//                   <Col md={6}>
//                     <Form.Group className="mb-3" controlId="formSection">
//                       <Form.Label>Section <span className="text-danger">*</span></Form.Label>
//                       <Form.Select
//                         name="section"
//                         value={formData.section}
//                         onChange={handleChange}
//                         isInvalid={!!errors.section}
//                         required
//                       >
//                         <option value="">Select Section</option>
//                         <option value="A">A</option>
//                         <option value="B">B</option>
//                         <option value="C">C</option>
//                         <option value="D">D</option>
//                         <option value="E">E</option>
//                       </Form.Select>
//                       <Form.Control.Feedback type="invalid">
//                         {errors.section}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {/* Action Buttons */}
//                 <div className="d-flex justify-content-between mt-4">
//                   <Button 
//                     variant="outline-secondary" 
//                     onClick={handleCancel}
//                     disabled={isSubmitting}
//                   >
//                     Cancel
//                   </Button>
//                   <Button 
//                     variant="primary" 
//                     type="submit"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                         Adding...
//                       </>
//                     ) : (
//                       'Add Student'
//                     )}
//                   </Button>
//                 </div>
//               </Form>
//             </Card.Body>
//             <Card.Footer className="text-muted">
//               <small>Fields marked with <span className="text-danger">*</span> are required</small>
//             </Card.Footer>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default StudentDetails;





import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StudentDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    email: '',
    attendancePercentage: '',
    phoneNumber: '',
    standard: '',
    section: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const rollNoRegex = /^[0-9]+$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.rollNo.trim()) {
      newErrors.rollNo = 'Roll number is required';
    } else if (!rollNoRegex.test(formData.rollNo)) {
      newErrors.rollNo = 'Roll number must contain only digits';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.attendancePercentage) {
      newErrors.attendancePercentage = 'Attendance percentage is required';
    } else {
      const percentage = parseFloat(formData.attendancePercentage);
      if (isNaN(percentage)) {
        newErrors.attendancePercentage = 'Please enter a valid number';
      } else if (percentage < 0 || percentage > 100) {
        newErrors.attendancePercentage = 'Percentage must be between 0 and 100';
      }
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.standard.trim()) newErrors.standard = 'Standard is required';
    
    if (!formData.section.trim()) newErrors.section = 'Section is required';

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    const studentData = {
      name: formData.name,
      rollNo: parseInt(formData.rollNo),
      email: formData.email,
      attendancePercentage: parseFloat(formData.attendancePercentage),
      phoneNumber: parseInt(formData.phoneNumber),
      standard: formData.standard,
      section: formData.section
    };

    const endpoint = 'http://localhost:8080/api/students';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(studentData)
      });

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error('Server returned invalid JSON');
      }

      if (!response.ok) {
        if (response.status === 409) {
          if (data.message && data.message.includes('Roll number')) {
            throw new Error('This roll number already exists. Please use a different roll number.');
          } else if (data.message && data.message.includes('Email')) {
            throw new Error('This email already exists. Please use a different email.');
          }
        }
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      setSubmitStatus({
        type: 'success',
        message: data.message || 'Student details added successfully!'
      });
      
      setFormData({
        name: '',
        rollNo: '',
        email: '',
        attendancePercentage: '',
        phoneNumber: '',
        standard: '',
        section: ''
      });

      setErrors({});

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      setSubmitStatus({
        type: 'danger',
        message: error.message || 'Failed to add student. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  // ADDED: Function to handle Add Teacher button click
  const handleAddTeacher = () => {
    navigate('/');
  };

  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value.replace(/\D/g, '');
    const formattedValue = phoneNumber.slice(0, 10);
    handleChange({
      target: {
        name: 'phoneNumber',
        value: formattedValue
      }
    });
  };

  const handleRollNoChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    handleChange({
      target: {
        name: 'rollNo',
        value: value
      }
    });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8} xl={6}>
          <Card className="shadow-sm">
            {/* ADDED: Modified Card.Header with Add Teacher button */}
            <Card.Header className="bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="mb-0">Add Student Details</h3>
                  <small>Fields marked with * are required</small>
                  {/* ADDED: Welcome message for signed-in user */}
                  {currentUser.username && (
                    <div className="mt-2">
                      <small>Welcome, {currentUser.username}!</small>
                    </div>
                  )}
                </div>
                {/* ADDED: Add Teacher button */}
                {/* <Button 
                  variant="light" 
                  onClick={handleAddTeacher}
                  className="ms-3"
                >
                  Add Teacher
                </Button> */}
              </div>
            </Card.Header>
            <Card.Body>
              {submitStatus.message && (
                <Alert 
                  variant={submitStatus.type} 
                  dismissible 
                  onClose={() => setSubmitStatus({ type: '', message: '' })}
                  className="mt-3"
                >
                  {submitStatus.message}
                </Alert>
              )}

              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter student's full name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                    required
                    disabled={isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRollNo">
                  <Form.Label>Roll Number <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="rollNo"
                    placeholder="Enter roll number"
                    value={formData.rollNo}
                    onChange={handleRollNoChange}
                    isInvalid={!!errors.rollNo}
                    required
                    disabled={isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.rollNo}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    required
                    disabled={isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAttendance">
                  <Form.Label>Attendance Percentage <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="number"
                    name="attendancePercentage"
                    placeholder="Enter attendance percentage"
                    min="0"
                    max="100"
                    step="0.01"
                    value={formData.attendancePercentage}
                    onChange={handleChange}
                    isInvalid={!!errors.attendancePercentage}
                    required
                    disabled={isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.attendancePercentage}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="tel"
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    isInvalid={!!errors.phoneNumber}
                    required
                    disabled={isSubmitting}
                    maxLength="10"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phoneNumber}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formStandard">
                      <Form.Label>Standard <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="standard"
                        placeholder="e.g., 10th"
                        value={formData.standard}
                        onChange={handleChange}
                        isInvalid={!!errors.standard}
                        required
                        disabled={isSubmitting}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.standard}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formSection">
                      <Form.Label>Section <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        name="section"
                        value={formData.section}
                        onChange={handleChange}
                        isInvalid={!!errors.section}
                        required
                        disabled={isSubmitting}
                      >
                        <option value="">Select Section</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.section}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-between mt-4">
                  <Button 
                    variant="outline-secondary" 
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Add Student'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDetails;