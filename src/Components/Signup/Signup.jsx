// // // import React, { useState } from 'react';
// // // import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
// // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // // Optional custom CSS

// // // const SignUp = () => {
// // //   const [formData, setFormData] = useState({
// // //     username: '',
// // //     email: '',
// // //     password: '',
// // //     confirmPassword: '',
// // //     agreeToTerms: false
// // //   });
  
// // //   const [errors, setErrors] = useState({});
// // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // //   const [showSuccess, setShowSuccess] = useState(false);

// // //   const handleChange = (e) => {
// // //     const { name, value, type, checked } = e.target;
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [name]: type === 'checkbox' ? checked : value
// // //     }));
    
// // //     // Clear error when user starts typing
// // //     if (errors[name]) {
// // //       setErrors(prev => ({
// // //         ...prev,
// // //         [name]: ''
// // //       }));
// // //     }
// // //   };

// // //   const validateForm = () => {
// // //     const newErrors = {};

// // //     // Username validation
// // //     if (!formData.username.trim()) {
// // //       newErrors.username = 'Username is required';
// // //     } else if (formData.username.length < 3) {
// // //       newErrors.username = 'Username must be at least 3 characters';
// // //     }

// // //     // Email validation
// // //     if (!formData.email.trim()) {
// // //       newErrors.email = 'Email is required';
// // //     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
// // //       newErrors.email = 'Email is invalid';
// // //     }

// // //     // Password validation
// // //     if (!formData.password) {
// // //       newErrors.password = 'Password is required';
// // //     } else if (formData.password.length < 6) {
// // //       newErrors.password = 'Password must be at least 6 characters';
// // //     }

// // //     // Confirm password validation
// // //     if (!formData.confirmPassword) {
// // //       newErrors.confirmPassword = 'Please confirm your password';
// // //     } else if (formData.password !== formData.confirmPassword) {
// // //       newErrors.confirmPassword = 'Passwords do not match';
// // //     }

// // //     // Terms agreement validation
// // //     if (!formData.agreeToTerms) {
// // //       newErrors.agreeToTerms = 'You must agree to the terms and conditions';
// // //     }

// // //     return newErrors;
// // //   };

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();
    
// // //     const formErrors = validateForm();
    
// // //     if (Object.keys(formErrors).length === 0) {
// // //       setIsSubmitting(true);
      
// // //       // Simulate API call
// // //       setTimeout(() => {
// // //         console.log('Form submitted:', formData);
// // //         setIsSubmitting(false);
// // //         setShowSuccess(true);
// // //         setFormData({
// // //           username: '',
// // //           email: '',
// // //           password: '',
// // //           confirmPassword: '',
// // //           agreeToTerms: false
// // //         });
        
// // //         // Hide success message after 5 seconds
// // //         setTimeout(() => setShowSuccess(false), 5000);
// // //       }, 1500);
// // //     } else {
// // //       setErrors(formErrors);
// // //     }
// // //   };

// // //   return (
// // //     <Container fluid className="signup-container">
// // //       <Row className="justify-content-center align-items-center min-vh-100">
// // //         <Col xs={12} sm={8} md={6} lg={4}>
// // //           <Card className="shadow-lg">
// // //             <Card.Body className="p-4">
// // //               <div className="text-center mb-4">
// // //                 <h2 className="fw-bold text-primary">Create Account</h2>
// // //                 <p className="text-muted">Join our community today</p>
// // //               </div>

// // //               {showSuccess && (
// // //                 <Alert variant="success" className="mb-3">
// // //                   <strong>Success!</strong> Your account has been created successfully.
// // //                 </Alert>
// // //               )}

// // //               <Form onSubmit={handleSubmit} noValidate>
// // //                 {/* Username Field */}
// // //                 <Form.Group className="mb-3">
// // //                   <Form.Label>Username</Form.Label>
// // //                   <Form.Control
// // //                     type="text"
// // //                     name="username"
// // //                     value={formData.username}
// // //                     onChange={handleChange}
// // //                     placeholder="Enter your username"
// // //                     isInvalid={!!errors.username}
// // //                     required
// // //                   />
// // //                   <Form.Control.Feedback type="invalid">
// // //                     {errors.username}
// // //                   </Form.Control.Feedback>
// // //                 </Form.Group>

// // //                 {/* Email Field */}
// // //                 <Form.Group className="mb-3">
// // //                   <Form.Label>Email Address</Form.Label>
// // //                   <Form.Control
// // //                     type="email"
// // //                     name="email"
// // //                     value={formData.email}
// // //                     onChange={handleChange}
// // //                     placeholder="Enter your email"
// // //                     isInvalid={!!errors.email}
// // //                     required
// // //                   />
// // //                   <Form.Control.Feedback type="invalid">
// // //                     {errors.email}
// // //                   </Form.Control.Feedback>
// // //                 </Form.Group>

// // //                 {/* Password Field */}
// // //                 <Form.Group className="mb-3">
// // //                   <Form.Label>Password</Form.Label>
// // //                   <Form.Control
// // //                     type="password"
// // //                     name="password"
// // //                     value={formData.password}
// // //                     onChange={handleChange}
// // //                     placeholder="Enter your password"
// // //                     isInvalid={!!errors.password}
// // //                     required
// // //                   />
// // //                   <Form.Control.Feedback type="invalid">
// // //                     {errors.password}
// // //                   </Form.Control.Feedback>
// // //                   <Form.Text className="text-muted">
// // //                     Password must be at least 6 characters long.
// // //                   </Form.Text>
// // //                 </Form.Group>

// // //                 {/* Confirm Password Field */}
// // //                 <Form.Group className="mb-3">
// // //                   <Form.Label>Confirm Password</Form.Label>
// // //                   <Form.Control
// // //                     type="password"
// // //                     name="confirmPassword"
// // //                     value={formData.confirmPassword}
// // //                     onChange={handleChange}
// // //                     placeholder="Confirm your password"
// // //                     isInvalid={!!errors.confirmPassword}
// // //                     required
// // //                   />
// // //                   <Form.Control.Feedback type="invalid">
// // //                     {errors.confirmPassword}
// // //                   </Form.Control.Feedback>
// // //                 </Form.Group>

// // //                 {/* Terms and Conditions */}
// // //                 <Form.Group className="mb-4">
// // //                   <Form.Check
// // //                     type="checkbox"
// // //                     name="agreeToTerms"
// // //                     checked={formData.agreeToTerms}
// // //                     onChange={handleChange}
// // //                     label={
// // //                       <span>
// // //                         I agree to the{' '}
// // //                         <a href="#terms" className="text-decoration-none">
// // //                           Terms and Conditions
// // //                         </a>
// // //                       </span>
// // //                     }
// // //                     isInvalid={!!errors.agreeToTerms}
// // //                   />
// // //                   <Form.Control.Feedback type="invalid" className="d-block">
// // //                     {errors.agreeToTerms}
// // //                   </Form.Control.Feedback>
// // //                 </Form.Group>

// // //                 {/* Submit Button */}
// // //                 <Button
// // //                   variant="primary"
// // //                   type="submit"
// // //                   className="w-100 py-2 fw-semibold"
// // //                   disabled={isSubmitting}
// // //                 >
// // //                   {isSubmitting ? (
// // //                     <>
// // //                       <span className="spinner-border spinner-border-sm me-2" />
// // //                       Creating Account...
// // //                     </>
// // //                   ) : (
// // //                     'Sign Up'
// // //                   )}
// // //                 </Button>
// // //               </Form>

// // //               {/* Login Link */}
// // //               <div className="text-center mt-3">
// // //                 <p className="text-muted">
// // //                   Already have an account?{' '}
// // //                   <a href="#login" className="text-decoration-none fw-semibold">
// // //                     Sign In
// // //                   </a>
// // //                 </p>
// // //               </div>
// // //             </Card.Body>
// // //           </Card>
// // //         </Col>
// // //       </Row>
// // //     </Container>
// // //   );
// // // };

// // // export default SignUp;







// // import React, { useState } from 'react';
// // import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
// // import { useNavigate } from 'react-router-dom';
// // import { addUser, findUserByUsername, findUserByEmail } from './utils/usersStorage';

// // const SignUp = () => {
// //   const [formData, setFormData] = useState({
// //     username: '',
// //     email: '',
// //     password: '',
// //     confirmPassword: '',
// //     agreeToTerms: false
// //   });
  
// //   const [errors, setErrors] = useState({});
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [showSuccess, setShowSuccess] = useState(false);
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: type === 'checkbox' ? checked : value
// //     }));
    
// //     if (errors[name]) {
// //       setErrors(prev => ({
// //         ...prev,
// //         [name]: ''
// //       }));
// //     }
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};

// //     // Username validation
// //     if (!formData.username.trim()) {
// //       newErrors.username = 'Username is required';
// //     } else if (formData.username.length < 3) {
// //       newErrors.username = 'Username must be at least 3 characters';
// //     } else if (findUserByUsername(formData.username)) {
// //       newErrors.username = 'Username already exists';
// //     }

// //     // Email validation
// //     if (!formData.email.trim()) {
// //       newErrors.email = 'Email is required';
// //     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
// //       newErrors.email = 'Email is invalid';
// //     } else if (findUserByEmail(formData.email)) {
// //       newErrors.email = 'Email already registered';
// //     }

// //     // Password validation
// //     if (!formData.password) {
// //       newErrors.password = 'Password is required';
// //     } else if (formData.password.length < 6) {
// //       newErrors.password = 'Password must be at least 6 characters';
// //     }

// //     // Confirm password validation
// //     if (!formData.confirmPassword) {
// //       newErrors.confirmPassword = 'Please confirm your password';
// //     } else if (formData.password !== formData.confirmPassword) {
// //       newErrors.confirmPassword = 'Passwords do not match';
// //     }

// //     // Terms agreement validation
// //     if (!formData.agreeToTerms) {
// //       newErrors.agreeToTerms = 'You must agree to the terms and conditions';
// //     }

// //     return newErrors;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     const formErrors = validateForm();
    
// //     if (Object.keys(formErrors).length === 0) {
// //       setIsSubmitting(true);
      
// //       try {
// //         // For now, store in local array
// //         const newUser = addUser({
// //           username: formData.username,
// //           email: formData.email,
// //           password: formData.password
// //         });

// //         console.log('User created:', newUser);
        
// //         // Simulate API call delay
// //         await new Promise(resolve => setTimeout(resolve, 1500));
        
// //         setIsSubmitting(false);
// //         setShowSuccess(true);
        
// //         // Redirect to signin page after 2 seconds
// //         setTimeout(() => {
// //           navigate('/signin');
// //         }, 2000);
        
// //         // Reset form
// //         setFormData({
// //           username: '',
// //           email: '',
// //           password: '',
// //           confirmPassword: '',
// //           agreeToTerms: false
// //         });
        
// //       } catch (error) {
// //         console.error('Signup error:', error);
// //         setIsSubmitting(false);
// //       }
// //     } else {
// //       setErrors(formErrors);
// //     }
// //   };

// //   return (
// //     <Container fluid className="signup-container">
// //       <Row className="justify-content-center align-items-center min-vh-100">
// //         <Col xs={12} sm={8} md={6} lg={4}>
// //           <Card className="shadow-lg">
// //             <Card.Body className="p-4">
// //               <div className="text-center mb-4">
// //                 <h2 className="fw-bold text-primary">Create Account</h2>
// //                 <p className="text-muted">Join our community today</p>
// //               </div>

// //               {showSuccess && (
// //                 <Alert variant="success" className="mb-3">
// //                   <strong>Success!</strong> Your account has been created successfully. Redirecting to login...
// //                 </Alert>
// //               )}

// //               <Form onSubmit={handleSubmit} noValidate>
// //                 {/* Form fields remain the same as your original code */}
// //                 <Form.Group className="mb-3">
// //                   <Form.Label>Username</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     name="username"
// //                     value={formData.username}
// //                     onChange={handleChange}
// //                     placeholder="Enter your username"
// //                     isInvalid={!!errors.username}
// //                     required
// //                   />
// //                   <Form.Control.Feedback type="invalid">
// //                     {errors.username}
// //                   </Form.Control.Feedback>
// //                 </Form.Group>

// //                 <Form.Group className="mb-3">
// //                   <Form.Label>Email Address</Form.Label>
// //                   <Form.Control
// //                     type="email"
// //                     name="email"
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                     placeholder="Enter your email"
// //                     isInvalid={!!errors.email}
// //                     required
// //                   />
// //                   <Form.Control.Feedback type="invalid">
// //                     {errors.email}
// //                   </Form.Control.Feedback>
// //                 </Form.Group>

// //                 <Form.Group className="mb-3">
// //                   <Form.Label>Password</Form.Label>
// //                   <Form.Control
// //                     type="password"
// //                     name="password"
// //                     value={formData.password}
// //                     onChange={handleChange}
// //                     placeholder="Enter your password"
// //                     isInvalid={!!errors.password}
// //                     required
// //                   />
// //                   <Form.Control.Feedback type="invalid">
// //                     {errors.password}
// //                   </Form.Control.Feedback>
// //                   <Form.Text className="text-muted">
// //                     Password must be at least 6 characters long.
// //                   </Form.Text>
// //                 </Form.Group>

// //                 <Form.Group className="mb-3">
// //                   <Form.Label>Confirm Password</Form.Label>
// //                   <Form.Control
// //                     type="password"
// //                     name="confirmPassword"
// //                     value={formData.confirmPassword}
// //                     onChange={handleChange}
// //                     placeholder="Confirm your password"
// //                     isInvalid={!!errors.confirmPassword}
// //                     required
// //                   />
// //                   <Form.Control.Feedback type="invalid">
// //                     {errors.confirmPassword}
// //                   </Form.Control.Feedback>
// //                 </Form.Group>

// //                 <Form.Group className="mb-4">
// //                   <Form.Check
// //                     type="checkbox"
// //                     name="agreeToTerms"
// //                     checked={formData.agreeToTerms}
// //                     onChange={handleChange}
// //                     label="I agree to the Terms and Conditions"
// //                     isInvalid={!!errors.agreeToTerms}
// //                   />
// //                   <Form.Control.Feedback type="invalid" className="d-block">
// //                     {errors.agreeToTerms}
// //                   </Form.Control.Feedback>
// //                 </Form.Group>

// //                 <Button
// //                   variant="primary"
// //                   type="submit"
// //                   className="w-100 py-2 fw-semibold"
// //                   disabled={isSubmitting}
// //                 >
// //                   {isSubmitting ? (
// //                     <>
// //                       <span className="spinner-border spinner-border-sm me-2" />
// //                       Creating Account...
// //                     </>
// //                   ) : (
// //                     'Sign Up'
// //                   )}
// //                 </Button>
// //               </Form>

