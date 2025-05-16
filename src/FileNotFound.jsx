import React from 'react';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="notfound-bg">
      <div className="floating-stars"></div>

      <div className="notfound-container">
        <h1 className="glow-404">404</h1>
        <p className="notfound-text">Oops! The page you’re looking for doesn’t exist.</p>

        <div className="animated-character">
          {/* Placeholder SVG or emoji */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712079.png"
            alt="Lost Robot"
          />
        </div>

        <a href="/" className="notfound-home-btn">Return Home</a>
      </div>
    </div>
  );
};

export default NotFoundPage;
