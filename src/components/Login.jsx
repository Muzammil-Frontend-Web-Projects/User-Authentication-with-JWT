import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  
  const { login, loading, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [email, password]);

  const validateForm = () => {
    const errors = {};
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled in auth context
      console.error('Login failed:', error);
    }
  };

  const handleDemoLogin = (demoType) => {
    if (demoType === 'user') {
      setEmail('user@example.com');
      setPassword('password123');
    } else {
      setEmail('admin@example.com');
      setPassword('admin123');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Sign in to your account</p>

        {error && (
          <div className="error-message">
            <span>⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={formErrors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {formErrors.email && (
              <span className="field-error">{formErrors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={formErrors.password ? 'error' : ''}
              placeholder="Enter your password"
            />
            {formErrors.password && (
              <span className="field-error">{formErrors.password}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="demo-section">
          <p className="demo-title">Demo Accounts:</p>
          <div className="demo-buttons">
            <button 
              type="button"
              className="demo-button user"
              onClick={() => handleDemoLogin('user')}
            >
              Load User Account
            </button>
            <button 
              type="button"
              className="demo-button admin"
              onClick={() => handleDemoLogin('admin')}
            >
              Load Admin Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;