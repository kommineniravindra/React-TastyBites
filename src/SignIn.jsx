// src/components/SignIn.js

import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { loginUser } from './store'; // Assuming 'store' contains Redux setup and actions
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Assuming App.css contains general styles
import { ToastContainer, toast } from 'react-toastify'; // For displaying notifications
import 'react-toastify/dist/ReactToastify.css'; // Styles for react-toastify

function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
    toast.success("Login successful!");
    
    // Introduce a small delay to allow Redux state to update
    setTimeout(() => {
      // Check for a redirect path in the state, otherwise default to '/Veg'
      // It should typically be '/Cart' if coming from checkout flow
      const from = location.state?.from || '/Veg';
      navigate(from, { replace: true }); // Use replace to prevent going back to SignIn/SignUp via browser back button
    }, 100); // 100ms delay, adjust if needed
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <ToastContainer position="top-right" autoClose={2000} /> {/* Toast container for notifications */}
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
              {...register("userName", { required: "Username is required" })}
            />
            {errors.userName && (
              <div className="invalid-feedback">{errors.userName.message}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Sign In
          </button>
        </form>

        <p className="text-center mt-3">
          New User? <Link to="/SignUp" className="text-primary">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
