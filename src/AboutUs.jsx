import React from 'react';
import Footer from './Footer';
import './App.css'; // Custom styles
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUs = () => {
  const features = [
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
  ];

  const aboutSections = [
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
  ];

  const accordionData = [
    {
      question: "What cuisines do you offer?",
      answer: "We provide a wide range of cuisines including Indian, Chinese, Italian, and continental dishes.",
    },
    {
      question: "How can I track my order?",
      answer: "Once placed, you can track your delivery partner in real-time from the orders page.",
    },
    {
      question: "Do you support QR payments?",
      answer: "Yes, we support secure QR code payments powered by Razorpay.",
    },
    {
      question: "What if my order is late?",
      answer: "In case of late delivery, you can reach our support 24/7 for assistance or compensation.",
    },
  ];

  const timeline = [
    { year: '2021', event: 'App Launched with basic food ordering' },
    { year: '2022', event: 'Introduced Razorpay & QR Payment Integration' },
    { year: '2023', event: 'Launched Real-Time Order Tracking' },
    { year: '2024', event: 'Added AI Chatbot & Multi-language Support' },
  ];

  return (
    <div className="bg-white text-dark">
      {/* Hero */}
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

      {/* Features */}
      <div className="container py-5">
        <h2 className="text-center bg-danger text-white py-3 rounded mb-5 fs-3">Why Choose Us?</h2>
        <div className="row g-4">
          {features.map((feature, idx) => (
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

      {/* About Cards */}
      <div className="container py-5">
        <div className="row g-4">
          {aboutSections.map((block, idx) => (
            <div className="col-md-6" key={idx}>
              <div className="card bg-light border-0 shadow-sm rounded h-100 p-4 text-center card-hover">
                <h5 className="mb-3">{block.title}</h5>
                <p className="text-muted">{block.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accordion - FAQ */}
      <div className="container py-5">
        <h2 className="text-center mb-4 text-danger">Frequently Asked Questions</h2>
        <div className="accordion" id="faqAccordion">
          {accordionData.map((item, idx) => (
            <div className="accordion-item" key={idx}>
              <h2 className="accordion-header" id={`heading${idx}`}>
                <button
                  className={`accordion-button ${idx !== 0 ? 'collapsed' : ''}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${idx}`}
                >
                  {item.question}
                </button>
              </h2>
              <div
                id={`collapse${idx}`}
                className={`accordion-collapse collapse ${idx === 0 ? 'show' : ''}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="container py-5">
        <h2 className="text-center text-primary mb-4">Our Journey</h2>
        <ul className="timeline list-unstyled">
          {timeline.map((item, idx) => (
            <li key={idx} className="mb-4">
              <div className="d-flex align-items-center gap-3">
                <span className="badge bg-dark rounded-pill px-3">{item.year}</span>
                <span>{item.event}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Video Section */}
      <div className="container py-5">
        <h2 className="text-center text-danger mb-4">Watch How We Work</h2>
        <div className="ratio ratio-16x9">
        <iframe width="654" height="369" src="https://www.youtube.com/embed/IHGsdwkQwzM" title="Welcome To Tasty Bites Kitchen🥗🍝" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
