import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Contact = () => {
  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    message: Yup.string().required('Message is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission here, e.g., send data to a server
    console.log('Form data:', values);
    // alert("Our team will contact you soon")
    document.getElementById("dynamicdiv").innerText = "Sorry for any convenience ! Our team will contact you soon, Thank you";
    resetForm();
  };

  return (
    <div className='contactform'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className='mycontactform'>
      <h3 style={{marginLeft:"18%"}}>Contact Us</h3>
          <div>
            <label htmlFor="name">Name:</label>
            <Field type="text" id="name" name="name" style={{width:"100%"}} />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" id="email" name="email" style={{width:"100%"}}/>
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <Field as="textarea" id="message" name="message"  style={{width:"100%"}}/>
            <ErrorMessage name="message" component="div" className="error" />
          </div>

          <button type="submit" style={{backgroundColor:"#007bff", color:"white",border:"none",padding:"10px 20px",borderRadius:"5px",cursor:"pointer",fontWeight:"bold"}}>Submit</button>
          <div id='dynamicdiv'>

          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Contact;
