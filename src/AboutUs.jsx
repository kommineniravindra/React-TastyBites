import React from 'react';
import './aboutus.css';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>ABOUT US</h1>
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
