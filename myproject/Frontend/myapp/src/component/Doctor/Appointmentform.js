import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './appointmentform.css'
import { useParams } from 'react-router';
import axios from 'axios';

const AppointmentForm = (props) => {
  const { did } = useParams()
  const initialValues = {
    date: '',
    time: '',
  };

  const validationSchema = Yup.object({
    date: Yup.string().required('Date is required'),
    time: Yup.string().required('Time is required'),
  });

  const handleSubmit = (values) => {
    var appointment_datetime = values.date + " " + values.time;
    console.log(appointment_datetime, typeof (appointment_datetime))
    try {
      axios.post("http://127.0.0.1:5004/book_appointment/" + did + "/" + props.handler.id + "/" + appointment_datetime)
        .then((response) => {
          console.log(response.data);
          if(response.data === "No")
          document.getElementById("dynamicset").innerText = "Sorry, This slot is not availiable, Check for other Slot!"
          else{
          document.getElementById("dynamicset").innerText = "Congratulation! Appointment Booked [Date and Time] " + response.data.appointment_datetime;
          }
        })
    } catch (error) {
      alert("Some error occurred");
    }
  };

  return (
    <div className="appointment-form-container">
      <div className="form">
        <h2>Schedule an Appointment</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <Field
                type="date"
                id="date"
                name="date"
                required
              />
              <ErrorMessage name="date" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time:</label>
              <Field
                type="time"
                id="time"
                name="time"
                required
              />
              <ErrorMessage name="time" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <button type="submit" className="submit-button">
                Schedule
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <div>
        <p id='dynamicset' style={{fontFamily:'sans-serif' , fontWeight:"bold"}}></p>
      </div>
    </div>


  );
}

export default AppointmentForm;
