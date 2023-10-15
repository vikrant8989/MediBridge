import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, setFieldValue } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Registerdoctor = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
        // doctorImage: null,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        address: Yup.string().required('Address is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        phoneno: Yup.string()
            .matches(/^\d{10}$/, 'Phone number must be 10 digits')
            .required('Phone number is required'),
        agreeToTerms: Yup.boolean()
            .oneOf([true], 'You must agree to the Terms of Service')
            .required('You must agree to the Terms of Service'),
        // doctorImage: Yup.mixed().required('Doctor image is required'),
    });


    const handleSubmit = async (values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append('Dname', values.name);
        formData.append('Email', values.email);
        formData.append('Location', values.address);
        formData.append('Phone', values.phoneno);
        formData.append('Gender', values.gender);
        formData.append('Age', values.age);
        formData.append('Experience', values.experience);
        formData.append('Specialization', values.specialization);
        formData.append('Password', values.password);
        formData.append('doctor_image', selectedFile);
        try {
            const response = await axios.post(
                'http://127.0.0.1:5000/Doctors/Registration',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Response:', response.data);
            navigate("/login")
        } catch (error) {
            console.error('Error:', error);
        }

        setSubmitting(false);
    };

    return (
        <section className="vh-300" style={{margin: "3%" }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{border:"none"}}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        {/* <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Doctor</p> */}
                                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                            <Form className="mx-1 mx-md-4">
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <Field type="text" id="name" name="name" className="form-control" placeholder="Doctor Name" />
                                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <Field type="email" id="email" name="email" className="form-control" placeholder="Your Email" />
                                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-address-card fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <Field type="text" id="address" name="address" className="form-control" placeholder="Location" />
                                                        <ErrorMessage name="address" component="div" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fa-solid fa-phone fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <Field type="text" id="phoneno" name="phoneno" className="form-control" placeholder="Phone number" />
                                                    </div>
                                                    <ErrorMessage name="phoneno" component="div" className="text-danger" />
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i class="fa-solid fa-mars-and-venus fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <Field type="text" id="genderr" name="gender" className="form-control" placeholder="Gender" />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i class="fa-solid fa-person fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <Field type="text" id="age" name="age" className="form-control" placeholder="Age" />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i class="fa-solid fa-pen-fancy fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <Field type="text" id="experience" name="experience" className="form-control" placeholder="Experience" />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i class="fa-solid fa-pen-fancy fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <Field type="text" id="specialization" name="specialization" className="form-control" placeholder="Specialization" />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <Field type="password" id="password" name="password" className="form-control" placeholder="Password" />
                                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <Field
                                                            type="password"
                                                            id="confirmPassword"
                                                            name="confirmPassword"
                                                            className="form-control"
                                                            placeholder="Repeat your password"
                                                        />
                                                        <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-file-image fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="file"
                                                            id="doctorImage"
                                                            name="doctorImage"
                                                            onChange={(event) => {
                                                                const myfile = event.target.files[0]
                                                                setSelectedFile(myfile);
                                                            }}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-check d-flex justify-content-center mb-5">
                                                    <Field
                                                        type="checkbox"
                                                        className="form-check-input me-2"
                                                        id="agreeToTerms"
                                                        name="agreeToTerms"
                                                    />
                                                    <label className="form-check-label" htmlFor="agreeToTerms">
                                                        I agree all statements in <a href="#!">Terms of service</a>
                                                    </label>
                                                    <ErrorMessage name="agreeToTerms" component="div" className="text-danger" />
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary btn-lg">
                                                        Register
                                                    </button>
                                                </div>
                                            </Form>
                                        </Formik>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2" style={{ marginTop: "-20%" }}>
                                        <img
                                            src="./sample.png"
                                            className="img-fluid"
                                            alt="Sample image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registerdoctor;
