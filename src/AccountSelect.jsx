import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './store';

function AccountSelect() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, currentUser } = useSelector(state => state.user);

  const handleChange = (e) => {
    const value = e.target.value;

    if (value === 'signin') {
      navigate('/SignIn');
    } else if (value === 'signup') {
      navigate('/SignUp');
    } else if (value === 'logout') {
      dispatch(logoutUser());
    }

    e.target.value = '';
  };

  return (
    <select
      className="form-select bg-dark text-warning border border-warning rounded-pill"
      onChange={handleChange}
      defaultValue=""
      aria-label="Account options"
      style={{ minWidth: '140px' }}
    >
      <option className="text-light bg-dark" value="" disabled>
        {isAuthenticated ? currentUser?.userName || 'Account' : 'Account'}
      </option>

      {!isAuthenticated && <option value="signin">Sign In</option>}
      {!isAuthenticated && <option value="signup">Sign Up</option>}
      {isAuthenticated && <option value="logout">Log Out</option>}
    </select>
  );
}

export default AccountSelect;
