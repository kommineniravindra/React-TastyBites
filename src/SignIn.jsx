import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from './store';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap import
import './App.css'; // Optional for extra styling

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
    <div className="container d-flex justify-content-center align-items-center vh-100">
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
