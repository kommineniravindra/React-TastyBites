import React, { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContactUs.css';

function ContactUs() {
  const formRef = useRef(null);

  const ContactSchema = Yup.object().shape({
    user_name: Yup.string()
      .min(2, 'Name is too short!')
      .max(50, 'Name is too long!')
      .required('Name is required'),
    user_email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    subject: Yup.string()
      .min(5, 'Subject is too short!')
      .max(100, 'Subject is too long!')
      .required('Subject is required'),
    message: Yup.string()
      .min(10, 'Message is too short!')
      .max(500, 'Message is too long!')
      .required('Message is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      toast.info('Sending your message...');
      setSubmitting(true);

      await emailjs.sendForm(
        'service_k7bc7r4',
        'template_vvsijhq',
        formRef.current,
        'L9AQ2DmFmPSb1gJi2'
      );

      toast.success('Message sent successfully! We will get back to you soon.');
      resetForm();
    } catch (error) {
      console.error('Email sending failed:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-us-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <h2>Contact Us</h2>
      <p className="contact-intro">
        Have a question or feedback? We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
      </p>

      <div className="contact-details-section">
        <h3>Reach Out Directly</h3>
        <p><strong>Email:</strong> kommineniravindra99@gmail.com</p>
        <p><strong>Phone:</strong> +91 960 326 2008</p>
        <p><strong>Address:</strong> 123 E-commerce Street, Cyberabad, Hyderabad, India</p>
      </div>

      <Formik
        initialValues={{ user_name: '', user_email: '', subject: '', message: '' }}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form ref={formRef} className="contact-form" noValidate>
            <div className="form-group">
              <label htmlFor="user_name">Your Name:</label>
              <Field
                type="text"
                id="user_name"
                name="user_name"
                placeholder="Enter your name"
                aria-required="true"
              />
              <ErrorMessage name="user_name" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="user_email">Your Email:</label>
              <Field
                type="email"
                id="user_email"
                name="user_email"
                placeholder="Enter your email"
                aria-required="true"
              />
              <ErrorMessage name="user_email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <Field
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject of your message"
                aria-required="true"
              />
              <ErrorMessage name="subject" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <Field
                as="textarea"
                id="message"
                name="message"
                rows="6"
                placeholder="Type your message here..."
                aria-required="true"
              />
              <ErrorMessage name="message" component="div" className="error-message" />
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ContactUs;