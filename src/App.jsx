import React from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './Home';
import Veg from './Veg';
import NonVeg from './NonVeg';
import Cart from './Cart';
import Order from './Order';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import FileNotFound from './FileNotFound';
import Drink from './Drink';
import Snacks from './Snacks';
import SignUp from './SignUp';
import SignIn from './SignIn';

import './MyStyles.css';
import { logoutUser } from './store';

function AccountSelect() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, currentUser } = useSelector(state => state.user);

  // Handler for select change
  const handleChange = (e) => {
    const value = e.target.value;

    if (value === 'signin') {
      navigate('/SignIn');
    } else if (value === 'signup') {
      navigate('/SignUp');
    } else if (value === 'logout') {
      dispatch(logoutUser());
    }

    // Reset to default after action
    e.target.value = '';
  };

  return (
   <select
  className="account-select"
  onChange={handleChange}
  defaultValue=""
  aria-label="Account options"
>
  <option className="account-select-placeholder" value="" disabled>
    👤 {isAuthenticated ? currentUser?.userName :''}
  </option>

  {!isAuthenticated && (
    <option className="account-select-option signin-option" value="signin">
      Sign In
    </option>
  )}
  {!isAuthenticated && (
    <option className="account-select-option signup-option" value="signup">
      Sign Up
    </option>
  )}

  {isAuthenticated && (
    <option className="account-select-option logout-option" value="logout">
      Log Out
    </option>
  )}
</select>

  );
}

function App() {
  const cartItems = useSelector(state => state.cart);
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="brand-name">🍽️TASTY BITE'S</div>

        <div className="nav-links">
          <Link className="nav-link" to="/Home">🏠Home</Link>
          <Link className="nav-link" to="/Veg">🥗Veg</Link>
          <Link className="nav-link" to="/NonVeg">🍗Non-Veg</Link>
          <Link className="nav-link" to="/Drinks">🥤Drinks</Link>
          <Link className="nav-link" to="/Snacks">🍿Snacks</Link>
          <Link className="nav-link" to="/Cart">🛒Cart({count})</Link>
          <Link className="nav-link" to="/Order">📦Order📦</Link>
          <Link className="nav-link" to="/ContactUs">📞ContactUs</Link>
          <Link className="nav-link" to="/AboutUs">AboutUs</Link>
        </div>

        <div className="auth-options">
          <AccountSelect />
        </div>
      </nav>

      <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Veg" element={<Veg />} />
        <Route path="/NonVeg" element={<NonVeg />} />
        <Route path="/Drinks" element={<Drink />} />
        <Route path="/Snacks" element={<Snacks />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="*" element={<FileNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
