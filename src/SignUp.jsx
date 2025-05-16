import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from './store';
import './SignUp.css';  // Import the CSS file

function SignUp() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    alert("Registered successfully");
    navigate('/SignIn');
  };

  // Watch password to validate confirm password
  const password = watch('password');

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">

        <input 
          type='text' 
          placeholder='Username' 
          {...register("userName", { required: "Username is required" })}
          className={errors.userName ? 'error' : ''}
        />
        {errors.userName && <p className="error-message">{errors.userName.message}</p>}

        <input 
          type='email' 
          placeholder='Email' 
          {...register("email", { 
            required: "Email is required", 
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address"
            }
          })}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}

        <input 
          type='tel' 
          placeholder='Phone Number' 
          {...register("phone", { 
            required: "Phone number is required", 
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter a valid 10-digit phone number"
            }
          })}
          className={errors.phone ? 'error' : ''}
        />
        {errors.phone && <p className="error-message">{errors.phone.message}</p>}

        <input 
          type='password' 
          placeholder='Password' 
          {...register("password", { 
            required: "Password is required", 
            minLength: { value: 6, message: "Password must be at least 6 characters" }
          })} 
          className={errors.password ? 'error' : ''}
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}

        <input 
          type='password' 
          placeholder='Confirm Password' 
          {...register("confirmPassword", { 
            required: "Confirm Password is required", 
            validate: value => value === password || "Passwords do not match"
          })} 
          className={errors.confirmPassword ? 'error' : ''}
        />
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}

        <button type='submit'>Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/SignIn">Sign In</Link></p>
    </div>
  );
}

export default SignUp;