// //               <div className="text-center mt-3">
// //                 <p className="text-muted">
// //                   Already have an account?{' '}
// //                   <a href="/signin" className="text-decoration-none fw-semibold">
// //                     Sign In
// //                   </a>
// //                 </p>
// //               </div>
// //             </Card.Body>
// //           </Card>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default SignUp;







// // import React, { useState } from 'react';
// // import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
// // import { useNavigate } from 'react-router-dom';

// // // Temporary storage directly in the component
// // let users = [
  

// // ];

// // const addUser = (userData) => {
// //   const newUser = {
// //     id: Date.now(),
// //     ...userData,
// //     createdAt: new Date().toISOString()
// //   };
// //   users.push(newUser);
// //   console.log('Current users:', users);
// //   return newUser;
// // };

// // const findUserByUsername = (username) => {
// //   return users.find(user => user.username === username);
// // };

// // const findUserByEmail = (email) => {
// //   return users.find(user => user.email === email);
// // };

// // const SignUp = () => {
// //   const [formData, setFormData] = useState({
// //     username: '',
// //     email: '',
// //     password: '',
// //     confirmPassword: '',
// //     agreeToTerms: false
// //   });
  
// //   const [errors, setErrors] = useState({});
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [showSuccess, setShowSuccess] = useState(false);
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: type === 'checkbox' ? checked : value
// //     }));
    
// //     if (errors[name]) {
// //       setErrors(prev => ({
// //         ...prev,
// //         [name]: ''
// //       }));
// //     }
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};

// //     // Username validation
// //     if (!formData.username.trim()) {
// //       newErrors.username = 'Username is required';
// //     } else if (formData.username.length < 3) {
// //       newErrors.username = 'Username must be at least 3 characters';
// //     } else if (findUserByUsername(formData.username)) {
// //       newErrors.username = 'Username already exists';
// //     }

// //     // Email validation
// //     if (!formData.email.trim()) {
// //       newErrors.email = 'Email is required';
// //     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
// //       newErrors.email = 'Email is invalid';
// //     } else if (findUserByEmail(formData.email)) {
// //       newErrors.email = 'Email already registered';
// //     }

// //     // Password validation
// //     if (!formData.password) {
// //       newErrors.password = 'Password is required';
// //     } else if (formData.password.length < 6) {
// //       newErrors.password = 'Password must be at least 6 characters';
// //     }

// //     // Confirm password validation
// //     if (!formData.confirmPassword) {
// //       newErrors.confirmPassword = 'Please confirm your password';
// //     } else if (formData.password !== formData.confirmPassword) {
// //       newErrors.confirmPassword = 'Passwords do not match';
// //     }

// //     // Terms agreement validation
// //     if (!formData.agreeToTerms) {
// //       newErrors.agreeToTerms = 'You must agree to the terms and conditions';
// //     }

// //     return newErrors;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     const formErrors = validateForm();
    
// //     if (Object.keys(formErrors).length === 0) {
// //       setIsSubmitting(true);
      
// //       try {
// //         // Store in local array
// //         const newUser = addUser({
// //           username: formData.username,
// //           email: formData.email,
// //           password: formData.password
// //         });

// //         console.log('User created:', newUser);
        
// //         // Simulate API call delay
// //         await new Promise(resolve => setTimeout(resolve, 1500));
        
// //         setIsSubmitting(false);
// //         setShowSuccess(true);
        
// //         // Redirect to signin page after 2 seconds
// //         setTimeout(() => {
// //           navigate('/signin');
// //         }, 2000);
        
// //         // Reset form
// //         setFormData({
// //           username: '',
// //           email: '',
// //           password: '',
// //           confirmPassword: '',
// //           agreeToTerms: false
// //         });
        
// //       } catch (error) {
// //         console.error('Signup error:', error);
// //         setIsSubmitting(false);
// //       }
// //     } else {
// //       setErrors(formErrors);
// //     }
// //   };

// //   return (
// //     <Container fluid className="signup-container">
// //       <Row className="justify-content-center align-items-center min-vh-100">
// //         <Col xs={12} sm={8} md={6} lg={4}>
// //           <Card className="shadow-lg">
// //             <Card.Body className="p-4">
// //               <div className="text-center mb-4">
// //                 <h2 className="fw-bold text-primary">Create Account</h2>
// //                 <p className="text-muted">Join our community today</p>
// //               </div>

// //               {showSuccess && (
// //                 <Alert variant="success" className="mb-3">
// //                   <strong>Success!</strong> Your account has been created successfully. Redirecting to login...
// //                 </Alert>
// //               )}

// //               <Form onSubmit={handleSubmit} noValidate>
// //                 {/* Your form fields here */}
// //                 <Form.Group className="mb-3">
// //                   <Form.Label>Username</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     name="username"
// //                     value={formData.username}
// //                     onChange={handleChange}
// //                     placeholder="Enter your username"
// //                     isInvalid={!!errors.username}
// //                     required
// //                   />
// //                   <Form.Control.Feedback type="invalid">
// //                     {errors.username}
// //                   </Form.Control.Feedback>
// //                 </Form.Group>

// //                 {/* Add other form fields */}
// //                 <Form.Group className="mb-3">
// //                   <Form.Label>Email Address</Form.Label>
// //                   <Form.Control
// //                     type="email"
// //                     name="email"
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                     placeholder="Enter your email"
// //                     isInvalid={!!errors.email}
// //                     required
// //                   />
// //                   <Form.Control.Feedback type="invalid">
// //                     {errors.email}
// //                   </Form.Control.Feedback>
// //                 </Form.Group>

// //                 <Form.Group className="mb-3">
// //                   <Form.Label>Password</Form.Label>
// //                   <Form.Control
// //                     type="password"
// //                     name="password"
// //                     value={formData.password}
// //                     onChange={handleChange}
// //                     placeholder="Enter your password"
// //                     isInvalid={!!errors.password}
// //                     required
// //                   />
// //                   <Form.Control.Feedback type="invalid">
// //                     {errors.password}
// //                   </Form.Control.Feedback>
// //                 </Form.Group>

// //                 <Form.Group className="mb-3">
// //                   <Form.Label>Confirm Password</Form.Label>
// //                   <Form.Control
// //                     type="password"
// //                     name="confirmPassword"
// //                     value={formData.confirmPassword}
// //                     onChange={handleChange}
// //                     placeholder="Confirm your password"
// //                     isInvalid={!!errors.confirmPassword}
// //                     required
// //                   />
// //                   <Form.Control.Feedback type="invalid">
// //                     {errors.confirmPassword}
// //                   </Form.Control.Feedback>
// //                 </Form.Group>

// //                 <Form.Group className="mb-4">
// //                   <Form.Check
// //                     type="checkbox"
// //                     name="agreeToTerms"
// //                     checked={formData.agreeToTerms}
// //                     onChange={handleChange}
// //                     label="I agree to the Terms and Conditions"
// //                     isInvalid={!!errors.agreeToTerms}
// //                   />
// //                   <Form.Control.Feedback type="invalid" className="d-block">
// //                     {errors.agreeToTerms}
// //                   </Form.Control.Feedback>
// //                 </Form.Group>

// //                 <Button
// //                   variant="primary"
// //                   type="submit"
// //                   className="w-100 py-2 fw-semibold"
// //                   disabled={isSubmitting}
// //                 >
// //                   {isSubmitting ? (
// //                     <>
// //                       <span className="spinner-border spinner-border-sm me-2" />
// //                       Creating Account...
// //                     </>
// //                   ) : (
// //                     'Sign Up'
// //                   )}
// //                 </Button>
// //               </Form>

// //               <div className="text-center mt-3">
// //                 <p className="text-muted">
// //                   Already have an account?{' '}
// //                   <a href="/signin" className="text-decoration-none fw-semibold">
// //                     Sign In
// //                   </a>
// //                 </p>
// //               </div>
// //             </Card.Body>
// //           </Card>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default SignUp;







// // import React, { useState } from 'react';
// // import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
// // import { useNavigate } from 'react-router-dom';

// // // API function to create user
// // const createUserWithAPI = async (userData) => {
// //   const response = await fetch('http://localhost:8080/api/student', {
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/json',
// //     },
// //     body: JSON.stringify(userData)
// //   });
  
// //   if (!response.ok) {
// //     throw new Error('Failed to create user');
// //   }
  
// //   return await response.json();
// // };

// // // Temporary storage directly in the component (as fallback)
// // let users = [];

// // const addUser = (userData) => {
// //   const newUser = {
// //     id: Date.now(),
// //     ...userData,
// //     createdAt: new Date().toISOString()
// //   };
// //   users.push(newUser);
// //   console.log('Current users:', users);
// //   return newUser;
// // };

// // const findUserByUsername = (username) => {
// //   return users.find(user => user.username === username);
// // };

// // const findUserByEmail = (email) => {
// //   return users.find(user => user.email === email);
// // };

// // const SignUp = () => {
// //   const [formData, setFormData] = useState({
// //     username: '',
// //     email: '',
// //     password: '',
// //     confirmPassword: '',
// //     agreeToTerms: false
// //   });
  
// //   const [errors, setErrors] = useState({});
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [showSuccess, setShowSuccess] = useState(false);
// //   const [apiError, setApiError] = useState('');
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: type === 'checkbox' ? checked : value
// //     }));
    
// //     if (errors[name]) {
// //       setErrors(prev => ({
// //         ...prev,
// //         [name]: ''
// //       }));
// //     }
    
// //     // Clear API error when user starts typing again
// //     if (apiError) {
// //       setApiError('');
// //     }
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};

// //     // Username validation
// //     if (!formData.username.trim()) {
// //       newErrors.username = 'Username is required';
// //     } else if (formData.username.length < 3) {
// //       newErrors.username = 'Username must be at least 3 characters';
// //     } else if (findUserByUsername(formData.username)) {
// //       newErrors.username = 'Username already exists';
// //     }

// //     // Email validation
// //     if (!formData.email.trim()) {
// //       newErrors.email = 'Email is required';
// //     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
// //       newErrors.email = 'Email is invalid';
// //     } else if (findUserByEmail(formData.email)) {
// //       newErrors.email = 'Email already registered';
// //     }

// //     // Password validation
// //     if (!formData.password) {
// //       newErrors.password = 'Password is required';
// //     } else if (formData.password.length < 6) {
// //       newErrors.password = 'Password must be at least 6 characters';
// //     }

// //     // Confirm password validation
// //     if (!formData.confirmPassword) {
// //       newErrors.confirmPassword = 'Please confirm your password';
// //     } else if (formData.password !== formData.confirmPassword) {
// //       newErrors.confirmPassword = 'Passwords do not match';
// //     }

// //     // Terms agreement validation
// //     if (!formData.agreeToTerms) {
// //       newErrors.agreeToTerms = 'You must agree to the terms and conditions';
// //     }

// //     return newErrors;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     const formErrors = validateForm();
    
// //     if (Object.keys(formErrors).length === 0) {
// //       setIsSubmitting(true);
// //       setApiError('');
      
// //       try {
// //         // Prepare data for API - adjust fields according to your StudentsDB entity
// //         const userDataForAPI = {
// //           username: formData.username,
// //           email: formData.email,
// //           password: formData.password,
// //           // Add other fields that your StudentsDB entity expects
// //           // For example: name, department, etc.
// //         };

// //         console.log('Sending data to API:', userDataForAPI);
        
// //         // Send data to your Spring Boot API
// //         const createdUser = await createUserWithAPI(userDataForAPI);
        
// //         console.log('User created via API:', createdUser);
        
// //         // Also store locally as fallback
// //         addUser({
// //           username: formData.username,
// //           email: formData.email,
// //           password: formData.password
// //         });

// //         setIsSubmitting(false);
// //         setShowSuccess(true);
        
// //         // Redirect to signin page after 2 seconds
// //         setTimeout(() => {
// //           navigate('/signin');
// //         }, 2000);
        
// //         // Reset form
// //         setFormData({
// //           username: '',
// //           email: '',
// //           password: '',
// //           confirmPassword: '',
// //           agreeToTerms: false
// //         });
        
// //       } catch (error) {
// //         console.error('Signup error:', error);
// //         setApiError('Failed to create account. Please try again.');
// //         setIsSubmitting(false);
        
// //         // Fallback: Store locally if API fails
// //         console.log('API failed, storing locally as fallback');
// //         addUser({
// //           username: formData.username,
// //           email: formData.email,
// //           password: formData.password
// //         });
// //       }
// //     } else {
// //       setErrors(formErrors);
// //     }
// //   };

// //   return (
// //     <Container fluid className="signup-container">
// //       <Row className="justify-content-center align-items-center min-vh-100">
// //         <Col xs={12} sm={8} md={6} lg={4}>
// //           <Card className="shadow-lg">
// //             <Card.Body className="p-4">
// //               <div className="text-center mb-4">
// //                 <h2 className="fw-bold text-primary">Create Account</h2>
// //                 <p className="text-muted">Join our community today</p>
// //               </div>

// //               {showSuccess && (
// //                 <Alert variant="success" className="mb-3">
// //                   <strong>Success!</strong> Your account has been created successfully. Redirecting to login...
// //                 </Alert>
// //               )}

// //               {apiError && (
// //                 <Alert variant="danger" className="mb-3">
// //                   {apiError}
// //                 </Alert>
// //               )}

// //               <Form onSubmit={handleSubmit} noValidate>
// //                 <Form.Group className="mb-3">
// //                   <Form.Label>Username</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     name="username"
// //                     value={formData.username}
// //                     onChange={handleChange}
// //                     placeholder="Enter your username"
// //                     isInvalid={!!errors.username}
// //                     required
// //                   />
// //                   <Form.Control.Feedback type="invalid">
// //                     {errors.username}
// //                   </Form.Control.Feedback>
// //                 </Form.Group>

// //                 <Form.Group className="mb-3">
// //                   <Form.Label>Email Address</Form.Label>
// //                   <Form.Control
// //                     type="email"
// //                     name="email"
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                     placeholder="Enter your email"
// //                     isInvalid={!!errors.email}
// //                     required
// //                   />
// //                   <Form.Control.Feedback type="invalid">
// //                     {errors.email}
// //                   </Form.Control.Feedback>
// //                 </Form.Group>

// //                 <Form.Group className="mb-3">
// //                   <Form.Label>Password</Form.Label>
// //                   <Form.Control
// //                     type="password"
// //                     name="password"
// //                     value={formData.password}
// //                     onChange={handleChange}
// //                     placeholder="Enter your password"
// //                     isInvalid={!!errors.password}
// //                     required
// //                   />
// //                   <Form.Control.Feedback type="invalid">
// //                     {errors.password}
// //                   </Form.Control.Feedback>
// //                 </Form.Group>

