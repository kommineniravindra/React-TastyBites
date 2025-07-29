import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./App.css";
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
import 'aos/dist/aos.css';
import AOS from 'aos';

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
import AccountSelect from './AccountSelect';

function App() {
  const cartItems = useSelector((state) => state.cart);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand text-warning fw-bold fs-4" to="/Home">TastyBites</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-light d-flex align-items-center" to="/Home">
                  <HomeIcon size={18} className="me-1" /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light d-flex align-items-center" to="/Veg">
                  <Salad size={18} className="me-1" /> Veg
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light d-flex align-items-center" to="/NonVeg">
                  <Drumstick size={18} className="me-1" /> Non-Veg
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light d-flex align-items-center" to="/Drinks">
                  <Coffee size={18} className="me-1" /> Drinks
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light d-flex align-items-center" to="/Snacks">
                  <Popcorn size={18} className="me-1" /> Snacks
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light d-flex align-items-center" to="/Cart">
                  <ShoppingCart size={18} className="me-1" /> Cart
                  {cartItemCount > 0 && (
                    <span className="badge bg-warning text-dark ms-2 rounded-pill badge-animate">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light d-flex align-items-center" to="/Order">
                  <Package size={18} className="me-1" /> Order
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light d-flex align-items-center" to="/ContactUs">
                  <Phone size={18} className="me-1" /> Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light d-flex align-items-center" to="/AboutUs">
                  <Info size={18} className="me-1" /> About
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              <AccountSelect />
            </div>
          </div>
        </div>
      </nav>

      {/* Padding below fixed navbar */}
      <div style={{ paddingTop: '70px' }}>
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
      </div>
    </BrowserRouter>
  );
}

export default App;
