import React from 'react';
import './aboutus.css';


const AboutUs = () => {
  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>ABOUT US</h1>
      </div>
          <div className="features-container">

      <div className="card-grid">
        <div className="feature-card">
          <i className="fas fa-bolt icon red" />
          <h3>Fast Delivery</h3>
          <p>Lightning-fast order delivery within 30 minutes.</p>
          <span className="badge green">Live</span>
        </div>

        <div className="feature-card">
          <i className="fas fa-lock icon red" />
          <h3>Secure Payments</h3>
          <p>Payments powered by Razorpay & QR Code scan.</p>
          <span className="badge blue">Active</span>
        </div>

        <div className="feature-card">
          <i className="fas fa-tags icon red" />
          <h3>Coupons & Offers</h3>
          <p>Daily discounts and festival coupon codes.</p>
          <span className="badge yellow">Available</span>
        </div>

        <div className="feature-card">
          <i className="fas fa-utensils icon red" />
          <h3>Multi-Cuisine Menu</h3>
          <p>Veg, Non-Veg, Snacks, Beverages – all in one app.</p>
          <span className="badge sky">Trending</span>
        </div>

        <div className="feature-card">
          <i className="fas fa-truck icon red" />
          <h3>Live Order Tracking</h3>
          <p>Track your delivery partner in real time.</p>
          <span className="badge dark">In Progress</span>
        </div>

        <div className="feature-card">
          <i className="fas fa-headset icon red" />
          <h3>24/7 Support</h3>
          <p>Chatbot + human agent support for all issues.</p>
          <span className="badge gray">Online</span>
        </div>
      </div>
    </div>


      {/* Content Cards */}
      <div className="about-content">
        <div className="about-card">
          <h2>OUR STORY</h2>
          <p>
            We began with a passion for innovation and a desire to make a difference. From our humble beginnings, we’ve grown with integrity and purpose.
          </p>
        </div>

        <div className="about-card">
          <h2>OUR TEAM</h2>
          <p>
            Our team is made up of professionals dedicated to excellence. We value collaboration, creativity, and commitment in everything we do.
          </p>
        </div>

        <div className="about-card">
          <h2>OUR HISTORY</h2>
          <p>
            Over the years, we've reached major milestones and helped countless clients achieve success through our consistent quality and innovation.
          </p>
        </div>

        <div className="about-card">
          <h2>OUR FUTURE</h2>
          <p>
            Looking ahead, we aim to lead with sustainability, embrace new technologies, and continue growing stronger together with our partners.
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default AboutUs;
