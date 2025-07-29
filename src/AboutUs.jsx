import React from 'react';
import Footer from './Footer';
import './App.css'; // <-- Ensure this includes your custom CSS

const AboutUs = () => {
  return (
    <div className="bg-white text-dark">
      {/* Hero Section */}
      <div
        className="d-flex align-items-center justify-content-center text-white"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '300px',
        }}
      >
        <h1 className="fs-1 px-4 py-2 bg-dark bg-opacity-50 rounded">ABOUT US</h1>
      </div>

      {/* Features Section */}
      <div className="container py-5">
        <h2 className="text-center bg-danger text-white py-3 rounded mb-5 fs-3">Why Choose Us?</h2>
        <div className="row g-4">
          {[
            {
              icon: 'fas fa-bolt',
              title: 'Fast Delivery',
              desc: 'Lightning-fast order delivery within 30 minutes.',
              badge: 'Live',
              color: 'success',
            },
            {
              icon: 'fas fa-lock',
              title: 'Secure Payments',
              desc: 'Payments powered by Razorpay & QR Code scan.',
              badge: 'Active',
              color: 'primary',
            },
            {
              icon: 'fas fa-tags',
              title: 'Coupons & Offers',
              desc: 'Daily discounts and festival coupon codes.',
              badge: 'Available',
              color: 'warning text-dark',
            },
            {
              icon: 'fas fa-utensils',
              title: 'Multi-Cuisine Menu',
              desc: 'Veg, Non-Veg, Snacks, Beverages – all in one app.',
              badge: 'Trending',
              color: 'info',
            },
            {
              icon: 'fas fa-truck',
              title: 'Live Order Tracking',
              desc: 'Track your delivery partner in real time.',
              badge: 'In Progress',
              color: 'dark',
            },
            {
              icon: 'fas fa-headset',
              title: '24/7 Support',
              desc: 'Chatbot + human agent support for all issues.',
              badge: 'Online',
              color: 'secondary',
            },
          ].map((feature, idx) => (
            <div className="col-md-4" key={idx}>
              <div className="card text-center shadow-sm border-0 h-100 p-4 card-hover">
                <i className={`${feature.icon} fs-3 text-danger mb-3`} />
                <h5>{feature.title}</h5>
                <p>{feature.desc}</p>
                <span className={`badge bg-${feature.color} mt-2`}>{feature.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Content Section */}
      <div className="container py-5">
        <div className="row g-4">
          {[
            {
              title: 'OUR STORY',
              text: `We began with a passion for innovation and a desire to make a difference. 
                     From our humble beginnings, we’ve grown with integrity and purpose.`,
            },
            {
              title: 'OUR TEAM',
              text: `Our team is made up of professionals dedicated to excellence. 
                     We value collaboration, creativity, and commitment in everything we do.`,
            },
            {
              title: 'OUR HISTORY',
              text: `Over the years, we've reached major milestones and helped countless clients 
                     achieve success through our consistent quality and innovation.`,
            },
            {
              title: 'OUR FUTURE',
              text: `Looking ahead, we aim to lead with sustainability, embrace new technologies, 
                     and continue growing stronger together with our partners.`,
            },
          ].map((block, idx) => (
            <div className="col-md-6" key={idx}>
              <div className="card bg-light border-0 shadow-sm rounded h-100 p-4 text-center card-hover">
                <h5 className="mb-3">{block.title}</h5>
                <p className="text-muted">{block.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
