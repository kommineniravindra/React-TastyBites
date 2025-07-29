import React from "react";

import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="custom-footer bg-dark text-white mt-5 pt-4">
      <div className="container-fluid px-4">
        <div className="text-center mb-4">
          <h2 className="mb-2">Tasty Bite's</h2>
          <p className="footer-text">
            Our team is made up of professionals dedicated to excellence.
            <br />
            We value collaboration, creativity, and commitment in everything we do.
          </p>
        </div>

        <div className="d-flex justify-content-center gap-3 mb-4 social-icons">
          <a href="#"><FaFacebookF className="text-white fs-5" /></a>
          <a href="#"><FaTwitter className="text-white fs-5" /></a>
          <a href="#"><FaGooglePlusG className="text-white fs-5" /></a>
          <a href="#"><FaYoutube className="text-white fs-5" /></a>
          <a href="#"><FaLinkedinIn className="text-white fs-5" /></a>
        </div>

        <div className="footer-bottom text-center border-top border-secondary pt-3">
          <p className="mb-1">
            &copy; {new Date().getFullYear()} <span className="fw-bold">Tasty Bite's</span>
          </p>
          <div className="d-flex justify-content-center gap-4 mt-2">
            <a href="/" className="text-white text-decoration-none">Home</a>
            <a href="/about" className="text-white text-decoration-none">About</a>
            <a href="/contact" className="text-white text-decoration-none">Contact</a>
            <a href="/blog" className="text-white text-decoration-none">Blog</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
