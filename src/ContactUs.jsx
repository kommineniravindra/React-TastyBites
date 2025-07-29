import React, { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Custom hover effects (defined below)

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
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Hero Header */}
      <div className="py-5 text-white text-center" style={{ background: 'linear-gradient(to right, #007bff, #6610f2)' }}>
        <div className="container">
          <h1 className="display-5 fw-bold">Contact Us</h1>
          <p className="lead">Have questions or suggestions? Let’s talk!</p>
        </div>
      </div>

      {/* Main Section */}
      <div className="container-xxl py-5">
        <div className="row g-5">
          {/* Contact Info */}
          <div className="col-lg-4">
            <div className="contact-card h-100">
              <h4 className="mb-4 text-primary">Reach Out Directly</h4>
              <p><i className="bi bi-envelope-fill text-danger me-2"></i><strong>Email:</strong> kommineniravindra99@gmail.com</p>
              <p><i className="bi bi-telephone-fill text-success me-2"></i><strong>Phone:</strong> +91 960 326 2008</p>
              <p><i className="bi bi-geo-alt-fill text-warning me-2"></i><strong>Address:</strong> 123 E-commerce Street, Cyberabad, Hyderabad</p>
              <div className="mt-4">
                <h6 className="text-muted">Business Hours</h6>
                <p>Mon – Sat: 9:00 AM – 6:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8 col-xl-9">
            <div className="contact-card">
              <div className="card-body p-5 bg-light rounded-4">
                <Formik
                  initialValues={{ user_name: '', user_email: '', subject: '', message: '' }}
                  validationSchema={ContactSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form ref={formRef} noValidate>
                      <div className="mb-4">
                        <label htmlFor="user_name" className="form-label fs-5">Your Name</label>
                        <Field type="text" name="user_name" className="form-control form-control-lg" placeholder="John Doe" />
                        <ErrorMessage name="user_name" component="div" className="text-danger small" />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="user_email" className="form-label fs-5">Your Email</label>
                        <Field type="email" name="user_email" className="form-control form-control-lg" placeholder="you@example.com" />
                        <ErrorMessage name="user_email" component="div" className="text-danger small" />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="subject" className="form-label fs-5">Subject</label>
                        <Field type="text" name="subject" className="form-control form-control-lg" placeholder="What's this about?" />
                        <ErrorMessage name="subject" component="div" className="text-danger small" />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="message" className="form-label fs-5">Message</label>
                        <Field as="textarea" name="message" rows="7" className="form-control form-control-lg" placeholder="Write your message here..." />
                        <ErrorMessage name="message" component="div" className="text-danger small" />
                      </div>

                      <button type="submit" className="btn btn-primary btn-lg w-100 py-3 hover-glow" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