// //                 <Form.Group className="mb-3">
// //                   <Form.Label>Confirm Password</Form.Label>
// //                   <Form.Control
// //                     type="password"
// //                     name="confirmPassword"
// //                     value={formData.confirmPassword}
// //                     onChange={handleChange}
// //                     placeholder="Confirm your password"
// //                     isInvalid={!!errors.confirmPassword}
// //                     required
// //                   />
// //                   <Form.Control.Feedback type="invalid">
// //                     {errors.confirmPassword}
// //                   </Form.Control.Feedback>
// //                 </Form.Group>

// //                 <Form.Group className="mb-4">
// //                   <Form.Check
// //                     type="checkbox"
// //                     name="agreeToTerms"
// //                     checked={formData.agreeToTerms}
// //                     onChange={handleChange}
// //                     label="I agree to the Terms and Conditions"
// //                     isInvalid={!!errors.agreeToTerms}
// //                   />
// //                   <Form.Control.Feedback type="invalid" className="d-block">
// //                     {errors.agreeToTerms}
// //                   </Form.Control.Feedback>
// //                 </Form.Group>

// //                 <Button
// //                   variant="primary"
// //                   type="submit"
// //                   className="w-100 py-2 fw-semibold"
// //                   disabled={isSubmitting}
// //                 >
// //                   {isSubmitting ? (
// //                     <>
// //                       <span className="spinner-border spinner-border-sm me-2" />
// //                       Creating Account...
// //                     </>
// //                   ) : (
// //                     'Sign Up'
// //                   )}
// //                 </Button>
// //               </Form>

// //               <div className="text-center mt-3">
// //                 <p className="text-muted">
// //                   Already have an account?{' '}
// //                   <a href="/signin" className="text-decoration-none fw-semibold">
// //                     Sign In
// //                   </a>
// //                 </p>
// //               </div>
// //             </Card.Body>
// //           </Card>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default SignUp;





// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Card, Alert, Modal } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// // API function to create user
// const createUserWithAPI = async (userData) => {
//   const response = await fetch('http://localhost:8080/api/student', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData)
//   });
  
//   if (!response.ok) {
//     throw new Error('Failed to create user');
//   }
  
//   return await response.json();
// };

// // Temporary storage directly in the component (as fallback)
// let users = [];

// const addUser = (userData) => {
//   const newUser = {
//     id: Date.now(),
//     ...userData,
//     createdAt: new Date().toISOString()
//   };
//   users.push(newUser);
//   console.log('Current users:', users);
//   return newUser;
// };

// const findUserByUsername = (username) => {
//   return users.find(user => user.username === username);
// };

