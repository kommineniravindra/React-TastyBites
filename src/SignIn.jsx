import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from './store';
import './SignIn.css';  // Import the CSS file

function SignIn() {
  const { register, handleSubmit } = useForm();
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
          {...register("userName", { required: true })} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          {...register("password", { required: true })} 
        />
        <button type="submit">Sign In</button>
      </form>
      <p>
        New User? <Link to="/SignUp">Sign Up</Link>
      </p>
    </div>
  );
}

export default SignIn;
