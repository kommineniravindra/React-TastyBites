import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from './store';
import './SignIn.css';  // Modern CSS styling

function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
    alert("Login successful");
    navigate('/Veg');
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
        <input 
          type="text" 
          placeholder="Username" 
          {...register("userName", { required: "Username is required" })} 
          className={errors.userName ? 'error' : ''}
        />
        {errors.userName && <p className="error-message">{errors.userName.message}</p>}

        <input 
          type="password" 
          placeholder="Password" 
          {...register("password", { required: "Password is required" })} 
          className={errors.password ? 'error' : ''}
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}

        <button type="submit">Sign In</button>
      </form>
      <p className="redirect-message">
        New User? <Link to="/SignUp">Sign Up</Link>
      </p>
    </div>
  );
}

export default SignIn;
