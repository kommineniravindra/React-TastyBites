// src/components/SignUp.js

import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { registerUser } from './store'; // Assuming 'store' contains Redux setup and actions
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Assuming App.css contains general styles
import { ToastContainer, toast } from 'react-toastify'; // For displaying notifications
import 'react-toastify/dist/ReactToastify.css'; // Styles for react-toastify

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(); // React Hook Form for form management
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object to access state (e.g., from: "/Cart")
  const password = watch('password'); // Watch password field for confirmation validation

  const onSubmit = (data) => {
    dispatch(registerUser(data)); // Dispatch registerUser action to Redux store
    toast.success("Registered successfully! Please sign in."); // User feedback with toast
    // Navigate to SignIn page, passing the original 'from' state
    // So SignIn can redirect the user back to where they came from (e.g., /Cart)
    navigate('/SignIn', { state: location.state });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <ToastContainer position="top-right" autoClose={2000} /> {/* Toast container for notifications */}
      <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
              {...register("userName", { required: "Username is required" })}
            />
            {errors.userName && <div className="invalid-feedback">{errors.userName.message}</div>}
          </div>

          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <div className="mb-3">
            <input
              type="password"
              placeholder="Confirm Password"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: value => value === password || "Passwords do not match" 
              })}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword.message}</div>
            )}
          </div>

          <button type="submit" className="btn btn-dark w-100 mb-3">
            Sign Up
          </button>

          <p className="text-center">
            Already have an account? <Link to="/SignIn" className="text-primary">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
