import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from './Loginslice';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().required('Role is required'), // Add validation for role
  });

  const initialValues = {
    username: '',
    password: '',
    role: 'user', // Set the initial role to 'user'
  };

  const handleSubmit = (values, { setSubmitting }) => {
    let apiUrl = '';

    switch (values.role) {
      case 'user':
        apiUrl = 'http://127.0.0.1:5002/login/user';
        break;
      case 'doctor':
        apiUrl = 'http://127.0.0.1:5000/Doctor/login';
        break;
      case 'pharmacy':
        apiUrl = 'http://127.0.0.1:5001/pharmacies/login';
        break;
      default:
        break;
    }
    axios
      .get(apiUrl, {
        headers: { 'Content-Type': 'application/json' },
        auth: { username: values.username, password: values.password },
      })
      .then((response) => {
        console.log(response);
        if (response.data === "Invalid Credential") {
          // alert("Invalid credentials");
          document.getElementById("dynamicdiv").innerText = "Wrong Credentials"
        }
        else {
          dispatch(login({ username: values.username, password: values.password, id: response.data.id, role: values.role }));
          if (values.role === "user") {
            navigate('/login/user');
          }
          else if (values.role === 'doctor') {
            navigate('/login/doctor');
          }
          else {
            navigate('/login/pharmacy');
          }
        }

      })
      .catch((error) => {
        alert('Wrong Credentials');
        document.getElementById("dynamicdiv").innerText = "Wrong Credentials"
        console.log(error);
      });

    setSubmitting(false);
  };

  return (
    <>
    <section className="text-center text-lg-start">
      <div className="card mb-3" style={{border:"none"}}>
        <div className="row g-0 d-flex align-items-center">
          {/* <h2 style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>Login</h2> */}
          <div className="col-lg-4 d-none d-lg-flex">
            <img
              src="/sample.png"
              alt="login pic"
              // className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
              style={{ height: "300px", width: "300px", marginLeft: "2px" }}
            />
          </div>
          <div className="col-lg-8">
            <div className="card-body py-5 px-md-5">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <h5 id='dynamicdiv' style={{marginBottom:"2%"}}></h5>
                  <div className="form-outline mb-4">
                    <Field
                      type="text"
                      id="username"
                      name="username"
                      className="form-control"
                      placeholder="User name"
                    />
                    <ErrorMessage name="username" component="div" className="text-danger" />
                  </div>

                  <div className="form-outline mb-4">
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                    />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="role">Select Role</label>
                    <Field as="select" id="role" name="role" className="form-control">
                      <option value="user">User</option>
                      <option value="doctor">Doctor</option>
                      <option value="pharmacy">Pharmacy</option>
                    </Field>
                    <ErrorMessage name="role" component="div" className="text-danger" />
                  </div>

                  <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                      <div className="form-check">
                        <Field
                          type="checkbox"
                          id="rememberMe"
                          name="rememberMe"
                          className="form-check-input"
                        />
                        <label className="form-check-label" htmlFor="rememberMe">
                          Remember me
                        </label>
                      </div>
                    </div>

                    {/* <div className="col">
                    <a href="#!">Forgot password?</a>
                  </div> */}
                  </div>
                  <button type="submit" className="btn btn-primary btn-block mb-4">
                    Sign in
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default LoginForm;
