import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import './contactus.css';

function ContactUs (){
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Animate once, 1s duration
  }, []);

  return (
    <div className="contact-container">
      <div className="decor-left" data-aos="fade-right"></div>
      <div className="decor-right" data-aos="fade-left"></div>

      <section className="contact-content" data-aos="fade-up" data-aos-delay="200">
        <h1 className="contact-title">CONTACT US</h1>
        <p className="contact-subtext">
          The assurance of a prompt response, and we will get back to you as soon as possible,
          underscores attentiveness and commitment to addressing inquiries.
        </p>

        <div className="contact-box" data-aos="zoom-in" data-aos-delay="400">
          <h2>Send Us Message</h2>
          <form className="contact-form">
            <div className="row">
              <div className="input-group">
                <label>First Name <span>*</span></label>
                <input type="text" placeholder="First Name" required />
              </div>
              <div className="input-group">
                <label>Last Name <span>*</span></label>
                <input type="text" placeholder="Last Name" required />
              </div>
            </div>

            <div className="row">
              <div className="input-group">
                <label>Email <span>*</span></label>
                <input type="email" placeholder="Email" required />
              </div>
              <div className="input-group">
                <label>Phone Number <span>*</span></label>
                <input type="tel" placeholder="Phone" required />
              </div>
            </div>

            <div className="input-group full">
              <label>Description <span>*</span></label>
              <textarea placeholder="Write Message . . ." required></textarea>
            </div>

            <div className="input-group full">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
