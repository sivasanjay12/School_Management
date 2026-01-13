import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminForm = ({ onSuccess }) => {
  // Initial state for admin form
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    phoneNumber: '',
    adminId: ''
  });
  
  // State for form validation
  const [formErrors, setFormErrors] = useState({
    name: '',
    password: '',
    email: '',
    phoneNumber: '',
    adminId: ''
  });
  
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prevState => ({
        ...prevState,
        [name]: ''
      }));
    }
  };
  
  // Validate form fields
  const validateForm = () => {
    const errors = {};
    let isValid = true;
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
      isValid = false;
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Phone validation
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phoneNumber.replace(/[\s\-\(\)]/g, ''))) {
      errors.phoneNumber = 'Please enter a valid phone number';
      isValid = false;
    }
    
    // Password validation
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
      isValid = false;
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain letters and numbers';
      isValid = false;
    }
    
    // Admin ID validation
    if (!formData.adminId.trim()) {
      errors.adminId = 'Admin ID is required';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:8080/api/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      // Show success popup
      setShowSuccessPopup(true);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Show specific error message based on error type
      let errorMessage = 'Failed to submit form. Please try again.';
      if (error.message.includes('Network')) {
        errorMessage = 'Network error. Please check your connection.';
      } else if (error.message.includes('Failed to submit')) {
        errorMessage = 'Server error. Please try again later.';
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle navigation to sign-in page
  const navigateToSignIn = () => {
    // Reset form
    setFormData({
      name: '',
      password: '',
      email: '',
      phoneNumber: '',
      adminId: ''
    });
    
    setFormErrors({
      name: '',
      password: '',
      email: '',
      phoneNumber: '',
      adminId: ''
    });
    
    // Close popup
    setShowSuccessPopup(false);
    
    // Call the onSuccess prop to navigate (this will be handled by parent component)
    if (onSuccess) {
      onSuccess();
    } else {
      // If no prop provided, redirect to sign-in page
      window.location.href = '/';
    }
  };
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Reset form
  const handleReset = () => {
    setFormData({
      name: '',
      password: '',
      email: '',
      phoneNumber: '',
      adminId: ''
    });
    setFormErrors({
      name: '',
      password: '',
      email: '',
      phoneNumber: '',
      adminId: ''
    });
  };
  
  // Generate a strong password
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password }));
  };
  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <i className="bi bi-person-plus me-2"></i>
                Admin Registration
              </h3>
              <p className="mb-0 small">Create a new admin account</p>
            </div>
            
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Admin ID Field */}
                <div className="mb-3">
                  <label htmlFor="adminId" className="form-label fw-bold">
                    Admin ID <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.adminId ? 'is-invalid' : ''}`}
                    id="adminId"
                    name="adminId"
                    value={formData.adminId}
                    onChange={handleInputChange}
                    placeholder="Enter unique admin ID"
                    disabled={isSubmitting}
                  />
                  {formErrors.adminId && (
                    <div className="invalid-feedback">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      {formErrors.adminId}
                    </div>
                  )}
                  <div className="form-text">
                    Unique identifier for the admin account
                  </div>
                </div>
                
                {/* Name Field */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-bold">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    disabled={isSubmitting}
                  />
                  {formErrors.name && (
                    <div className="invalid-feedback">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      {formErrors.name}
                    </div>
                  )}
                </div>
                
                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    disabled={isSubmitting}
                  />
                  {formErrors.email && (
                    <div className="invalid-feedback">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      {formErrors.email}
                    </div>
                  )}
                </div>
                
                {/* Phone Number Field */}
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label fw-bold">
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${formErrors.phoneNumber ? 'is-invalid' : ''}`}
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter phone number with country code"
                    disabled={isSubmitting}
                  />
                  {formErrors.phoneNumber && (
                    <div className="invalid-feedback">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      {formErrors.phoneNumber}
                    </div>
                  )}
                  <div className="form-text">
                    Include country code (e.g., +1 for USA)
                  </div>
                </div>
                
                {/* Password Field with Visibility Toggle */}
                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-bold">
                    Password <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter strong password"
                      disabled={isSubmitting}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={togglePasswordVisibility}
                      disabled={isSubmitting}
                    >
                      {showPassword ? (
                        <>
                          <i className="bi bi-eye-slash me-1"></i> Hide
                        </>
                      ) : (
                        <>
                          <i className="bi bi-eye me-1"></i> Show
                        </>
                      )}
                    </button>
                    <button
                      className="btn btn-outline-info"
                      type="button"
                      onClick={generatePassword}
                      disabled={isSubmitting}
                    >
                      <i className="bi bi-key me-1"></i> Generate
                    </button>
                  </div>
                  {formErrors.password && (
                    <div className="invalid-feedback d-block">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      {formErrors.password}
                    </div>
                  )}
                  <div className="form-text">
                    Must be at least 8 characters with letters and numbers
                  </div>
                </div>
                
                {/* Form Buttons */}
                <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleReset}
                    disabled={isSubmitting}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Clear Form
                  </button>
                  
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person-plus me-2"></i>
                        Create Admin
                      </>
                    )}
                  </button>
                </div>
                
                {/* Required Field Note */}
                <div className="mt-3 text-center">
                  <small className="text-muted">
                    <i className="bi bi-info-circle me-1"></i>
                    Fields marked with <span className="text-danger">*</span> are required
                  </small>
                </div>
              </form>
            </div>
            
            {/* Card Footer */}
            <div className="card-footer bg-light">
              <div className="row">
                <div className="col-md-6">
                  <small className="text-muted">
                    <i className="bi bi-shield-check me-1"></i>
                    Secure SSL Connection
                  </small>
                </div>
                <div className="col-md-6 text-end">
                  <small className="text-muted">
                    <i className="bi bi-clock me-1"></i>
                    Real-time Validation
                  </small>
                </div>
              </div>
            </div>
          </div>
          
          {/* Password Strength Helper */}
          <div className="card mt-3">
            <div className="card-body">
              <h6 className="card-title">
                <i className="bi bi-lightbulb me-2"></i>
                Password Requirements
              </h6>
              <ul className="list-unstyled mb-0">
                <li className={formData.password.length >= 8 ? 'text-success' : 'text-muted'}>
                  <i className={`bi ${formData.password.length >= 8 ? 'bi-check-circle' : 'bi-circle'} me-2`}></i>
                  At least 8 characters
                </li>
                <li className={/[A-Za-z]/.test(formData.password) ? 'text-success' : 'text-muted'}>
                  <i className={`bi ${/[A-Za-z]/.test(formData.password) ? 'bi-check-circle' : 'bi-circle'} me-2`}></i>
                  Contains letters
                </li>
                <li className={/\d/.test(formData.password) ? 'text-success' : 'text-muted'}>
                  <i className={`bi ${/\d/.test(formData.password) ? 'bi-check-circle' : 'bi-circle'} me-2`}></i>
                  Contains numbers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowSuccessPopup(false)}
                ></button>
              </div>
              <div className="modal-body text-center py-4">
                <div className="mb-4">
                  <div className="rounded-circle bg-success d-inline-flex align-items-center justify-content-center" 
                       style={{ width: '80px', height: '80px' }}>
                    <i className="bi bi-check-lg text-white" style={{ fontSize: '2.5rem' }}></i>
                  </div>
                </div>
                <h4 className="modal-title mb-3">Success!</h4>
                <p className="mb-4">
                  Admin account has been created successfully!
                </p>
                <div className="alert alert-info text-start">
                  <small>
                    <i className="bi bi-info-circle me-2"></i>
                    Please note your Admin ID and Password for future login.
                  </small>
                </div>
                <div className="d-grid gap-2 mt-4">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={navigateToSignIn}
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Go to Sign In Page
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setShowSuccessPopup(false)}
                  >
                    Stay on This Page
                  </button>
                </div>
              </div>
              <div className="modal-footer border-0 justify-content-center">
                <small className="text-muted">
                  You will be redirected to sign in page in 10 seconds...
                </small>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Auto-redirect after success */}
      {showSuccessPopup && (
        <AutoRedirect 
          onRedirect={navigateToSignIn} 
          delay={10000} 
        />
      )}
    </div>
  );
};

// Auto Redirect Component
const AutoRedirect = ({ onRedirect, delay = 10000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRedirect();
    }, delay);
    
    return () => clearTimeout(timer);
  }, [onRedirect, delay]);
  
  return null;
};

export default AdminForm;