// const findUserByEmail = (email) => {
//   return users.find(user => user.email === email);
// };

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     agreeToTerms: false
//   });
  
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [apiError, setApiError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
    
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
    
//     // Clear API error when user starts typing again
//     if (apiError) {
//       setApiError('');
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // Username validation
//     if (!formData.username.trim()) {
//       newErrors.username = 'Username is required';
//     } else if (formData.username.length < 3) {
//       newErrors.username = 'Username must be at least 3 characters';
//     } else if (findUserByUsername(formData.username)) {
//       newErrors.username = 'Username already exists';
//     }

//     // Email validation
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     } else if (findUserByEmail(formData.email)) {
//       newErrors.email = 'Email already registered';
//     }

//     // Password validation
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     // Confirm password validation
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     // Terms agreement validation
//     if (!formData.agreeToTerms) {
//       newErrors.agreeToTerms = 'You must agree to the terms and conditions';
//     }

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const formErrors = validateForm();
    
//     if (Object.keys(formErrors).length === 0) {
//       setIsSubmitting(true);
//       setApiError('');
      
//       try {
//         // Prepare data for API - adjust fields according to your StudentsDB entity
//         const userDataForAPI = {
//           username: formData.username,
//           email: formData.email,
//           password: formData.password,
//           // Add other fields that your StudentsDB entity expects
//           // For example: name, department, etc.
//         };

//         console.log('Sending data to API:', userDataForAPI);
        
//         // Send data to your Spring Boot API
//         const createdUser = await createUserWithAPI(userDataForAPI);
        
//         console.log('User created via API:', createdUser);
        
//         // Also store locally as fallback
//         addUser({
//           username: formData.username,
//           email: formData.email,
//           password: formData.password
//         });

//         setIsSubmitting(false);
//         setShowSuccess(true);
//         setShowSuccessModal(true);
        
//         // Reset form
//         setFormData({
//           username: '',
//           email: '',
//           password: '',
//           confirmPassword: '',
//           agreeToTerms: false
//         });
        
//       } catch (error) {
//         console.error('Signup error:', error);
//         setApiError('Failed to create account. Please try again.');
//         setIsSubmitting(false);
        
//         // Fallback: Store locally if API fails
//         console.log('API failed, storing locally as fallback');
//         addUser({
//           username: formData.username,
//           email: formData.email,
//           password: formData.password
//         });
//       }
//     } else {
//       setErrors(formErrors);
//     }
//   };

//   const handleCloseSuccessModal = () => {
//     setShowSuccessModal(false);
//     navigate('/signin');
//   };

//   // Function to render required field asterisk
//   const RequiredField = () => <span className="text-danger">*</span>;

//   return (
//     <Container fluid className="signup-container">
//       <Row className="justify-content-center align-items-center min-vh-100">
//         <Col xs={12} sm={8} md={6} lg={4}>
//           <Card className="shadow-lg">
//             <Card.Body className="p-4">
//               <div className="text-center mb-4">
//                 <h2 className="fw-bold text-primary">Create Account</h2>
//                 <p className="text-muted">Join our community today</p>
//                 <small className="text-muted">
//                   Fields marked with <RequiredField /> are required
//                 </small>
//               </div>

//               {showSuccess && (
//                 <Alert variant="success" className="mb-3">
//                   <strong>Success!</strong> Your account has been created successfully.
//                 </Alert>
//               )}

//               {apiError && (
//                 <Alert variant="danger" className="mb-3">
//                   {apiError}
//                 </Alert>
//               )}

//               <Form onSubmit={handleSubmit} noValidate>
//                 <Form.Group className="mb-3">
//                   <Form.Label>
//                     Username <RequiredField />
//                   </Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     placeholder="Enter your username"
//                     isInvalid={!!errors.username}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.username}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>
//                     Email Address <RequiredField />
//                   </Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Enter your email"
//                     isInvalid={!!errors.email}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.email}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>
//                     Password <RequiredField />
//                   </Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Enter your password"
//                     isInvalid={!!errors.password}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.password}
//                   </Form.Control.Feedback>
//                   <Form.Text className="text-muted">
//                     Password must be at least 6 characters long
//                   </Form.Text>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>
//                     Confirm Password <RequiredField />
//                   </Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     placeholder="Confirm your password"
//                     isInvalid={!!errors.confirmPassword}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.confirmPassword}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                   <Form.Check
//                     type="checkbox"
//                     name="agreeToTerms"
//                     checked={formData.agreeToTerms}
//                     onChange={handleChange}
//                     label={
//                       <span>
//                         I agree to the Terms and Conditions <RequiredField />
//                       </span>
//                     }
//                     isInvalid={!!errors.agreeToTerms}
//                   />
//                   <Form.Control.Feedback type="invalid" className="d-block">
//                     {errors.agreeToTerms}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Button
//                   variant="primary"
//                   type="submit"
//                   className="w-100 py-2 fw-semibold"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <span className="spinner-border spinner-border-sm me-2" />
//                       Creating Account...
//                     </>
//                   ) : (
//                     'Sign Up'
//                   )}
//                 </Button>
//               </Form>

//               <div className="text-center mt-3">
//                 <p className="text-muted">
//                   Already have an account?{' '}
//                   <a href="/signin" className="text-decoration-none fw-semibold">
//                     Sign In
//                   </a>
//                 </p>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Success Modal */}
//       <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
//         <Modal.Header closeButton className="border-0">
//           <Modal.Title className="text-success w-100 text-center">
//             <i className="bi bi-check-circle-fill me-2"></i>
//             Success!
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="text-center py-4">
//           <div className="mb-3">
//             <i className="bi bi-check-circle" style={{ fontSize: '3rem', color: 'green' }}></i>
//           </div>
//           <h5 className="mb-3">Your account has been created successfully!</h5>
//           <p className="text-muted">
//             You will now be redirected to the login page where you can sign in with your new credentials.
//           </p>
//         </Modal.Body>
//         <Modal.Footer className="border-0 justify-content-center">
//           <Button variant="primary" onClick={handleCloseSuccessModal}>
//             Continue to Login
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default SignUp;





// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Card, Alert, Modal, InputGroup } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// // API function to create user
// const createUserWithAPI = async (userData) => {
//   const response = await fetch('http://localhost:8080/api/student', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData)
//   });
  
//   if (!response.ok) {
//     throw new Error('Failed to create user');
//   }
  
//   return await response.json();
// };

// // Temporary storage directly in the component (as fallback)
// let users = [];

// const addUser = (userData) => {
//   const newUser = {
//     id: Date.now(),
//     ...userData,
//     createdAt: new Date().toISOString()
//   };
//   users.push(newUser);
//   console.log('Current users:', users);
//   return newUser;
// };

// const findUserByUsername = (username) => {
//   return users.find(user => user.username === username);
// };

// const findUserByEmail = (email) => {
//   return users.find(user => user.email === email);
// };

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     agreeToTerms: false
//   });
  
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [apiError, setApiError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
    
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
    
//     if (apiError) {
//       setApiError('');
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.username.trim()) {
//       newErrors.username = 'Username is required';
//     } else if (formData.username.length < 3) {
//       newErrors.username = 'Username must be at least 3 characters';
//     } else if (findUserByUsername(formData.username)) {
//       newErrors.username = 'Username already exists';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     } else if (findUserByEmail(formData.email)) {
//       newErrors.email = 'Email already registered';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     if (!formData.agreeToTerms) {
//       newErrors.agreeToTerms = 'You must agree to the terms and conditions';
//     }

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const formErrors = validateForm();
    
//     if (Object.keys(formErrors).length === 0) {
//       setIsSubmitting(true);
//       setApiError('');
      
//       try {
//         const userDataForAPI = {
//           username: formData.username,
//           email: formData.email,
//           password: formData.password,
//         };

//         console.log('Sending data to API:', userDataForAPI);
        
//         const createdUser = await createUserWithAPI(userDataForAPI);
        
//         console.log('User created via API:', createdUser);
        
//         addUser({
//           username: formData.username,
//           email: formData.email,
//           password: formData.password
//         });

//         setIsSubmitting(false);
//         setShowSuccess(true);
//         setShowSuccessModal(true);
        
//         setFormData({
//           username: '',
//           email: '',
//           password: '',
//           confirmPassword: '',
//           agreeToTerms: false
//         });
        
//       } catch (error) {
//         console.error('Signup error:', error);
//         setApiError('Failed to create account. Please try again.');
//         setIsSubmitting(false);
        
//         console.log('API failed, storing locally as fallback');
//         addUser({
//           username: formData.username,
//           email: formData.email,
//           password: formData.password
//         });
//       }
//     } else {
//       setErrors(formErrors);
//     }
//   };

//   const handleCloseSuccessModal = () => {
//     setShowSuccessModal(false);
//     navigate('/signin');
//   };

//   const RequiredField = () => <span className="text-danger">*</span>;

//   return (
//     <Container fluid className="signup-container">
//       <Row className="justify-content-center align-items-center min-vh-100">
//         <Col xs={12} sm={8} md={6} lg={4}>
//           <Card className="shadow-lg">
//             <Card.Body className="p-4">
//               <div className="text-center mb-4">
//                 <h2 className="fw-bold text-primary">Create Account</h2>
//                 <p className="text-muted">Join our community today</p>
//                 <small className="text-muted">
//                   Fields marked with <RequiredField /> are required
//                 </small>
//               </div>

//               {showSuccess && (
//                 <Alert variant="success" className="mb-3">
//                   <strong>Success!</strong> Your account has been created successfully.
//                 </Alert>
//               )}

//               {apiError && (
//                 <Alert variant="danger" className="mb-3">
//                   {apiError}
//                 </Alert>
//               )}

//               <Form onSubmit={handleSubmit} noValidate>
//                 <Form.Group className="mb-3">
//                   <Form.Label>
//                     Username <RequiredField />
//                   </Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     placeholder="Enter your username"
//                     isInvalid={!!errors.username}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.username}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>
//                     Email Address <RequiredField />
//                   </Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Enter your email"
//                     isInvalid={!!errors.email}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.email}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 {/* Password Field with Eye Icon */}
//                 <Form.Group className="mb-3">
//                   <Form.Label>
//                     Password <RequiredField />
//                   </Form.Label>
//                   <InputGroup>
//                     <Form.Control
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       placeholder="Enter your password"
//                       isInvalid={!!errors.password}
//                       required
//                     />
//                     <InputGroup.Text 
//                       style={{ cursor: 'pointer' }}
//                       onClick={togglePasswordVisibility}
//                       className={errors.password ? 'border-danger' : ''}
//                     >
//                       <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} style={{ fontSize: '1.2rem' }}>&#xf070;</i>
//                     </InputGroup.Text>
//                     <Form.Control.Feedback type="invalid">
//                       {errors.password}
//                     </Form.Control.Feedback>
//                   </InputGroup>
//                   <Form.Text className="text-muted">
//                     Password must be at least 6 characters long
//                   </Form.Text>
//                 </Form.Group>

//                 {/* Confirm Password Field with Eye Icon */}
//                 <Form.Group className="mb-3">
//                   <Form.Label>
//                     Confirm Password <RequiredField />
//                   </Form.Label>
//                   <InputGroup>
//                     <Form.Control
//                       type={showConfirmPassword ? "text" : "password"}
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       placeholder="Confirm your password"
//                       isInvalid={!!errors.confirmPassword}
//                       required
//                     />
//                     <InputGroup.Text 
//                       style={{ cursor: 'pointer' }}
//                       onClick={toggleConfirmPasswordVisibility}
//                       className={errors.confirmPassword ? 'border-danger' : ''}
//                     >
//                       <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`} style={{ fontSize: '1.2rem' }}></i>
//                     </InputGroup.Text>
//                     <Form.Control.Feedback type="invalid">
//                       {errors.confirmPassword}
//                     </Form.Control.Feedback>
//                   </InputGroup>
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                   <Form.Check
//                     type="checkbox"
//                     name="agreeToTerms"
//                     checked={formData.agreeToTerms}
//                     onChange={handleChange}
//                     label={
//                       <span>
//                         I agree to the Terms and Conditions <RequiredField />
//                       </span>
//                     }
//                     isInvalid={!!errors.agreeToTerms}
//                   />
//                   <Form.Control.Feedback type="invalid" className="d-block">
//                     {errors.agreeToTerms}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Button
//                   variant="primary"
//                   type="submit"
//                   className="w-100 py-2 fw-semibold"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <span className="spinner-border spinner-border-sm me-2" />
//                       Creating Account...
//                     </>
//                   ) : (
//                     'Sign Up'
//                   )}
//                 </Button>
//               </Form>

//               <div className="text-center mt-3">
//                 <p className="text-muted">
//                   Already have an account?{' '}
//                   <a href="/signin" className="text-decoration-none fw-semibold">
//                     Sign In
//                   </a>
//                 </p>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
//         <Modal.Header closeButton className="border-0">
//           <Modal.Title className="text-success w-100 text-center">
//             <i className="bi bi-check-circle-fill me-2"></i>
//             Success!
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="text-center py-4">
//           <div className="mb-3">
//             <i className="bi bi-check-circle" style={{ fontSize: '3rem', color: 'green' }}></i>
//           </div>
//           <h5 className="mb-3">Your account has been created successfully!</h5>
//           <p className="text-muted">
//             You will now be redirected to the login page where you can sign in with your new credentials.
//           </p>
//         </Modal.Body>
//         <Modal.Footer className="border-0 justify-content-center">
//           <Button variant="primary" onClick={handleCloseSuccessModal}>
//             Continue to Login
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default SignUp



// import React, { useState, useRef, useEffect } from 'react';
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Card,
//   Alert,
//   Modal,
//   InputGroup
// } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     agreeToTerms: false
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [apiError, setApiError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // typewriter text for bubble
//   const [displayedMessage, setDisplayedMessage] = useState('');
//   const fullMessage =
//     'Before we start, please register with your details to move forward.';

//   const navigate = useNavigate();
//   const headRef = useRef(null);
//   const robotWrapperRef = useRef(null);

//   // ---- API + local helpers ----
//   const createUserWithAPI = async (userData) => {
//     const response = await fetch('http://localhost:8080/api/student', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(userData)
//     });
//     if (!response.ok) throw new Error('Failed to create user');
//     return await response.json();
//   };

//   let users = [];
//   const addUser = (userData) => {
//     const newUser = {
//       id: Date.now(),
//       ...userData,
//       createdAt: new Date().toISOString()
//     };
//     users.push(newUser);
//     return newUser;
//   };
//   const findUserByUsername = (username) =>
//     users.find((user) => user.username === username);
//   const findUserByEmail = (email) =>
//     users.find((user) => user.email === email);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: '' }));
//     }
//     if (apiError) setApiError('');
//   };

//   const togglePasswordVisibility = () =>
//     setShowPassword((prev) => !prev);
//   const toggleConfirmPasswordVisibility = () =>
//     setShowConfirmPassword((prev) => !prev);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.username.trim()) newErrors.username = 'Username is required';
//     else if (formData.username.length < 3)
//       newErrors.username = 'Username must be at least 3 characters';
//     else if (findUserByUsername(formData.username))
//       newErrors.username = 'Username already exists';

//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = 'Email is invalid';
//     else if (findUserByEmail(formData.email))
//       newErrors.email = 'Email already registered';

//     if (!formData.password) newErrors.password = 'Password is required';
//     else if (formData.password.length < 6)
//       newErrors.password = 'Password must be at least 6 characters';

//     if (!formData.confirmPassword)
//       newErrors.confirmPassword = 'Please confirm your password';
//     else if (formData.password !== formData.confirmPassword)
//       newErrors.confirmPassword = 'Passwords do not match';

//     if (!formData.agreeToTerms)
//       newErrors.agreeToTerms =
//         'You must agree to the terms and conditions';

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formErrors = validateForm();

//     if (Object.keys(formErrors).length === 0) {
//       setIsSubmitting(true);
//       setApiError('');
//       try {
//         const payload = {
//           username: formData.username,
//           email: formData.email,
//           password: formData.password
//         };
//         await createUserWithAPI(payload);
//         addUser(payload);

//         setIsSubmitting(false);
//         setShowSuccess(true);
//         setShowSuccessModal(true);
//         setFormData({
//           username: '',
//           email: '',
//           password: '',
//           confirmPassword: '',
//           agreeToTerms: false
//         });
//       } catch (err) {
//         setApiError('Failed to create account. Please try again.');
//         setIsSubmitting(false);
//         addUser({
//           username: formData.username,
//           email: formData.email,
//           password: formData.password
//         });
//       }
//     } else {
//       setErrors(formErrors);
//     }
//   };

//   const handleCloseSuccessModal = () => {
//     setShowSuccessModal(false);
//     navigate('/signin');
//   };

//   const RequiredField = () => <span className="text-danger">*</span>;

//   // ---- Robot head rotation ----
//   useEffect(() => {
//     const handleMove = (e) => {
//       if (!headRef.current || !robotWrapperRef.current) return;

//       const rect = robotWrapperRef.current.getBoundingClientRect();
//       const centerX = rect.left + rect.width / 2;
//       const centerY = rect.top + rect.height / 2;

//       const dx = (e.clientX - centerX) / (rect.width / 2);
//       const dy = (e.clientY - centerY) / (rect.height / 2);

//       const clampedX = Math.max(-0.4, Math.min(0.4, dx));
//       const clampedY = Math.max(-0.4, Math.min(0.4, dy));

//       headRef.current.style.transform = `
//         translateX(-50%)
//         translateY(${clampedY * 10}px)
//         rotateY(${clampedX * 30}deg)
//         rotateX(${clampedY * -25}deg)
//       `;
//     };

//     window.addEventListener('mousemove', handleMove);
//     return () => window.removeEventListener('mousemove', handleMove);
//   }, []);

//   // ---- Typewriter effect for bubble ----
//   useEffect(() => {
//     let index = 0;
//     setDisplayedMessage('');
//     const interval = setInterval(() => {
//       if (index < fullMessage.length) {
//         setDisplayedMessage((prev) => prev + fullMessage[index]);
//         index += 1;
//       } else {
//         clearInterval(interval);
//       }
//     }, 45); // speed
//     return () => clearInterval(interval);
//   }, [fullMessage]);

//   return (
//     <div
//       className="signup-page"
//       style={{
//         minHeight: '100vh',
//         position: 'relative',
//         overflow: 'hidden',
//         background:
//           'radial-gradient(circle at top, #151421 0, #050509 55%, #000000 100%)',
//         color: '#e5e7eb'
//       }}
//     >
//       {/* Background "Front" / "End" text */}
//       <div
//         style={{
//           position: 'fixed',
//           inset: 0,
//           zIndex: -1,
//           pointerEvents: 'none'
//         }}
//       >
//         <div
//           style={{
//             position: 'absolute',
//             left: '8%',
//             top: '18%',
//             fontSize: '4.5rem',
//             fontWeight: 500,
//             color: 'rgba(255,255,255,0.08)',
//             letterSpacing: '0.08em'
//           }}
//         >
//           Front
//         </div>
//         <div
//           style={{
//             position: 'absolute',
//             right: '8%',
//             top: '26%',
//             fontSize: '4.5rem',
//             fontWeight: 600,
//             color: 'rgba(138, 92, 246, 0.35)',
//             letterSpacing: '0.08em'
//           }}
//         >
//           End
//         </div>
//       </div>

//       <Container fluid className="py-5 position-relative">
//         <Row className="justify-content-center align-items-center min-vh-100">
//           {/* Form column */}
//           <Col lg={5} md={10} className="mb-4 mb-lg-0">
//             <Card className="border-0 shadow-lg pro-glass-card">
//               <Card.Body className="p-5">
//                 <div className="text-center mb-5">
//                   <h1 className="pro-title mb-2">Create Account</h1>
//                   <div className="required-note">
//                     Fields marked with <RequiredField /> are required.
//                   </div>
//                 </div>

//                 {showSuccess && (
//                   <Alert variant="success" className="pro-alert mb-4">
//                     Account created successfully.
//                   </Alert>
//                 )}

//                 {apiError && (
//                   <Alert variant="danger" className="pro-alert mb-4">
//                     {apiError}
//                   </Alert>
//                 )}

//                 <Form onSubmit={handleSubmit} noValidate>
//                   <Form.Group className="mb-4">
//                     <Form.Label className="pro-label">
//                       Username <RequiredField />
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="username"
//                       value={formData.username}
//                       onChange={handleChange}
//                       placeholder="Enter your username"
//                       className="pro-input"
//                       isInvalid={!!errors.username}
//                       required
//                     />
//                     <Form.Control.Feedback
//                       type="invalid"
//                       className="d-block text-danger mt-1"
//                     >
//                       {errors.username}
//                     </Form.Control.Feedback>
//                   </Form.Group>

//                   <Form.Group className="mb-4">
//                     <Form.Label className="pro-label">
//                       Email Address <RequiredField />
//                     </Form.Label>
//                     <Form.Control
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="Enter your email"
//                       className="pro-input"
//                       isInvalid={!!errors.email}
//                       required
//                     />
//                     <Form.Control.Feedback
//                       type="invalid"
//                       className="d-block text-danger mt-1"
//                     >
//                       {errors.email}
//                     </Form.Control.Feedback>
//                   </Form.Group>

//                   <Form.Group className="mb-4">
//                     <Form.Label className="pro-label">
//                       Password <RequiredField />
//                     </Form.Label>
//                     <InputGroup>
//                       <Form.Control
//                         type={showPassword ? 'text' : 'password'}
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         placeholder="Enter your password"
//                         className="pro-input"
//                         isInvalid={!!errors.password}
//                         required
//                       />
//                       <InputGroup.Text className="pro-input-addon">
//                         <i
//                           className={`bi ${
//                             showPassword ? 'bi-eye-slash' : 'bi-eye'
//                           }`}
//                           style={{ cursor: 'pointer', color: '#9da4b0' }}
//                           onClick={togglePasswordVisibility}
//                         />
//                       </InputGroup.Text>
//                     </InputGroup>
//                     <Form.Text className="pro-helper-text">
//                       Minimum 6 characters required.
//                     </Form.Text>
//                     <Form.Control.Feedback
//                       type="invalid"
//                       className="d-block text-danger mt-1"
//                     >
//                       {errors.password}
//                     </Form.Control.Feedback>
//                   </Form.Group>

//                   <Form.Group className="mb-4">
//                     <Form.Label className="pro-label">
//                       Confirm Password <RequiredField />
//                     </Form.Label>
//                     <InputGroup>
//                       <Form.Control
//                         type={showConfirmPassword ? 'text' : 'password'}
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         placeholder="Confirm your password"
//                         className="pro-input"
//                         isInvalid={!!errors.confirmPassword}
//                         required
//                       />
//                       <InputGroup.Text className="pro-input-addon">
//                         <i
//                           className={`bi ${
//                             showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'
//                           }`}
//                           style={{ cursor: 'pointer', color: '#9da4b0' }}
//                           onClick={toggleConfirmPasswordVisibility}
//                         />
//                       </InputGroup.Text>
//                     </InputGroup>
//                     <Form.Control.Feedback
//                       type="invalid"
//                       className="d-block text-danger mt-1"
//                     >
//                       {errors.confirmPassword}
//                     </Form.Control.Feedback>
//                   </Form.Group>

//                   <Form.Group className="mb-4">
//                     <Form.Check
//                       type="checkbox"
//                       name="agreeToTerms"
//                       checked={formData.agreeToTerms}
//                       onChange={handleChange}
//                       label="I agree to the Terms and Conditions."
//                       className="pro-checkbox"
//                     />
//                     <Form.Control.Feedback
//                       type="invalid"
//                       className="d-block text-danger mt-1"
//                     >
//                       {errors.agreeToTerms}
//                     </Form.Control.Feedback>
//                   </Form.Group>

//                   <Button
//                     variant="primary"
//                     type="submit"
//                     className="w-100 pro-btn mb-4"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" />
//                         Creating Account...
//                       </>
//                     ) : (
//                       'Create Account'
//                     )}
//                   </Button>
//                 </Form>

//                 <div className="text-center">
//                   <p className="pro-footer-text">
//                     Already have an account?{' '}
//                     <a href="/signin" className="pro-link">
//                       Sign In
//                     </a>
//                   </p>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>

//           {/* Robot column */}
//           <Col
//             lg={4}
//             md={8}
//             className="d-none d-lg-flex justify-content-center position-relative"
//           >
//             <div
//               ref={robotWrapperRef}
//               style={{
//                 width: 320,
//                 height: 360,
//                 position: 'relative',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 perspective: '900px'
//               }}
//             >
//               {/* Base shadow */}
//               <div
//                 style={{
//                   position: 'absolute',
//                   bottom: 15,
//                   width: 220,
//                   height: 30,
//                   borderRadius: '50%',
//                   background:
//                     'radial-gradient(circle, rgba(0,0,0,0.8) 0, transparent 70%)',
//                   filter: 'blur(10px)',
//                   opacity: 0.9
//                 }}
//               />

//               {/* Three‑step base */}
//               <div
//                 style={{
//                   position: 'absolute',
//                   bottom: 40,
//                   width: 220,
//                   height: 80,
//                   borderRadius: 18,
//                   background: 'linear-gradient(135deg, #050509, #141320)',
//                   boxShadow:
//                     '0 18px 45px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04)',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center'
//                 }}
//               >
//                 <div
//                   style={{
//                     width: 170,
//                     height: 55,
//                     borderRadius: 16,
//                     background: 'linear-gradient(135deg, #080714, #211b35)',
//                     boxShadow:
//                       '0 14px 30px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center'
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: 120,
//                       height: 40,
//                       borderRadius: 12,
//                       background: 'linear-gradient(135deg, #0e0c18, #2b2342)',
//                       boxShadow:
//                         '0 10px 22px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.05)'
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Neck + joint */}
//               <div
//                 style={{
//                   position: 'absolute',
//                   bottom: 140,
//                   width: 26,
//                   height: 55,
//                   borderRadius: 20,
//                   background: 'linear-gradient(180deg, #5b44e0, #1b123e)',
//                   boxShadow: '0 8px 18px rgba(0,0,0,0.8)'
//                 }}
//               />
//               <div
//                 style={{
//                   position: 'absolute',
//                   bottom: 140,
//                   width: 38,
//                   height: 18,
//                   borderRadius: 14,
//                   background: 'linear-gradient(90deg, #191624, #0b0a11)',
//                   boxShadow: '0 6px 14px rgba(0,0,0,0.9)'
//                 }}
//               />

//               {/* Head (rotating) */}
//               <div
//                 ref={headRef}
//                 style={{
//                   position: 'absolute',
//                   bottom: 200,
//                   left: '50%',
//                   transform: 'translateX(-50%)',
//                   width: 170,
//                   height: 90,
//                   borderRadius: 18,
//                   background: 'linear-gradient(135deg, #050509, #151324)',
//                   boxShadow:
//                     '0 22px 40px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05)',
//                   transformStyle: 'preserve-3d',
//                   transition: 'transform 0.1s ease-out'
//                 }}
//               >
//                 {/* Thin gray antennas with front/back rocking (Y-axis rotation) */}
//                 <div
//                   className="antenna antenna-left"
//                   style={{
//                     position: 'absolute',
//                     top: -45,
//                     left: '30%',
//                     width: 4,
//                     height: 40,
//                     borderRadius: 4,
//                     background:
//                       'linear-gradient(180deg, #e5e7eb, #9ca3af)',
//                     transformOrigin: 'bottom center',
//                     zIndex: 1
//                   }}
//                 >
//                   <div
//                     style={{
//                       position: 'absolute',
//                       top: -10,
//                       left: '50%',
//                       transform: 'translateX(-50%)',
//                       width: 12,
//                       height: 12,
//                       borderRadius: '50%',
//                       background:
//                         'radial-gradient(circle, #f3f4f6, #9ca3af)',
//                       boxShadow: '0 0 8px rgba(156,163,175,0.9)'
//                     }}
//                   />
//                 </div>

//                 <div
//                   className="antenna antenna-right"
//                   style={{
//                     position: 'absolute',
//                     top: -45,
//                     left: '70%',
//                     width: 4,
//                     height: 40,
//                     borderRadius: 4,
//                     background:
//                       'linear-gradient(180deg, #e5e7eb, #9ca3af)',
//                     transformOrigin: 'bottom center',
//                     zIndex: 1
//                   }}
//                 >
//                   <div
//                     style={{
//                       position: 'absolute',
//                       top: -10,
//                       left: '50%',
//                       transform: 'translateX(-50%)',
//                       width: 12,
//                       height: 12,
//                       borderRadius: '50%',
//                       background:
//                         'radial-gradient(circle, #f3f4f6, #9ca3af)',
//                       boxShadow: '0 0 8px rgba(156,163,175,0.9)'
//                     }}
//                   />
//                 </div>

//                 {/* Head side thickness */}
//                 <div
//                   style={{
//                     position: 'absolute',
//                     right: -18,
//                     top: 10,
//                     width: 18,
//                     height: 70,
//                     borderRadius: '0 18px 18px 0',
//                     background: 'linear-gradient(90deg, #090812, #1d182e)',
//                     boxShadow: '-6px 0 16px rgba(0,0,0,0.9)'
//                   }}
//                 />

//                 {/* Face panel */}
//                 <div
//                   style={{
//                     position: 'absolute',
//                     inset: 14,
//                     borderRadius: 14,
//                     background:
//                       'radial-gradient(circle at 0% 0%, #262238 0, #050509 65%)',
//                     boxShadow: 'inset 0 0 18px rgba(0,0,0,0.85)'
//                   }}
//                 >
//                   {/* Left eye */}
//                   <div
//                     style={{
//                       position: 'absolute',
//                       top: 26,
//                       left: 38,
//                       width: 22,
//                       height: 22,
//                       borderRadius: '50%',
//                       background:
//                         'radial-gradient(circle at 30% 30%, #ffb6d9 0, #f973a6 35%, #d946ef 80%)',
//                       boxShadow:
//                         '0 0 12px rgba(248,113,150,0.9), 0 0 24px rgba(236,72,153,0.8)'
//                     }}
//                   />
//                   {/* Right eye */}
//                   <div
//                     style={{
//                       position: 'absolute',
//                       top: 26,
//                       right: 38,
//                       width: 22,
//                       height: 22,
//                       borderRadius: '50%',
//                       background:
//                         'radial-gradient(circle at 30% 30%, #ffb6d9 0, #f973a6 35%, #d946ef 80%)',
//                       boxShadow:
//                         '0 0 12px rgba(248,113,150,0.9), 0 0 24px rgba(236,72,153,0.8)'
//                     }}
//                   />

//                   {/* Subtle mouth bar */}
//                   <div
//                     style={{
//                       position: 'absolute',
//                       bottom: 20,
//                       left: '50%',
//                       transform: 'translateX(-50%)',
//                       width: 54,
//                       height: 6,
//                       borderRadius: 10,
//                       background:
//                         'linear-gradient(90deg, rgba(148,163,184,0.15), rgba(148,163,184,0.5), rgba(148,163,184,0.15))',
//                       boxShadow: '0 0 10px rgba(148,163,184,0.5)'
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Speech bubble with sharp bottom-left corner */}
//               <div
//                 style={{
//                   position: 'absolute',
//                   left: 'calc(100% - 20px)',
//                   top: 30,
//                   marginLeft: 0,
//                   width: '280px',
//                   color: '#1f2937',
//                   fontSize: '0.9rem',
//                   lineHeight: 1.4,
//                   padding: '12px 16px',
//                   borderRadius: '20px 20px 20px 4px',
//                   background: '#ffffff',
//                   boxShadow: '0 16px 40px rgba(0,0,0,0.9)',
//                   border: '1px solid rgba(148,163,184,0.2)',
//                   whiteSpace: 'normal',
//                   wordWrap: 'break-word',
//                   zIndex: 10
//                 }}
//               >
//                 {displayedMessage}
//                 {/* Speech bubble pointer */}
//                 <div
//                   style={{
//                     position: 'absolute',
//                     left: '-10px',
//                     bottom: '0px',
//                     width: '0',
//                     height: '0',
//                     borderTop: '10px solid transparent',
//                     borderBottom: '10px solid transparent',
//                     borderRight: '10px solid #ffffff',
//                     filter: 'drop-shadow(-2px 2px 1px rgba(0,0,0,0.1))'
//                   }}
//                 />
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>

//       {/* Success Modal */}
//       <Modal
//         show={showSuccessModal}
//         onHide={handleCloseSuccessModal}
//         centered
//         size="md"
//       >
//         <Modal.Header closeButton className="border-0 pro-modal-header">
//           <Modal.Title className="w-100 text-center">
//             Account Created
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="text-center py-4">
//           <div className="mb-4">
//             <i className="bi bi-check-circle-fill pro-success-icon" />
//           </div>
//           <h4 className="mb-3 fw-bold pro-success-title">Success</h4>
//           <p className="text-muted">
//             Your account has been created successfully. You can now sign in.
//           </p>
//         </Modal.Body>
//         <Modal.Footer className="border-0 justify-content-center">
//           <Button className="pro-modal-btn px-4" onClick={handleCloseSuccessModal}>
//             Continue to Login
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <style jsx>{`
//         @keyframes shadowPulse {
//           0%, 100% { transform: scale(1); opacity: 0.8; }
//           50% { transform: scale(1.05); opacity: 1; }
//         }

//         /* Front/back rocking animation (Y-axis rotation) */
//         @keyframes antennaFrontBackLeft {
//           0% { transform: rotateY(0deg) translateZ(0px); }
//           50% { transform: rotateY(30deg) translateZ(5px); }
//           100% { transform: rotateY(0deg) translateZ(0px); }
//         }
        
//         @keyframes antennaFrontBackRight {
//           0% { transform: rotateY(0deg) translateZ(0px); }
//           50% { transform: rotateY(-30deg) translateZ(5px); }
//           100% { transform: rotateY(0deg) translateZ(0px); }
//         }

//         .antenna-left {
//           animation: antennaFrontBackLeft 1.5s ease-in-out infinite;
//         }
//         .antenna-right {
//           animation: antennaFrontBackRight 1.5s ease-in-out infinite;
//         }

//         .pro-glass-card {
//           background: rgba(15, 23, 42, 0.96) !important;
//           backdrop-filter: blur(28px);
//           border-radius: 20px;
//           border: 1px solid rgba(148, 163, 184, 0.15) !important;
//           box-shadow: 0 32px 90px rgba(0, 0, 0, 0.7);
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }
//         .pro-glass-card:hover {
//           transform: translateY(-6px);
//           box-shadow: 0 40px 110px rgba(0, 0, 0, 0.9);
//         }
//         .pro-title {
//           font-size: 2.6rem;
//           font-weight: 800;
//           letter-spacing: -0.03em;
//           background: linear-gradient(135deg, #f9fafb, #9ca3af);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }
//         .required-note {
//           color: rgba(148, 163, 184, 0.9);
//           font-size: 0.85rem;
//         }
//         .pro-label {
//           color: #e5e7eb;
//           font-weight: 600;
//           font-size: 0.95rem;
//         }
//         .pro-input {
//           background: rgba(15, 23, 42, 0.95) !important;
//           border-radius: 14px;
//           border: 1px solid rgba(55, 65, 81, 0.9) !important;
//           color: #e5e7eb !important;
//           padding: 0.9rem 1.1rem;
//           font-size: 0.97rem;
//           height: 56px;
//           box-shadow: 0 2px 10px rgba(15, 23, 42, 0.9);
//         }
//         .pro-input:focus {
//           background: rgba(15, 23, 42, 1) !important;
//           border-color: rgba(129, 140, 248, 0.95) !important;
//           box-shadow:
//             0 0 0 3px rgba(129, 140, 248, 0.35),
//             0 6px 22px rgba(15, 23, 42, 1) !important;
//         }
//         .pro-input::placeholder {
//           color: rgba(148, 163, 184, 0.7) !important;
//         }
//         .pro-input-addon {
//           background: rgba(15, 23, 42, 0.95) !important;
//           border-radius: 0 14px 14px 0 !important;
//           border: 1px solid rgba(55, 65, 81, 0.9) !important;
//           border-left: none !important;
//         }
//         .pro-helper-text {
//           color: rgba(148, 163, 184, 0.9) !important;
//           font-size: 0.8rem;
//         }
//         .pro-btn {
//           background: linear-gradient(135deg, #4f46e5, #7c3aed) !important;
//           border-radius: 14px;
//           border: none !important;
//           font-weight: 700;
//           letter-spacing: 0.08em;
//           font-size: 0.95rem;
//           text-transform: uppercase;
//           box-shadow: 0 16px 40px rgba(124, 58, 237, 0.7);
//         }
//         .pro-btn:hover:not(:disabled) {
//           transform: translateY(-3px);
//           box-shadow: 0 24px 60px rgba(124, 58, 237, 0.9);
//         }
//         .pro-footer-text {
//           color: rgba(148, 163, 184, 0.95);
//           font-size: 0.9rem;
//         }
//         .pro-link {
//           color: #a855f7;
//           font-weight: 600;
//           text-decoration: none;
//         }
//         .pro-link:hover {
//           color: #c4b5fd;
//         }
//         .pro-alert {
//           background: rgba(22, 163, 74, 0.06) !important;
//           border-radius: 14px;
//           border: 1px solid rgba(34, 197, 94, 0.4) !important;
//           color: #bbf7d0 !important;
//         }
//         .pro-checkbox {
//           color: #ffffff;
//         }
//         .pro-checkbox .form-check-input:checked {
//           background-color: #4f46e5;
//           border-color: #4f46e5;
//         }
//         .pro-modal-header {
//           background: #020617;
//           color: #e5e7eb;
//         }
//         .pro-success-icon {
//           font-size: 3.4rem;
//           color: #22c55e;
//         }
//         .pro-success-title {
//           color: #e5e7eb;
//         }
//         .pro-modal-btn {
//           background: linear-gradient(135deg, #22c55e, #16a34a);
//           border-radius: 12px;
//           border: none;
//           font-weight: 600;
//         }
//         @media (max-width: 991.98px) {
//           .pro-title {
//             font-size: 2.2rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SignUp;




// import React, { useState, useRef, useEffect } from 'react';
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Card,
//   Alert,
//   Modal,
//   InputGroup
// } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     agreeToTerms: false
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [apiError, setApiError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isPasswordFocused, setIsPasswordFocused] = useState(false);
//   const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

//   // typewriter text for bubble
//   const [displayedMessage, setDisplayedMessage] = useState('');
//   const fullMessage = 'Please register to continue';

//   const navigate = useNavigate();
//   const headRef = useRef(null);
//   const robotWrapperRef = useRef(null);
//   const passwordRef = useRef(null);
//   const confirmPasswordRef = useRef(null);

//   // ---- API + local helpers ----
//   const createUserWithAPI = async (userData) => {
//     const response = await fetch('http://localhost:8080/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(userData)
//     });
//     if (!response.ok) throw new Error('Failed to create user');
//     return await response.json();
//   };

//   let users = [];
//   const addUser = (userData) => {
//     const newUser = {
//       id: Date.now(),
//       ...userData,
//       createdAt: new Date().toISOString()
//     };
//     users.push(newUser);
//     return newUser;
//   };
//   const findUserByUsername = (username) =>
//     users.find((user) => user.username === username);
//   const findUserByEmail = (email) =>
//     users.find((user) => user.email === email);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: '' }));
//     }
//     if (apiError) setApiError('');
//   };

//   const togglePasswordVisibility = () =>
//     setShowPassword((prev) => !prev);
//   const toggleConfirmPasswordVisibility = () =>
//     setShowConfirmPassword((prev) => !prev);

//   const handlePasswordFocus = () => setIsPasswordFocused(true);
//   const handlePasswordBlur = () => setIsPasswordFocused(false);
//   const handleConfirmPasswordFocus = () => setIsConfirmPasswordFocused(true);
//   const handleConfirmPasswordBlur = () => setIsConfirmPasswordFocused(false);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.username.trim()) newErrors.username = 'Username is required';
//     else if (formData.username.length < 3)
//       newErrors.username = 'Username must be at least 3 characters';
//     else if (findUserByUsername(formData.username))
//       newErrors.username = 'Username already exists';

//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = 'Email is invalid';
//     else if (findUserByEmail(formData.email))
//       newErrors.email = 'Email already registered';

//     if (!formData.password) newErrors.password = 'Password is required';
//     else if (formData.password.length < 6)
//       newErrors.password = 'Password must be at least 6 characters';

//     if (!formData.confirmPassword)
//       newErrors.confirmPassword = 'Please confirm your password';
//     else if (formData.password !== formData.confirmPassword)
//       newErrors.confirmPassword = 'Passwords do not match';

//     if (!formData.agreeToTerms)
//       newErrors.agreeToTerms =
//         'You must agree to the terms and conditions';

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formErrors = validateForm();

//     if (Object.keys(formErrors).length === 0) {
//       setIsSubmitting(true);
//       setApiError('');
//       try {
//         const payload = {
//           username: formData.username,
//           email: formData.email,
//           password: formData.password
//         };
//         await createUserWithAPI(payload);
//         addUser(payload);

//         setIsSubmitting(false);
//         setShowSuccess(true);
//         setShowSuccessModal(true);
//         setFormData({
//           username: '',
//           email: '',
//           password: '',
//           confirmPassword: '',
//           agreeToTerms: false
//         });
//       } catch (err) {
//         setApiError('Failed to create account. Please try again.');
//         setIsSubmitting(false);
//         addUser({
//           username: formData.username,
//           email: formData.email,
//           password: formData.password
//         });
//       }
//     } else {
//       setErrors(formErrors);
//     }
//   };

//   const handleCloseSuccessModal = () => {
//     setShowSuccessModal(false);
//     navigate('/');
//   };

//   const RequiredField = () => <span className="text-danger">*</span>;

//   // ---- Robot head rotation ----
//   useEffect(() => {
//     const handleMove = (e) => {
//       if (!headRef.current || !robotWrapperRef.current) return;

//       // Check if password fields are focused
//       if (isPasswordFocused || isConfirmPasswordFocused) {
//         // Rotate head to the right when password fields are focused
//         headRef.current.style.transform = `
//           translateX(-50%)
//           translateY(0px)
//           rotateY(25deg)
//           rotateX(0deg)
//         `;
//         return;
//       }

//       const rect = robotWrapperRef.current.getBoundingClientRect();
//       const centerX = rect.left + rect.width / 2;
//       const centerY = rect.top + rect.height / 2;

//       const dx = (e.clientX - centerX) / (rect.width / 2);
//       const dy = (e.clientY - centerY) / (rect.height / 2);

//       const clampedX = Math.max(-0.4, Math.min(0.4, dx));
//       const clampedY = Math.max(-0.4, Math.min(0.4, dy));

//       headRef.current.style.transform = `
//         translateX(-50%)
//         translateY(${clampedY * 10}px)
//         rotateY(${clampedX * 30}deg)
//         rotateX(${clampedY * -25}deg)
//       `;
//     };

//     window.addEventListener('mousemove', handleMove);
//     return () => window.removeEventListener('mousemove', handleMove);
//   }, [isPasswordFocused, isConfirmPasswordFocused]);

//   // ---- Typewriter effect for bubble ----
//   useEffect(() => {
//     // Reset displayed message
//     setDisplayedMessage('');
    
//     // Ensure fullMessage is a valid string
//     if (!fullMessage || typeof fullMessage !== 'string') {
//       return;
//     }
    
//     let index = 0;
//     const interval = setInterval(() => {
//       // Check if we've reached the end
//       if (index >= fullMessage.length) {
//         clearInterval(interval);
//         return;
//       }
      
//       // Safely get the character
//       const char = fullMessage.charAt(index);
//       if (char) {
//         setDisplayedMessage((prev) => prev + char);
//         index += 1;
//       } else {
//         clearInterval(interval);
//       }
//     }, 45);
    
//     return () => clearInterval(interval);
//   }, [fullMessage]);

//   return (
//     <div
//       className="signup-page"
//       style={{
//         minHeight: '100vh',
//         height: '100vh',
//         position: 'relative',
//         overflow: 'hidden',
//         background:
//           'radial-gradient(circle at top, #151421 0, #050509 55%, #000000 100%)',
//         color: '#e5e7eb'
//       }}
//     >
//       {/* Background "Front" / "End" text */}
//       <div
//         style={{
//           position: 'fixed',
//           inset: 0,
//           zIndex: -1,
//           pointerEvents: 'none'
//         }}
//       >
//         <div
//           style={{
//             position: 'absolute',
//             left: '8%',
//             top: '10%',
//             fontSize: '3.5rem',
//             fontWeight: 500,
//             color: 'rgba(255,255,255,0.08)',
//             letterSpacing: '0.08em'
//           }}
//         >
//           Front
//         </div>
//         <div
//           style={{
//             position: 'absolute',
//             right: '8%',
//             top: '18%',
//             fontSize: '3.5rem',
//             fontWeight: 600,
//             color: 'rgba(138, 92, 246, 0.35)',
//             letterSpacing: '0.08em'
//           }}
//         >
//           End
//         </div>
//       </div>

//       <Container fluid className="p-0 h-100 position-relative">
//         <Row className="h-100 align-items-center justify-content-center mx-0">
//           {/* Form column */}
//           <Col lg={4} md={8} sm={10} xs={12} className="px-3 py-3">
//             <Card className="border-0 shadow-lg pro-glass-card">
//               <Card.Body className="p-4">
//                 <div className="text-center mb-0">
//                   <h1 className="pro-title mb-2">Create Account</h1>
//                   <div className="required-note">
//                     Fields marked with <RequiredField /> are required.
//                   </div>
//                 </div>

//                 {showSuccess && (
//                   <Alert variant="success" className="pro-alert mb-2">
//                     Account created successfully.
//                   </Alert>
//                 )}

//                 {apiError && (
//                   <Alert variant="danger" className="pro-alert mb-32">
//                     {apiError}
//                   </Alert>
//                 )}

//                 <Form onSubmit={handleSubmit} noValidate>
//                   <Form.Group className="mb-2">
//                     <Form.Label className="pro-label">
//                       Username <RequiredField />
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="username"
//                       value={formData.username}
//                       onChange={handleChange}
//                       placeholder="Enter username"
//                       className="pro-input"
//                       isInvalid={!!errors.username}
//                       required
//                     />
//                     <Form.Control.Feedback
//                       type="invalid"
//                       className="d-block text-danger mt-1"
//                     >
//                       {errors.username}
//                     </Form.Control.Feedback>
//                   </Form.Group>

//                   <Form.Group className="mb-2">
//                     <Form.Label className="pro-label">
//                       Email <RequiredField />
//                     </Form.Label>
//                     <Form.Control
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="Enter email"
//                       className="pro-input"
//                       isInvalid={!!errors.email}
//                       required
//                     />
//                     <Form.Control.Feedback
//                       type="invalid"
//                       className="d-block text-danger mt-1"
//                     >
//                       {errors.email}
//                     </Form.Control.Feedback>
//                   </Form.Group>

//                   <Form.Group className="mb-2">
//                     <Form.Label className="pro-label">
//                       Password <RequiredField />
//                     </Form.Label>
//                     <InputGroup>
//                       <Form.Control
//                         ref={passwordRef}
//                         type={showPassword ? 'text' : 'password'}
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         onFocus={handlePasswordFocus}
//                         onBlur={handlePasswordBlur}
//                         placeholder="Enter password"
//                         className="pro-input"
//                         isInvalid={!!errors.password}
//                         required
//                       />
//                       <InputGroup.Text className="pro-input-addon">
//                         <i
//                           className={`bi ${
//                             showPassword ? 'bi-eye-slash' : 'bi-eye'
//                           }`}
//                           style={{ cursor: 'pointer', color: '#9da4b0' }}
//                           onClick={togglePasswordVisibility}
//                         />
//                       </InputGroup.Text>
//                     </InputGroup>
//                     <Form.Text className="pro-helper-text">
//                       Minimum 6 characters
//                     </Form.Text>
//                     <Form.Control.Feedback
//                       type="invalid"
//                       className="d-block text-danger mt-1"
//                     >
//                       {errors.password}
//                     </Form.Control.Feedback>
//                   </Form.Group>

//                   <Form.Group className="mb-2">
//                     <Form.Label className="pro-label">
//                       Confirm Password <RequiredField />
//                     </Form.Label>
//                     <InputGroup>
//                       <Form.Control
//                         ref={confirmPasswordRef}
//                         type={showConfirmPassword ? 'text' : 'password'}
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         onFocus={handleConfirmPasswordFocus}
//                         onBlur={handleConfirmPasswordBlur}
//                         placeholder="Confirm password"
//                         className="pro-input"
//                         isInvalid={!!errors.confirmPassword}
//                         required
//                       />
//                       <InputGroup.Text className="pro-input-addon">
//                         <i
//                           className={`bi ${
//                             showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'
//                           }`}
//                           style={{ cursor: 'pointer', color: '#9da4b0' }}
//                           onClick={toggleConfirmPasswordVisibility}
//                         />
//                       </InputGroup.Text>
//                     </InputGroup>
//                     <Form.Control.Feedback
//                       type="invalid"
//                       className="d-block text-danger mt-1"
//                     >
//                       {errors.confirmPassword}
//                     </Form.Control.Feedback>
//                   </Form.Group>

//                   <Form.Group className="mb-2">
//                     <Form.Check
//                       type="checkbox"
//                       name="agreeToTerms"
//                       checked={formData.agreeToTerms}
//                       onChange={handleChange}
//                       label="I agree to the Terms and Conditions."
//                       className="pro-checkbox"
//                     />
//                     <Form.Control.Feedback
//                       type="invalid"
//                       className="d-block text-danger mt-1"
//                     >
//                       {errors.agreeToTerms}
//                     </Form.Control.Feedback>
//                   </Form.Group>

//                   <Button
//                     variant="primary"
//                     type="submit"
//                     className="w-100 pro-btn mb-2"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" />
//                         Creating Account...
//                       </>
//                     ) : (
//                       'Create Account'
//                     )}
//                   </Button>
//                 </Form>

//                 <div className="text-center pt-2">
//                   <p className="pro-footer-text">
//                     Already have an account?{' '}
//                     <a href="/" className="pro-link">
//                       Sign In
//                     </a>
//                   </p>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>

//           {/* Robot column - Only show on large screens */}
//           <Col
//             lg={4}
//             className="d-none d-lg-flex justify-content-center align-items-center position-relative"
//           >
//             <div
//               ref={robotWrapperRef}
//               style={{
//                 width: 280,
//                 height: 320,
//                 position: 'relative',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 perspective: '900px'
//               }}
//             >
//               {/* Base shadow */}
//               <div
//                 style={{
//                   position: 'absolute',
//                   bottom: 15,
//                   width: 200,
//                   height: 25,
//                   borderRadius: '50%',
//                   background:
//                     'radial-gradient(circle, rgba(0,0,0,0.8) 0, transparent 70%)',
//                   filter: 'blur(10px)',
//                   opacity: 0.9
//                 }}
//               />

//               {/* Three‑step base */}
//               <div
//                 style={{
//                   position: 'absolute',
//                   bottom: 40,
//                   width: 200,
//                   height: 70,
//                   borderRadius: 16,
//                   background: 'linear-gradient(135deg, #050509, #141320)',
//                   boxShadow:
//                     '0 18px 45px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04)',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center'
//                 }}
//               >
//                 <div
//                   style={{
//                     width: 150,
//                     height: 50,
//                     borderRadius: 14,
//                     background: 'linear-gradient(135deg, #080714, #211b35)',
//                     boxShadow:
//                       '0 14px 30px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center'
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: 110,
//                       height: 35,
//                       borderRadius: 10,
//                       background: 'linear-gradient(135deg, #0e0c18, #2b2342)',
//                       boxShadow:
//                         '0 10px 22px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.05)'
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Neck + joint */}
//               <div
//                 style={{
//                   position: 'absolute',
//                   bottom: 120,
//                   width: 24,
//                   height: 50,
//                   borderRadius: 18,
//                   background: 'linear-gradient(180deg, #5b44e0, #1b123e)',
//                   boxShadow: '0 8px 18px rgba(0,0,0,0.8)'
//                 }}
//               />
//               <div
//                 style={{
//                   position: 'absolute',
//                   bottom: 120,
//                   width: 34,
//                   height: 16,
//                   borderRadius: 12,
//                   background: 'linear-gradient(90deg, #191624, #0b0a11)',
//                   boxShadow: '0 6px 14px rgba(0,0,0,0.9)'
//                 }}
//               />

//               {/* Head (rotating) */}
//               <div
//                 ref={headRef}
//                 style={{
//                   position: 'absolute',
//                   bottom: 180,
//                   left: '50%',
//                   transform: 'translateX(-50%)',
//                   width: 150,
//                   height: 80,
//                   borderRadius: 16,
//                   background: 'linear-gradient(135deg, #050509, #151324)',
//                   boxShadow:
//                     '0 22px 40px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05)',
//                   transformStyle: 'preserve-3d',
//                   transition: 'transform 0.3s ease-out'
//                 }}
//               >
//                 {/* Left antenna */}
//                 <div
//                   className="antenna antenna-left"
//                   style={{
//                     position: 'absolute',
//                     top: -50,
//                     left: '30%',
//                     width: 4,
//                     height: 45,
//                     borderRadius: 4,
//                     background: 'linear-gradient(180deg, #e5e7eb, #9ca3af)',
//                     transformOrigin: 'bottom center',
//                     zIndex: 1
//                   }}
//                 >
//                   <div
//                     style={{
//                       position: 'absolute',
//                       top: -10,
//                       left: '50%',
//                       transform: 'translateX(-50%)',
//                       width: 10,
//                       height: 10,
//                       borderRadius: '50%',
//                       background:
//                         'radial-gradient(circle, #f3f4f6, #9ca3af)',
//                       boxShadow: '0 0 8px rgba(156,163,175,0.9)'
//                     }}
//                   />
//                 </div>

//                 {/* Right antenna */}
//                 <div
//                   className="antenna antenna-right"
//                   style={{
//                     position: 'absolute',
//                     top: -50,
//                     left: '70%',
//                     width: 4,
//                     height: 45,
//                     borderRadius: 4,
//                     background: 'linear-gradient(180deg, #e5e7eb, #9ca3af)',
//                     transformOrigin: 'bottom center',
//                     zIndex: 1
//                   }}
//                 >
//                   <div
//                     style={{
//                       position: 'absolute',
//                       top: -10,
//                       left: '50%',
//                       transform: 'translateX(-50%)',
//                       width: 10,
//                       height: 10,
//                       borderRadius: '50%',
//                       background:
//                         'radial-gradient(circle, #f3f4f6, #9ca3af)',
//                       boxShadow: '0 0 8px rgba(156,163,175,0.9)'
//                     }}
//                   />
//                 </div>

//                 {/* Head side thickness */}
//                 <div
//                   style={{
//                     position: 'absolute',
//                     right: -16,
//                     top: 8,
//                     width: 16,
//                     height: 60,
//                     borderRadius: '0 16px 16px 0',
//                     background: 'linear-gradient(90deg, #090812, #1d182e)',
//                     boxShadow: '-6px 0 16px rgba(0,0,0,0.9)'
//                   }}
//                 />

//                 {/* Face panel */}
//                 <div
//                   style={{
//                     position: 'absolute',
//                     inset: 12,
//                     borderRadius: 12,
//                     background:
//                       'radial-gradient(circle at 0% 0%, #262238 0, #050509 65%)',
//                     boxShadow: 'inset 0 0 18px rgba(0,0,0,0.85)'
//                   }}
//                 >
//                   {/* Left eye - closes when password fields are focused */}
//                   <div
//                     style={{
//                       position: 'absolute',
//                       top: 22,
//                       left: 32,
//                       width: 20,
//                       height: (isPasswordFocused || isConfirmPasswordFocused) ? '4px' : '20px',
//                       borderRadius: (isPasswordFocused || isConfirmPasswordFocused) ? '2px' : '50%',
//                       background: (isPasswordFocused || isConfirmPasswordFocused) 
//                         ? 'linear-gradient(90deg, #f973a6, #d946ef)'
//                         : 'radial-gradient(circle at 30% 30%, #ffb6d9 0, #f973a6 35%, #d946ef 80%)',
//                       boxShadow: (isPasswordFocused || isConfirmPasswordFocused)
//                         ? '0 0 8px rgba(248,113,150,0.7), 0 0 16px rgba(236,72,153,0.6)'
//                         : '0 0 12px rgba(248,113,150,0.9), 0 0 24px rgba(236,72,153,0.8)',
//                       transition: 'all 0.3s ease-out'
//                     }}
//                   />
//                   {/* Right eye - closes when password fields are focused */}
//                   <div
//                     style={{
//                       position: 'absolute',
//                       top: 22,
//                       right: 32,
//                       width: 20,
//                       height: (isPasswordFocused || isConfirmPasswordFocused) ? '4px' : '20px',
//                       borderRadius: (isPasswordFocused || isConfirmPasswordFocused) ? '2px' : '50%',
//                       background: (isPasswordFocused || isConfirmPasswordFocused) 
//                         ? 'linear-gradient(90deg, #f973a6, #d946ef)'
//                         : 'radial-gradient(circle at 30% 30%, #ffb6d9 0, #f973a6 35%, #d946ef 80%)',
//                       boxShadow: (isPasswordFocused || isConfirmPasswordFocused)
//                         ? '0 0 8px rgba(248,113,150,0.7), 0 0 16px rgba(236,72,153,0.6)'
//                         : '0 0 12px rgba(248,113,150,0.9), 0 0 24px rgba(236,72,153,0.8)',
//                       transition: 'all 0.3s ease-out'
//                     }}
//                   />

//                   {/* Subtle mouth bar */}
//                   <div
//                     style={{
//                       position: 'absolute',
//                       bottom: 16,
//                       left: '50%',
//                       transform: 'translateX(-50%)',
//                       width: 48,
//                       height: 5,
//                       borderRadius: 8,
//                       background:
//                         'linear-gradient(90deg, rgba(148,163,184,0.15), rgba(148,163,184,0.5), rgba(148,163,184,0.15))',
//                       boxShadow: '0 0 10px rgba(148,163,184,0.5)'
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Speech bubble */}
//               <div
//                 style={{
//                   position: 'absolute',
//                   left: 'calc(100% - 40px)',
//                   top: 60,
//                   marginLeft: 0,
//                   width: '220px',
//                   color: '#1f2937',
//                   fontSize: '0.85rem',
//                   lineHeight: 1.3,
//                   padding: '10px 14px',
//                   borderRadius: '16px 16px 16px 4px',
//                   background: '#ffffff',
//                   boxShadow: '0 12px 32px rgba(0,0,0,0.9)',
//                   border: '1px solid rgba(148,163,184,0.2)',
//                   whiteSpace: 'normal',
//                   wordWrap: 'break-word',
//                   zIndex: 10
//                 }}
//               >
//                 {displayedMessage || ''}
//                 {/* Speech bubble pointer */}
//                 <div
//                   style={{
//                     position: 'absolute',
//                     left: '-8px',
//                     bottom: '0px',
//                     width: '0',
//                     height: '0',
//                     borderTop: '8px solid transparent',
//                     borderBottom: '8px solid transparent',
//                     borderRight: '8px solid #ffffff',
//                     filter: 'drop-shadow(-2px 2px 1px rgba(0,0,0,0.1))'
//                   }}
//                 />
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>

