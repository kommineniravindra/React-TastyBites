import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Importing Lucide React icons for App.jsx specific elements
import {
  Home as HomeIcon,
  Salad,
  Drumstick,
  Coffee,
  Popcorn,
  ShoppingCart,
  Package,
  Phone,
  Info
} from 'lucide-react';

// Assuming these components exist in the same directory
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

// Import the separated AccountSelect component
import AccountSelect from './AccountSelect';

//import './App.css'; // Import the CSS file for App component
import "./MyStyles.css"

// Main App component
function App() {
  // Get cart items from Redux store
  const cartItems = useSelector(state => state.cart);
  // Calculate total quantity of items in the cart
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      {/* Navigation Bar */}
      <nav className="navbar">
        {/* Removed Brand Name/Logo */}

        {/* Navigation Links - always visible */}
        <div className="nav-links">
          <Link className="nav-link" to="/Home">
            <HomeIcon size={20} /> Home
          </Link>
          <Link className="nav-link" to="/Veg">
            <Salad size={20} /> Veg
          </Link>
          <Link className="nav-link" to="/NonVeg">
            <Drumstick size={20} /> Non-Veg
          </Link>
          <Link className="nav-link" to="/Drinks">
            <Coffee size={20} /> Drinks
          </Link>
          <Link className="nav-link" to="/Snacks">
            <Popcorn size={20} /> Snacks
          </Link>
          <Link className="nav-link" to="/Cart">
            <ShoppingCart size={20} /> Cart({cartItemCount})
          </Link>
          <Link className="nav-link" to="/Order">
            <Package size={20} /> Order
          </Link>
          <Link className="nav-link" to="/ContactUs">
            <Phone size={20} /> Contact Us
          </Link>
          <Link className="nav-link" to="/AboutUs">
            <Info size={20} /> About Us
          </Link>
        </div>

        {/* Authentication Options - always visible */}
        <div className="auth-options">
          <AccountSelect />
        </div>
      </nav>

      {/* Route Definitions */}
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
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<FileNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
