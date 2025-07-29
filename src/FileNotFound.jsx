// Error.jsx
import React from 'react';


const FileNotFound = () => {
  return (
    <section className="error-section">
      <div className="container">
        <div className="row">
          <div className="column">
            <div className="error-box">
              <h2 className="error-code">404</h2>
              <h4 className="error-title">Oops! That page can’t be found</h4>
              <p className="error-description">The page you are looking for it maybe deleted</p>
              <a href="/" className="home-link">
                Go To Home
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="error-background">
        <div className="bg-stripe"></div>
        <div className="bg-double-stripe">
          <div className="bg-half"></div>
          <div className="bg-half"></div>
        </div>
        <div className="bg-stripe"></div>
      </div>
    </section>
  );
};

export default FileNotFound;