//       {/* Success Modal */}
//       <Modal
//         show={showSuccessModal}
//         onHide={handleCloseSuccessModal}
//         centered
//         size="md"
//       >
//         <Modal.Header closeButton className="border-0 pro-modal-header">
//           <Modal.Title className="w-100 text-center">
//             Account Created
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="text-center py-4">
//           <div className="mb-4">
//             <i className="bi bi-check-circle-fill pro-success-icon" />
//           </div>
//           <h4 className="mb-3 fw-bold pro-success-title">Success</h4>
//           <p className="text-muted">
//             Your account has been created successfully. You can now sign in.
//           </p>
//         </Modal.Body>
//         <Modal.Footer className="border-0 justify-content-center">
//           <Button className="pro-modal-btn px-4" onClick={handleCloseSuccessModal}>
//             Continue to Login
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <style jsx>{`
//         @keyframes shadowPulse {
//           0%, 100% { transform: scale(1); opacity: 0.8; }
//           50% { transform: scale(1.05); opacity: 1; }
//         }

//         /* Left/right swinging animation for antennas */
//         @keyframes antennaSwingLeft {
//           0% { transform: rotateZ(0deg); }
//           25% { transform: rotateZ(15deg); }
//           50% { transform: rotateZ(0deg); }
//           75% { transform: rotateZ(-15deg); }
//           100% { transform: rotateZ(0deg); }
//         }
        
//         @keyframes antennaSwingRight {
//           0% { transform: rotateZ(0deg); }
//           25% { transform: rotateZ(-15deg); }
//           50% { transform: rotateZ(0deg); }
//           75% { transform: rotateZ(15deg); }
//           100% { transform: rotateZ(0deg); }
//         }

//         .antenna-left {
//           animation: antennaSwingLeft 2s ease-in-out infinite;
//         }
//         .antenna-right {
//           animation: antennaSwingRight 2s ease-in-out infinite;
//         }

//         .pro-glass-card {
//           background: rgba(15, 23, 42, 0.96) !important;
//           backdrop-filter: blur(28px);
//           border-radius: 16px;
//           border: 1px solid rgba(148, 163, 184, 0.15) !important;
//           box-shadow: 0 24px 64px rgba(0, 0, 0, 0.7);
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }
//         .pro-glass-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 32px 80px rgba(0, 0, 0, 0.9);
//         }
//         .pro-title {
//           font-size: 2.2rem;
//           font-weight: 800;
//           letter-spacing: -0.03em;
//           background: linear-gradient(135deg, #f9fafb, #9ca3af);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }
//         .required-note {
//           color: rgba(148, 163, 184, 0.9);
//           font-size: 0.8rem;
//         }
//         .pro-label {
//           color: #e5e7eb;
//           font-weight: 600;
//           font-size: 0.9rem;
//           margin-bottom: 0.3rem;
//         }
//         .pro-input {
//           background: rgba(15, 23, 42, 0.95) !important;
//           border-radius: 12px;
//           border: 1px solid rgba(55, 65, 81, 0.9) !important;
//           color: #e5e7eb !important;
//           padding: 0.7rem 1rem;
//           font-size: 0.92rem;
//           height: 48px;
//           box-shadow: 0 2px 8px rgba(15, 23, 42, 0.9);
//         }
//         .pro-input:focus {
//           background: rgba(15, 23, 42, 1) !important;
//           border-color: rgba(129, 140, 248, 0.95) !important;
//           box-shadow:
//             0 0 0 3px rgba(129, 140, 248, 0.35),
//             0 4px 16px rgba(15, 23, 42, 1) !important;
//         }
//         .pro-input::placeholder {
//           color: rgba(148, 163, 184, 0.7) !important;
//         }
//         .pro-input-addon {
//           background: rgba(15, 23, 42, 0.95) !important;
//           border-radius: 0 12px 12px 0 !important;
//           border: 1px solid rgba(55, 65, 81, 0.9) !important;
//           border-left: none !important;
//           padding: 0.7rem 1rem;
//         }
//         .pro-helper-text {
//           color: rgba(148, 163, 184, 0.9) !important;
//           font-size: 0.75rem;
//           margin-top: 0.25rem;
//         }
//         .pro-btn {
//           background: linear-gradient(135deg, #4f46e5, #7c3aed) !important;
//           border-radius: 12px;
//           border: none !important;
//           font-weight: 700;
//           letter-spacing: 0.08em;
//           font-size: 0.9rem;
//           text-transform: uppercase;
//           padding: 0.7rem;
//           box-shadow: 0 12px 32px rgba(124, 58, 237, 0.7);
//         }
//         .pro-btn:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 18px 48px rgba(124, 58, 237, 0.9);
//         }
//         .pro-footer-text {
//           color: rgba(148, 163, 184, 0.95);
//           font-size: 0.85rem;
//         }
//         .pro-link {
//           color: #a855f7;
//           font-weight: 600;
//           text-decoration: none;
//         }
//         .pro-link:hover {
//           color: #c4b5fd;
//         }
//         .pro-alert {
//           background: rgba(22, 163, 74, 0.06) !important;
//           border-radius: 12px;
//           border: 1px solid rgba(34, 197, 94, 0.4) !important;
//           color: #bbf7d0 !important;
//           padding: 0.75rem 1rem;
//           font-size: 0.85rem;
//         }
//         .pro-checkbox {
//           color: #ffffff;
//           font-size: 0.9rem;
//         }
//         .pro-checkbox .form-check-input:checked {
//           background-color: #4f46e5;
//           border-color: #4f46e5;
//         }
//         .pro-modal-header {
//           background: #020617;
//           color: #e5e7eb;
//         }
//         .pro-success-icon {
//           font-size: 3rem;
//           color: #22c55e;
//         }
//         .pro-success-title {
//           color: #e5e7eb;
//         }
//         .pro-modal-btn {
//           background: linear-gradient(135deg, #22c55e, #16a34a);
//           border-radius: 10px;
//           border: none;
//           font-weight: 600;
//           padding: 0.6rem 2rem;
//         }
//         @media (max-width: 991.98px) {
//           .pro-title {
//             font-size: 1.8rem;
//           }
//           .signup-page {
//             padding: 1rem;
//             height: auto;
//             min-height: 100vh;
//           }
//           .container-fluid {
//             padding: 1rem;
//           }
//         }
//         @media (max-width: 576px) {
//           .pro-title {
//             font-size: 1.6rem;
//           }
//           .pro-glass-card {
//             margin: 0.5rem;
//           }
//           .card-body {
//             padding: 1.5rem !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SignUp;






import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
  Modal,
  InputGroup
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  // typewriter text for bubble
  const [displayedMessage, setDisplayedMessage] = useState('');
  const fullMessage = 'Please register to continue';

  const navigate = useNavigate();
  const headRef = useRef(null);
  const robotWrapperRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // ---- API call ----
  const createUserWithAPI = async (userData) => {
    // Send to login endpoint with only email and password
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password
        // Don't send username for login endpoint
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to authenticate');
    }
    
    return await response.text(); // or response.json()
  };

  // Local storage for users (temporary)
  const [localUsers, setLocalUsers] = useState(() => {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : [];
  });

  const addUser = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    const updatedUsers = [...localUsers, newUser];
    setLocalUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    return newUser;
  };

  const findUserByUsername = (username) =>
    localUsers.find((user) => user.username === username);
  const findUserByEmail = (email) =>
    localUsers.find((user) => user.email === email);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (apiError) setApiError('');
  };

  const togglePasswordVisibility = () =>
    setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const handlePasswordFocus = () => setIsPasswordFocused(true);
  const handlePasswordBlur = () => setIsPasswordFocused(false);
  const handleConfirmPasswordFocus = () => setIsConfirmPasswordFocused(true);
  const handleConfirmPasswordBlur = () => setIsConfirmPasswordFocused(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = 'Username is required';
    else if (formData.username.length < 3)
      newErrors.username = 'Username must be at least 3 characters';
    else if (findUserByUsername(formData.username))
      newErrors.username = 'Username already exists';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid';
    else if (findUserByEmail(formData.email))
      newErrors.email = 'Email already registered';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    if (!formData.confirmPassword)
      newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    if (!formData.agreeToTerms)
      newErrors.agreeToTerms =
        'You must agree to the terms and conditions';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      setApiError('');
      try {
        const payload = {
          username: formData.username,
          email: formData.email,
          password: formData.password
        };
        
        // Try API first, fallback to local
        try {
          await createUserWithAPI(payload);
        } catch (apiErr) {
          console.warn('API failed, using local storage:', apiErr.message);
          // Continue with local storage if API fails
        }
        
        addUser(payload);

        setIsSubmitting(false);
        setShowSuccess(true);
        setShowSuccessModal(true);
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          agreeToTerms: false
        });
      } catch (err) {
        console.error('Error:', err);
        setApiError(err.message || 'Failed to create account. Please try again.');
        setIsSubmitting(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  const RequiredField = () => <span className="text-danger">*</span>;

  // ---- Robot head rotation ----
  useEffect(() => {
    const handleMove = (e) => {
      if (!headRef.current || !robotWrapperRef.current) return;

      // Check if password fields are focused
      if (isPasswordFocused || isConfirmPasswordFocused) {
        // Rotate head to the right when password fields are focused
        headRef.current.style.transform = `
          translateX(-50%)
          translateY(0px)
          rotateY(25deg)
          rotateX(0deg)
        `;
        return;
      }

      const rect = robotWrapperRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = (e.clientX - centerX) / (rect.width / 2);
      const dy = (e.clientY - centerY) / (rect.height / 2);

      const clampedX = Math.max(-0.4, Math.min(0.4, dx));
      const clampedY = Math.max(-0.4, Math.min(0.4, dy));

      headRef.current.style.transform = `
        translateX(-50%)
        translateY(${clampedY * 10}px)
        rotateY(${clampedX * 30}deg)
        rotateX(${clampedY * -25}deg)
      `;
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isPasswordFocused, isConfirmPasswordFocused]);

  // ---- Typewriter effect for bubble ----
  useEffect(() => {
    // Reset displayed message
    setDisplayedMessage('');
    
    // Ensure fullMessage is a valid string
    if (!fullMessage || typeof fullMessage !== 'string') {
      return;
    }
    
    let index = 0;
    const interval = setInterval(() => {
      // Check if we've reached the end
      if (index >= fullMessage.length) {
        clearInterval(interval);
        return;
      }
      
      // Safely get the character
      const char = fullMessage.charAt(index);
      if (char) {
        setDisplayedMessage((prev) => prev + char);
        index += 1;
      } else {
        clearInterval(interval);
      }
    }, 45);
    
    return () => clearInterval(interval);
  }, [fullMessage]);

  return (
    <div
      className="signup-page"
      style={{
        minHeight: '100vh',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background:
          'radial-gradient(circle at top, #151421 0, #050509 55%, #000000 100%)',
        color: '#e5e7eb'
      }}
    >
      {/* Background "Front" / "End" text */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none'
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '8%',
            top: '10%',
            fontSize: '3.5rem',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.08)',
            letterSpacing: '0.08em'
          }}
        >
          Front
        </div>
        <div
          style={{
            position: 'absolute',
            right: '8%',
            top: '18%',
            fontSize: '3.5rem',
            fontWeight: 600,
            color: 'rgba(138, 92, 246, 0.35)',
            letterSpacing: '0.08em'
          }}
        >
          End
        </div>
      </div>

      <Container fluid className="p-0 h-100 position-relative">
        <Row className="h-100 align-items-center justify-content-center mx-0">
          {/* Form column */}
          <Col lg={4} md={8} sm={10} xs={12} className="px-3 py-3">
            <Card className="border-0 shadow-lg pro-glass-card">
              <Card.Body className="p-4">
                <div className="text-center mb-0">
                  <h1 className="pro-title mb-2">Create Account</h1>
                  <div className="required-note">
                    Fields marked with <RequiredField /> are required.
                  </div>
                </div>

                {showSuccess && (
                  <Alert variant="success" className="pro-alert mb-2">
                    Account created successfully.
                  </Alert>
                )}

                {apiError && (
                  <Alert variant="danger" className="pro-alert mb-32">
                    {apiError}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-2">
                    <Form.Label className="pro-label">
                      Username <RequiredField />
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter username"
                      className="pro-input"
                      isInvalid={!!errors.username}
                      required
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="d-block text-danger mt-1"
                    >
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label className="pro-label">
                      Email <RequiredField />
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      className="pro-input"
                      isInvalid={!!errors.email}
                      required
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="d-block text-danger mt-1"
                    >
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label className="pro-label">
                      Password <RequiredField />
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        ref={passwordRef}
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur}
                        placeholder="Enter password"
                        className="pro-input"
                        isInvalid={!!errors.password}
                        required
                      />
                      <InputGroup.Text className="pro-input-addon">
                        <i
                          className={`bi ${
                            showPassword ? 'bi-eye-slash' : 'bi-eye'
                          }`}
                          style={{ cursor: 'pointer', color: '#9da4b0' }}
                          onClick={togglePasswordVisibility}
                        />
                      </InputGroup.Text>
                    </InputGroup>
                    <Form.Text className="pro-helper-text">
                      Minimum 6 characters
                    </Form.Text>
                    <Form.Control.Feedback
                      type="invalid"
                      className="d-block text-danger mt-1"
                    >
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label className="pro-label">
                      Confirm Password <RequiredField />
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        ref={confirmPasswordRef}
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onFocus={handleConfirmPasswordFocus}
                        onBlur={handleConfirmPasswordBlur}
                        placeholder="Confirm password"
                        className="pro-input"
                        isInvalid={!!errors.confirmPassword}
                        required
                      />
                      <InputGroup.Text className="pro-input-addon">
                        <i
                          className={`bi ${
                            showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'
                          }`}
                          style={{ cursor: 'pointer', color: '#9da4b0' }}
                          onClick={toggleConfirmPasswordVisibility}
                        />
                      </InputGroup.Text>
                    </InputGroup>
                    <Form.Control.Feedback
                      type="invalid"
                      className="d-block text-danger mt-1"
                    >
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Check
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      label="I agree to the Terms and Conditions."
                      className="pro-checkbox"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="d-block text-danger mt-1"
                    >
                      {errors.agreeToTerms}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 pro-btn mb-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </Form>

                <div className="text-center pt-2">
                  <p className="pro-footer-text">
                    Already have an account?{' '}
                    <a href="/" className="pro-link">
                      Sign In
                    </a>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Robot column - Only show on large screens */}
          <Col
            lg={4}
            className="d-none d-lg-flex justify-content-center align-items-center position-relative"
          >
            <div
              ref={robotWrapperRef}
              style={{
                width: 280,
                height: 320,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '900px'
              }}
            >
              {/* Base shadow */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 15,
                  width: 200,
                  height: 25,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(0,0,0,0.8) 0, transparent 70%)',
                  filter: 'blur(10px)',
                  opacity: 0.9
                }}
              />

              {/* Three‑step base */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 40,
                  width: 200,
                  height: 70,
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, #050509, #141320)',
                  boxShadow:
                    '0 18px 45px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div
                  style={{
                    width: 150,
                    height: 50,
                    borderRadius: 14,
                    background: 'linear-gradient(135deg, #080714, #211b35)',
                    boxShadow:
                      '0 14px 30px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div
                    style={{
                      width: 110,
                      height: 35,
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, #0e0c18, #2b2342)',
                      boxShadow:
                        '0 10px 22px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.05)'
                    }}
                  />
                </div>
              </div>

              {/* Neck + joint */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 120,
                  width: 24,
                  height: 50,
                  borderRadius: 18,
                  background: 'linear-gradient(180deg, #5b44e0, #1b123e)',
                  boxShadow: '0 8px 18px rgba(0,0,0,0.8)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 120,
                  width: 34,
                  height: 16,
                  borderRadius: 12,
                  background: 'linear-gradient(90deg, #191624, #0b0a11)',
                  boxShadow: '0 6px 14px rgba(0,0,0,0.9)'
                }}
              />

              {/* Head (rotating) */}
              <div
                ref={headRef}
                style={{
                  position: 'absolute',
                  bottom: 180,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 150,
                  height: 80,
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, #050509, #151324)',
                  boxShadow:
                    '0 22px 40px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05)',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.3s ease-out'
                }}
              >
                {/* Left antenna */}
                <div
                  className="antenna antenna-left"
                  style={{
                    position: 'absolute',
                    top: -50,
                    left: '30%',
                    width: 4,
                    height: 45,
                    borderRadius: 4,
                    background: 'linear-gradient(180deg, #e5e7eb, #9ca3af)',
                    transformOrigin: 'bottom center',
                    zIndex: 1
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: -10,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle, #f3f4f6, #9ca3af)',
                      boxShadow: '0 0 8px rgba(156,163,175,0.9)'
                    }}
                  />
                </div>

                {/* Right antenna */}
                <div
                  className="antenna antenna-right"
                  style={{
                    position: 'absolute',
                    top: -50,
                    left: '70%',
                    width: 4,
                    height: 45,
                    borderRadius: 4,
                    background: 'linear-gradient(180deg, #e5e7eb, #9ca3af)',
                    transformOrigin: 'bottom center',
                    zIndex: 1
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: -10,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle, #f3f4f6, #9ca3af)',
                      boxShadow: '0 0 8px rgba(156,163,175,0.9)'
                    }}
                  />
                </div>

                {/* Head side thickness */}
                <div
                  style={{
                    position: 'absolute',
                    right: -16,
                    top: 8,
                    width: 16,
                    height: 60,
                    borderRadius: '0 16px 16px 0',
                    background: 'linear-gradient(90deg, #090812, #1d182e)',
                    boxShadow: '-6px 0 16px rgba(0,0,0,0.9)'
                  }}
                />

                {/* Face panel */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 12,
                    borderRadius: 12,
                    background:
                      'radial-gradient(circle at 0% 0%, #262238 0, #050509 65%)',
                    boxShadow: 'inset 0 0 18px rgba(0,0,0,0.85)'
                  }}
                >
                  {/* Left eye - closes when password fields are focused */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 22,
                      left: 32,
                      width: 20,
                      height: (isPasswordFocused || isConfirmPasswordFocused) ? '4px' : '20px',
                      borderRadius: (isPasswordFocused || isConfirmPasswordFocused) ? '2px' : '50%',
                      background: (isPasswordFocused || isConfirmPasswordFocused) 
                        ? 'linear-gradient(90deg, #f973a6, #d946ef)'
                        : 'radial-gradient(circle at 30% 30%, #ffb6d9 0, #f973a6 35%, #d946ef 80%)',
                      boxShadow: (isPasswordFocused || isConfirmPasswordFocused)
                        ? '0 0 8px rgba(248,113,150,0.7), 0 0 16px rgba(236,72,153,0.6)'
                        : '0 0 12px rgba(248,113,150,0.9), 0 0 24px rgba(236,72,153,0.8)',
                      transition: 'all 0.3s ease-out'
                    }}
                  />
                  {/* Right eye - closes when password fields are focused */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 22,
                      right: 32,
                      width: 20,
                      height: (isPasswordFocused || isConfirmPasswordFocused) ? '4px' : '20px',
                      borderRadius: (isPasswordFocused || isConfirmPasswordFocused) ? '2px' : '50%',
                      background: (isPasswordFocused || isConfirmPasswordFocused) 
                        ? 'linear-gradient(90deg, #f973a6, #d946ef)'
                        : 'radial-gradient(circle at 30% 30%, #ffb6d9 0, #f973a6 35%, #d946ef 80%)',
                      boxShadow: (isPasswordFocused || isConfirmPasswordFocused)
                        ? '0 0 8px rgba(248,113,150,0.7), 0 0 16px rgba(236,72,153,0.6)'
                        : '0 0 12px rgba(248,113,150,0.9), 0 0 24px rgba(236,72,153,0.8)',
                      transition: 'all 0.3s ease-out'
                    }}
                  />

                  {/* Subtle mouth bar */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 16,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 48,
                      height: 5,
                      borderRadius: 8,
                      background:
                        'linear-gradient(90deg, rgba(148,163,184,0.15), rgba(148,163,184,0.5), rgba(148,163,184,0.15))',
                      boxShadow: '0 0 10px rgba(148,163,184,0.5)'
                    }}
                  />
                </div>
              </div>

              {/* Speech bubble */}
              <div
                style={{
                  position: 'absolute',
                  left: 'calc(100% - 40px)',
                  top: 60,
                  marginLeft: 0,
                  width: '220px',
                  color: '#1f2937',
                  fontSize: '0.85rem',
                  lineHeight: 1.3,
                  padding: '10px 14px',
                  borderRadius: '16px 16px 16px 4px',
                  background: '#ffffff',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.9)',
                  border: '1px solid rgba(148,163,184,0.2)',
                  whiteSpace: 'normal',
                  wordWrap: 'break-word',
                  zIndex: 10
                }}
              >
                {displayedMessage || ''}
                {/* Speech bubble pointer */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-8px',
                    bottom: '0px',
                    width: '0',
                    height: '0',
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    borderRight: '8px solid #ffffff',
                    filter: 'drop-shadow(-2px 2px 1px rgba(0,0,0,0.1))'
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Success Modal */}
      <Modal
        show={showSuccessModal}
        onHide={handleCloseSuccessModal}
        centered
        size="md"
      >
        <Modal.Header closeButton className="border-0 pro-modal-header">
          <Modal.Title className="w-100 text-center">
            Account Created
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <div className="mb-4">
            <i className="bi bi-check-circle-fill pro-success-icon" />
          </div>
          <h4 className="mb-3 fw-bold pro-success-title">Success</h4>
          <p className="text-muted">
            Your account has been created successfully. You can now sign in.
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center">
          <Button className="pro-modal-btn px-4" onClick={handleCloseSuccessModal}>
            Continue to Login
          </Button>
        </Modal.Footer>
      </Modal>

      <style>{`
        @keyframes shadowPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }

        /* Left/right swinging animation for antennas */
        @keyframes antennaSwingLeft {
          0% { transform: rotateZ(0deg); }
          25% { transform: rotateZ(15deg); }
          50% { transform: rotateZ(0deg); }
          75% { transform: rotateZ(-15deg); }
          100% { transform: rotateZ(0deg); }
        }
        
        @keyframes antennaSwingRight {
          0% { transform: rotateZ(0deg); }
          25% { transform: rotateZ(-15deg); }
          50% { transform: rotateZ(0deg); }
          75% { transform: rotateZ(15deg); }
          100% { transform: rotateZ(0deg); }
        }

        .antenna-left {
          animation: antennaSwingLeft 2s ease-in-out infinite;
        }
        .antenna-right {
          animation: antennaSwingRight 2s ease-in-out infinite;
        }

        .pro-glass-card {
          background: rgba(15, 23, 42, 0.96) !important;
          backdrop-filter: blur(28px);
          border-radius: 16px;
          border: 1px solid rgba(148, 163, 184, 0.15) !important;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.7);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .pro-glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.9);
        }
        .pro-title {
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #f9fafb, #9ca3af);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .required-note {
          color: rgba(148, 163, 184, 0.9);
          font-size: 0.8rem;
        }
        .pro-label {
          color: #e5e7eb;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 0.3rem;
        }
        .pro-input {
          background: rgba(15, 23, 42, 0.95) !important;
          border-radius: 12px;
          border: 1px solid rgba(55, 65, 81, 0.9) !important;
          color: #e5e7eb !important;
          padding: 0.7rem 1rem;
          font-size: 0.92rem;
          height: 48px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.9);
        }
        .pro-input:focus {
          background: rgba(15, 23, 42, 1) !important;
          border-color: rgba(129, 140, 248, 0.95) !important;
          box-shadow:
            0 0 0 3px rgba(129, 140, 248, 0.35),
            0 4px 16px rgba(15, 23, 42, 1) !important;
        }
        .pro-input::placeholder {
          color: rgba(148, 163, 184, 0.7) !important;
        }
        .pro-input-addon {
          background: rgba(15, 23, 42, 0.95) !important;
          border-radius: 0 12px 12px 0 !important;
          border: 1px solid rgba(55, 65, 81, 0.9) !important;
          border-left: none !important;
          padding: 0.7rem 1rem;
        }
        .pro-helper-text {
          color: rgba(148, 163, 184, 0.9) !important;
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }
        .pro-btn {
          background: linear-gradient(135deg, #4f46e5, #7c3aed) !important;
          border-radius: 12px;
          border: none !important;
          font-weight: 700;
          letter-spacing: 0.08em;
          font-size: 0.9rem;
          text-transform: uppercase;
          padding: 0.7rem;
          box-shadow: 0 12px 32px rgba(124, 58, 237, 0.7);
        }
        .pro-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 18px 48px rgba(124, 58, 237, 0.9);
        }
        .pro-footer-text {
          color: rgba(148, 163, 184, 0.95);
          font-size: 0.85rem;
        }
        .pro-link {
          color: #a855f7;
          font-weight: 600;
          text-decoration: none;
        }
        .pro-link:hover {
          color: #c4b5fd;
        }
        .pro-alert {
          background: rgba(22, 163, 74, 0.06) !important;
          border-radius: 12px;
          border: 1px solid rgba(34, 197, 94, 0.4) !important;
          color: #bbf7d0 !important;
          padding: 0.75rem 1rem;
          font-size: 0.85rem;
        }
        .pro-checkbox {
          color: #ffffff;
          font-size: 0.9rem;
        }
        .pro-checkbox .form-check-input:checked {
          background-color: #4f46e5;
          border-color: #4f46e5;
        }
        .pro-modal-header {
          background: #020617;
          color: #e5e7eb;
        }
        .pro-success-icon {
          font-size: 3rem;
          color: #22c55e;
        }
        .pro-success-title {
          color: #e5e7eb;
        }
        .pro-modal-btn {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 10px;
          border: none;
          font-weight: 600;
          padding: 0.6rem 2rem;
        }
        @media (max-width: 991.98px) {
          .pro-title {
            font-size: 1.8rem;
          }
          .signup-page {
            padding: 1rem;
            height: auto;
            min-height: 100vh;
          }
          .container-fluid {
            padding: 1rem;
          }
        }
        @media (max-width: 576px) {
          .pro-title {
            font-size: 1.6rem;
          }
          .pro-glass-card {
            margin: 0.5rem;
          }
          .card-body {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SignUp;