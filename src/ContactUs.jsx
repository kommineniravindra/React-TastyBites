import React from 'react';
import './contactus.css';

const ContactUs = () => {
  return (
    <div className="contact-us">
      {/* Header with form */}
      <div className="contact-header">
        <div className="overlay">
          <div className="contact-text">
            <h2>CONTACT US</h2>
            <p>Need an expert? You are more than welcome to leave your contact info and we will be in touch shortly</p>
          </div>
          <form className="contact-form">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="email" placeholder="Email Address" />
            <textarea placeholder="Comments / Questions" rows="4"></textarea>
            <button type="submit">SEND</button>
          </form>
        </div>
      </div>

      {/* Contact info */}
      <div className="contact-info">
        <div className="info-box">
          <i className="fas fa-map-marker-alt"></i>
          <h4>VISIT US</h4>
          <p>London place street etc area,</p>
          <p>Elizabeth, London, UK</p>
        </div>
        <div className="info-box">
          <i className="fas fa-phone-alt"></i>
          <h4>CALL US</h4>
          <p>Elizabeth delivered data gain</p>
          <p>+91 9603262008</p>
        </div>
        <div className="info-box">
          <i className="fas fa-envelope"></i>
          <h4>MASSAGE US</h4>
          <p>Tasty</p>
          <p>kommineniravindra99@gmail.com</p>
        </div>
      </div>

      {/* Map */}
      <div className="map-container">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19809.043428360467!2d-0.13418425!3d51.509865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b3337f1b1fb%3A0x2af13c2b4ea86f9e!2sElizabeth%20Tower!5e0!3m2!1sen!2suk!4v1623497414022!5m2!1sen!2suk"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Footer */}
      <div className="contact-footer">
        <h3>FOLLOW US</h3>
        <div className="social-icons">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-google-plus-g"></i>
          <i className="fab fa-linkedin-in"></i>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
