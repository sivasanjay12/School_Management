// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
// import { useNavigate, Link } from 'react-router-dom';
// // import { validateUser } from './utils/usersStorage';

// const SignIn = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
  
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [loginError, setLoginError] = useState('');

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear errors when user types
//     if (errors[name] || loginError) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//       setLoginError('');
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.username.trim()) {
//       newErrors.username = 'Username is required';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     }

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const formErrors = validateForm();
    
//     if (Object.keys(formErrors).length === 0) {
//       setIsSubmitting(true);
//       setLoginError('');
      
//       try {
//         // For now, validate against local array
//         const user = validateUser(formData.username, formData.password);
        
//         // Simulate API call delay
//         await new Promise(resolve => setTimeout(resolve, 1000));
        
//         if (user) {
//           console.log('Login successful:', user);
//           // Redirect to dashboard or home page
//           navigate('/dashboard');
//         } else {
//           setLoginError('Invalid username or password');
//         }
        
//       } catch (error) {
//         console.error('Login error:', error);
//         setLoginError('Login failed. Please try again.');
//       } finally {
//         setIsSubmitting(false);
//       }
//     } else {
//       setErrors(formErrors);
//     }
//   };

//   // Future API integration function
//   const loginWithAPI = async (username, password) => {
//     // When you have your API, replace this function
    
//     const response = await fetch('http://localhost:8080/api/student', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, password })
//     });
    
//     if (!response.ok) {
//       throw new Error('Login failed');
//     }
    
//     return await response.json();
   
//   };

//   return (
//     <Container fluid className="signin-container">
//       <Row className="justify-content-center align-items-center min-vh-100">
//         <Col xs={12} sm={8} md={6} lg={4}>
//           <Card className="shadow-lg">
//             <Card.Body className="p-4">
//               <div className="text-center mb-4">
//                 <h2 className="fw-bold text-primary">Welcome Back</h2>
//                 <p className="text-muted">Sign in to your account</p>
//               </div>

//               {loginError && (
//                 <Alert variant="danger" className="mb-3">
//                   {loginError}
//                 </Alert>
//               )}

//               <Form onSubmit={handleSubmit} noValidate>
//                 {/* Username Field */}
//                 <Form.Group className="mb-3">
//                   <Form.Label>Username</Form.Label>
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

//                 {/* Password Field */}
//                 <Form.Group className="mb-4">
//                   <Form.Label>Password</Form.Label>
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
//                 </Form.Group>

//                 {/* Submit Button */}
//                 <Button
//                   variant="primary"
//                   type="submit"
//                   className="w-100 py-2 fw-semibold"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <span className="spinner-border spinner-border-sm me-2" />
//                       Signing In...
//                     </>
//                   ) : (
//                     'Sign In'
//                   )}
//                 </Button>
//               </Form>

//               <div className="text-center mt-3">
//                 <p className="text-muted">
//                   Don't have an account?{' '}
//                   <Link to="/" className="text-decoration-none fw-semibold">
//                     Sign Up
//                   </Link>
//                 </p>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default SignIn;






// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
// import { useNavigate, Link } from 'react-router-dom';

// const SignIn = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
  
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [loginError, setLoginError] = useState('');

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear errors when user types
//     if (errors[name] || loginError) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//       setLoginError('');
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.username.trim()) {
//       newErrors.username = 'Username is required';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     }

//     return newErrors;
//   };

//   // API integration function to validate user
//   const validateUserWithAPI = async (username, password) => {
//     try {
//       // GET request to retrieve all users
//       const response = await fetch('http://localhost:8080/api/student', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
          
//         },
//       });
//       console.log("Succes")
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch users');
//       }
      
//       const users = await response.json();
      
//       // Check if user exists in the retrieved data
//       const user = users.find(u => 
//         u.username === username && u.password === password
//       );
      
//       return user || null;
      
//     } catch (error) {
//       console.error('API Error:', error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const formErrors = validateForm();
    
//     if (Object.keys(formErrors).length === 0) {
//       setIsSubmitting(true);
//       setLoginError('');
      
//       try {
//         // Validate user against API
//         const user = await validateUserWithAPI(formData.username, formData.password);
        
//         if (user) {
//           console.log('Login successful:', user);
//           // Store user data in localStorage or context
//           localStorage.setItem('currentUser', JSON.stringify(user));
//           // Redirect to dashboard or home page
//           navigate('/dashboard');
//         } else {
//           setLoginError('Invalid username or password');
//         }
        
//       } catch (error) {
//         console.error('Login error:', error);
//         setLoginError('Login failed. Please try again.');
//       } finally {
//         setIsSubmitting(false);
//       }
//     } else {
//       setErrors(formErrors);
//     }
//   };

//   return (
//     <Container fluid className="signin-container">
//       <Row className="justify-content-center align-items-center min-vh-100">
//         <Col xs={12} sm={8} md={6} lg={4}>
//           <Card className="shadow-lg">
//             <Card.Body className="p-4">
//               <div className="text-center mb-4">
//                 <h2 className="fw-bold text-primary">Welcome Back</h2>
//                 <p className="text-muted">Sign in to your account</p>
//               </div>

//               {loginError && (
//                 <Alert variant="danger" className="mb-3">
//                   {loginError}
//                 </Alert>
//               )}

//               <Form onSubmit={handleSubmit} noValidate>
//                 {/* Username Field */}
//                 <Form.Group className="mb-3">
//                   <Form.Label>
//                     Username <span className="text-danger">*</span>
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

//                 {/* Password Field */}
//                 <Form.Group className="mb-4">
//                   <Form.Label>
//                     Password <span className="text-danger">*</span>
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
//                 </Form.Group>

//                 {/* Submit Button */}
//                 <Button
//                   variant="primary"
//                   type="submit"
//                   className="w-100 py-2 fw-semibold"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <span className="spinner-border spinner-border-sm me-2" />
//                       Signing In...
//                     </>
//                   ) : (
//                     'Sign In'
//                   )}
//                 </Button>
//               </Form>

//               <div className="text-center mt-3">
//                 <p className="text-muted">
//                   Don't have an account?{' '}
//                   <Link to="/" className="text-decoration-none fw-semibold">
//                     Sign Up
//                   </Link>
//                 </p>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default SignIn;







// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Card, Alert, InputGroup } from 'react-bootstrap';
// import { useNavigate, Link } from 'react-router-dom';

// const SignIn = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
  
  
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [loginError, setLoginError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear errors when user types
//     if (errors[name] || loginError) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//       setLoginError('');
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.username.trim()) {
//       newErrors.username = 'Username is required';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     }

//     return newErrors;
//   };

//   // API integration function to validate user
//   const validateUserWithAPI = async (username, password) => {
//     try {
//       // GET request to retrieve all users
//       const response = await fetch('http://localhost:8080/api/student', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log("Success")
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch users');
//       }
      
//       const users = await response.json();
      
//       // Check if user exists in the retrieved data
//       const user = users.find(u => 
//         u.username === username && u.password === password
//       );
      
//       return user || null;
      
//     } catch (error) {
//       console.error('API Error:', error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const formErrors = validateForm();
    
//     if (Object.keys(formErrors).length === 0) {
//       setIsSubmitting(true);
//       setLoginError('');
      
//       try {
//         // Validate user against API
//         const user = await validateUserWithAPI(formData.username, formData.password);
        
//         if (user) {
//           console.log('Login successful:', user);
//           // Store user data in localStorage or context
//           localStorage.setItem('currentUser', JSON.stringify(user));
//           // Redirect to dashboard or home page
//           navigate('/dashboard');
//         } else {
//           setLoginError('Invalid username or password');
//         }
        
//       } catch (error) {
//         console.error('Login error:', error);
//         setLoginError('Login failed. Please try again.');
//       } finally {
//         setIsSubmitting(false);
//       }
//     } else {
//       setErrors(formErrors);
//     }
//   };

//   return (
//     <Container fluid className="signin-container">
//       <Row className="justify-content-center align-items-center min-vh-100">
//         <Col xs={12} sm={8} md={6} lg={4}>
//           <Card className="shadow-lg">
//             <Card.Body className="p-4">
//               <div className="text-center mb-4">
//                 <h2 className="fw-bold text-primary">Welcome Back</h2>
//                 <p className="text-muted">Sign in to your account</p>
//               </div>

//               {loginError && (
//                 <Alert variant="danger" className="mb-3">
//                   {loginError}
//                 </Alert>
//               )}

//               <Form onSubmit={handleSubmit} noValidate>
//                 {/* Username Field */}
//                 <Form.Group className="mb-3">
//                   <Form.Label>
//                     Username <span className="text-danger">*</span>
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

//                 {/* Password Field with Eye Icon */}
//                 <Form.Group className="mb-4">
//                   <Form.Label>
//                     Password <span className="text-danger">*</span>
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
//                       <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} style={{ fontSize: '1.2rem' }}></i>
//                     </InputGroup.Text>
//                     <Form.Control.Feedback type="invalid">
//                       {errors.password}
//                     </Form.Control.Feedback>
//                   </InputGroup>
//                 </Form.Group>

//                 {/* Submit Button */}
//                 <Button
//                   variant="primary"
//                   type="submit"
//                   className="w-100 py-2 fw-semibold"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <span className="spinner-border spinner-border-sm me-2" />
//                       Signing In...
//                     </>
//                   ) : (
//                     'Sign In'
//                   )}
//                 </Button>
//               </Form>

//               <div className="text-center mt-3">
//                 <p className="text-muted">
//                   Don't have an account?{' '}
//                   <Link to="/" className="text-decoration-none fw-semibold">
//                     Sign Up
//                   </Link>
//                 </p>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default SignIn;





import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, InputGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Robot message and animation
  const [displayedMessage, setDisplayedMessage] = useState('');
  const fullMessage = 'Welcome back! Please enter your credentials to sign in';
  
  const navigate = useNavigate();
  const headRef = useRef(null);
  const robotWrapperRef = useRef(null);
  const passwordRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user types
    if (errors[name] || loginError) {
      setErrors(prev => ({ ...prev, [name]: '' }));
      setLoginError('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordFocus = () => setIsPasswordFocused(true);
  const handlePasswordBlur = () => setIsPasswordFocused(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  // API integration function to validate user
  const validateUserWithAPI = async (username, password) => {
    try {
      // POST request to login endpoint
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username, // Your backend expects "email", not "username"
          password: password
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      
      const result = await response.text(); // Your backend returns String
      
      if (result === "Login Successful") {
        // Return user data (create from form since backend doesn't return it)
        return {
          username: formData.username,
          email: formData.username // Assuming username is email
        };
      } else {
        return null;
      }
      
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      setLoginError('');
      
      try {
        // Validate user against API
        const user = await validateUserWithAPI(formData.username, formData.password);
        
        if (user) {
          console.log('Login successful:', user);
          // Store user data in localStorage or context
          localStorage.setItem('currentUser', JSON.stringify(user));
          // Redirect to dashboard or home page
          navigate('/dashboard');
        } else {
          setLoginError('Invalid username or password');
        }
        
      } catch (error) {
        console.error('Login error:', error);
        setLoginError('Login failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  // ---- Robot head rotation ----
  useEffect(() => {
    const handleMove = (e) => {
      if (!headRef.current || !robotWrapperRef.current) return;

      // Check if password field is focused
      if (isPasswordFocused) {
        // Rotate head to the left when password field is focused (looking at form)
        headRef.current.style.transform = `
          translateX(-50%)
          translateY(0px)
          rotateY(-25deg)
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
  }, [isPasswordFocused]);

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
      className="signin-page"
      style={{
        minHeight: '100vh',
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
            top: '18%',
            fontSize: '4.5rem',
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
            top: '26%',
            fontSize: '4.5rem',
            fontWeight: 600,
            color: 'rgba(138, 92, 246, 0.35)',
            letterSpacing: '0.08em'
          }}
        >
          End
        </div>
      </div>

      <Container fluid className="py-0 position-relative">
        <Row className="justify-content-center align-items-center min-vh-100">
          {/* Robot column - LEFT SIDE */}
          <Col lg={4} md={8} className="d-none d-lg-flex justify-content-center position-relative order-first">
            <div
              ref={robotWrapperRef}
              style={{
                width: 320,
                height: 360,
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
                  width: 220,
                  height: 30,
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
                  width: 220,
                  height: 80,
                  borderRadius: 18,
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
                    width: 170,
                    height: 55,
                    borderRadius: 16,
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
                      width: 120,
                      height: 40,
                      borderRadius: 12,
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
                  bottom: 140,
                  width: 26,
                  height: 55,
                  borderRadius: 20,
                  background: 'linear-gradient(180deg, #5b44e0, #1b123e)',
                  boxShadow: '0 8px 18px rgba(0,0,0,0.8)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 140,
                  width: 38,
                  height: 18,
                  borderRadius: 14,
                  background: 'linear-gradient(90deg, #191624, #0b0a11)',
                  boxShadow: '0 6px 14px rgba(0,0,0,0.9)'
                }}
              />

              {/* Head (rotating) */}
              <div
                ref={headRef}
                style={{
                  position: 'absolute',
                  bottom: 200,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 170,
                  height: 90,
                  borderRadius: 18,
                  background: 'linear-gradient(135deg, #050509, #151324)',
                  boxShadow:
                    '0 22px 40px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05)',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.3s ease-out'
                }}
              >
                {/* Left antenna - Increased height */}
                <div
                  className="antenna antenna-left"
                  style={{
                    position: 'absolute',
                    top: -60,
                    left: '30%',
                    width: 4,
                    height: 55,
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
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle, #f3f4f6, #9ca3af)',
                      boxShadow: '0 0 8px rgba(156,163,175,0.9)'
                    }}
                  />
                </div>

                {/* Right antenna - Increased height */}
                <div
                  className="antenna antenna-right"
                  style={{
                    position: 'absolute',
                    top: -60,
                    left: '70%',
                    width: 4,
                    height: 55,
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
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle, #f3f4f6, #9ca3af)',
                      boxShadow: '0 0 8px rgba(156,163,175,0.9)'
                    }}
                  />
                </div>

                {/* Head side thickness - moved to left side since robot is facing right */}
                <div
                  style={{
                    position: 'absolute',
                    left: -18,
                    top: 10,
                    width: 18,
                    height: 70,
                    borderRadius: '18px 0 0 18px',
                    background: 'linear-gradient(90deg, #1d182e, #090812)',
                    boxShadow: '6px 0 16px rgba(0,0,0,0.9)'
                  }}
                />

                {/* Face panel */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 14,
                    borderRadius: 14,
                    background:
                      'radial-gradient(circle at 0% 0%, #262238 0, #050509 65%)',
                    boxShadow: 'inset 0 0 18px rgba(0,0,0,0.85)'
                  }}
                >
                  {/* Left eye - closes when password field is focused */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 26,
                      left: 38,
                      width: 22,
                      height: isPasswordFocused ? '4px' : '22px',
                      borderRadius: isPasswordFocused ? '2px' : '50%',
                      background: isPasswordFocused 
                        ? 'linear-gradient(90deg, #f973a6, #d946ef)'
                        : 'radial-gradient(circle at 30% 30%, #ffb6d9 0, #f973a6 35%, #d946ef 80%)',
                      boxShadow: isPasswordFocused
                        ? '0 0 8px rgba(248,113,150,0.7), 0 0 16px rgba(236,72,153,0.6)'
                        : '0 0 12px rgba(248,113,150,0.9), 0 0 24px rgba(236,72,153,0.8)',
                      transition: 'all 0.3s ease-out'
                    }}
                  />
                  {/* Right eye - closes when password field is focused */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 26,
                      right: 38,
                      width: 22,
                      height: isPasswordFocused ? '4px' : '22px',
                      borderRadius: isPasswordFocused ? '2px' : '50%',
                      background: isPasswordFocused 
                        ? 'linear-gradient(90deg, #f973a6, #d946ef)'
                        : 'radial-gradient(circle at 30% 30%, #ffb6d9 0, #f973a6 35%, #d946ef 80%)',
                      boxShadow: isPasswordFocused
                        ? '0 0 8px rgba(248,113,150,0.7), 0 0 16px rgba(236,72,153,0.6)'
                        : '0 0 12px rgba(248,113,150,0.9), 0 0 24px rgba(236,72,153,0.8)',
                      transition: 'all 0.3s ease-out'
                    }}
                  />

                  {/* Subtle mouth bar */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 20,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 54,
                      height: 6,
                      borderRadius: 10,
                      background:
                        'linear-gradient(90deg, rgba(148,163,184,0.15), rgba(148,163,184,0.5), rgba(148,163,184,0.15))',
                      boxShadow: '0 0 10px rgba(148,163,184,0.5)'
                    }}
                  />
                </div>
              </div>

              {/* Speech bubble with sharp bottom-RIGHT corner (since robot is on left) */}
              <div
                style={{
                  position: 'absolute',
                  right: 'calc(100% - 50px)',
                  top: 90,
                  marginRight: 0,
                  width: '280px',
                  color: '#1f2937',
                  fontSize: '0.9rem',
                  lineHeight: 1.4,
                  padding: '12px 16px',
                  borderRadius: '20px 20px 4px 20px',
                  background: '#ffffff',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.9)',
                  border: '1px solid rgba(148,163,184,0.2)',
                  whiteSpace: 'normal',
                  wordWrap: 'break-word',
                  zIndex: 10,
                  textAlign: 'center'
                }}
              >
                {displayedMessage || ''}
                {/* Speech bubble pointer - pointing left */}
                <div
                  style={{
                    position: 'absolute',
                    right: '-10px',
                    bottom: '0px',
                    width: '0',
                    height: '0',
                    borderTop: '10px solid transparent',
                    borderBottom: '10px solid transparent',
                    borderLeft: '10px solid #ffffff',
                    filter: 'drop-shadow(2px 2px 1px rgba(0,0,0,0.1))'
                  }}
                />
              </div>
            </div>
          </Col>

          {/* Form column - RIGHT SIDE */}
          <Col lg={5} md={10} className="mb-4 mb-lg-0">
            <Card className="border-0 shadow-lg pro-glass-card">
              <Card.Body className="p-5">
                <div className="text-center mb-5">
                  <h1 className="pro-title mb-2">Welcome Back</h1>
                  <div className="required-note">
                    Sign in to your account
                  </div>
                </div>

                {loginError && (
                  <Alert variant="danger" className="pro-alert mb-4">
                    {loginError}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-4">
                    <Form.Label className="pro-label">
                      Email <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter your username"
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

                  <Form.Group className="mb-4">
                    <Form.Label className="pro-label">
                      Password <span className="text-danger">*</span>
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
                        placeholder="Enter your password"
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
                    <Form.Control.Feedback
                      type="invalid"
                      className="d-block text-danger mt-1"
                    >
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 pro-btn mb-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </Form>

                <div className="text-center">
                  <p className="pro-footer-text">
                    Don't have an account?{' '}
                    <Link to="/signup" className="pro-link">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
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
          border-radius: 20px;
          border: 1px solid rgba(148, 163, 184, 0.15) !important;
          box-shadow: 0 32px 90px rgba(0, 0, 0, 0.7);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .pro-glass-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 40px 110px rgba(0, 0, 0, 0.9);
        }
        .pro-title {
          font-size: 2.6rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #f9fafb, #9ca3af);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .required-note {
          color: rgba(148, 163, 184, 0.9);
          font-size: 0.85rem;
        }
        .pro-label {
          color: #e5e7eb;
          font-weight: 600;
          font-size: 0.95rem;
        }
        .pro-input {
          background: rgba(15, 23, 42, 0.95) !important;
          border-radius: 14px;
          border: 1px solid rgba(55, 65, 81, 0.9) !important;
          color: #e5e7eb !important;
          padding: 0.9rem 1.1rem;
          font-size: 0.97rem;
          height: 56px;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.9);
        }
        .pro-input:focus {
          background: rgba(15, 23, 42, 1) !important;
          border-color: rgba(129, 140, 248, 0.95) !important;
          box-shadow:
            0 0 0 3px rgba(129, 140, 248, 0.35),
            0 6px 22px rgba(15, 23, 42, 1) !important;
        }
        .pro-input::placeholder {
          color: rgba(148, 163, 184, 0.7) !important;
        }
        .pro-input-addon {
          background: rgba(15, 23, 42, 0.95) !important;
          border-radius: 0 14px 14px 0 !important;
          border: 1px solid rgba(55, 65, 81, 0.9) !important;
          border-left: none !important;
        }
        .pro-helper-text {
          color: rgba(148, 163, 184, 0.9) !important;
          font-size: 0.8rem;
        }
        .pro-btn {
          background: linear-gradient(135deg, #4f46e5, #7c3aed) !important;
          border-radius: 14px;
          border: none !important;
          font-weight: 700;
          letter-spacing: 0.08em;
          font-size: 0.95rem;
          text-transform: uppercase;
          box-shadow: 0 16px 40px rgba(124, 58, 237, 0.7);
        }
        .pro-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 24px 60px rgba(124, 58, 237, 0.9);
        }
        .pro-footer-text {
          color: rgba(148, 163, 184, 0.95);
          font-size: 0.9rem;
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
          background: rgba(220, 38, 38, 0.06) !important;
          border-radius: 14px;
          border: 1px solid rgba(239, 68, 68, 0.4) !important;
          color: #fecaca !important;
        }
        @media (max-width: 991.98px) {
          .pro-title {
            font-size: 2.2rem;
          }
          .pro-glass-card {
            margin-top: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SignIn;