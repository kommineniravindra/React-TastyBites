import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from './store';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import './App.css'; // Optional for extra styling

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    alert("Registered successfully");
    navigate('/SignIn');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
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
              type="tel"
              placeholder="Phone Number"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit phone number"
                }
              })}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
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
