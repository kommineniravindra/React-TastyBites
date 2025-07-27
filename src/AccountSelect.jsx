import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, UserPlus } from 'lucide-react'; 
import './AccountSelect.css';

// Assuming logoutUser action is defined in store.js
import { logoutUser } from './store';

// AccountSelect component for user authentication options
function AccountSelect() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get authentication status and current user from Redux store
  const { isAuthenticated, currentUser } = useSelector(state => state.user);

  // Handler for select change
  const handleChange = (e) => {
    const value = e.target.value;

    if (value === 'signin') {
      navigate('/SignIn'); // Navigate to Sign In page
    } else if (value === 'signup') {
      navigate('/SignUp'); // Navigate to Sign Up page
    } else if (value === 'logout') {
      dispatch(logoutUser()); // Dispatch logout action
    }

    // Reset to default after action to allow re-selection
    e.target.value = '';
  };

  return (
    <select
      className="account-select"
      onChange={handleChange}
      defaultValue=""
      aria-label="Account options"
    >
      {/* Placeholder option, displays username if authenticated */}
      <option className="account-select-placeholder" value="" disabled>
        <User size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
        {isAuthenticated ? currentUser?.userName || 'Account' : "Account"}
      </option>

      {/* Show Sign In option if not authenticated */}
      {!isAuthenticated && (
        <option className="account-select-option signin-option" value="signin">
          <LogIn size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
          Sign In
        </option>
      )}
      {/* Show Sign Up option if not authenticated */}
      {!isAuthenticated && (
        <option className="account-select-option signup-option" value="signup">
          <UserPlus size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
          Sign Up
        </option>
      )}

      {/* Show Log Out option if authenticated */}
      {isAuthenticated && (
        <option className="account-select-option logout-option" value="logout">
          <LogIn size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> {/* Using LogIn for logout for now, could be LogOut if available */}
          Log Out
        </option>
      )}
    </select>
  );
}

export default AccountSelect;
