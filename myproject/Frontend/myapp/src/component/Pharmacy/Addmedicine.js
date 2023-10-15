import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import Login from '../Login/Login';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';


const Addmedicine = () => {
    const navigate = useNavigate();
    const userdata = useSelector((state) => state.check.value)
    const [selectedFile, setSelectedFile] = useState(null);
    const initialValues = {
        name: '',
        brandname: '',
        category: '',
        description: '',
        saltcomposition: '',
        totalstock: '',
        unitprice: '',
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        brandname: Yup.string().required('Brandname is required'),
        category: Yup.string().required('Category is required'),
        totalstock: Yup.number().required('Total Stock is required'),
        unitprice: Yup.string().required('Unit price is required'),

    });


    const handleSubmit = async (values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('brandname', values.brandname);
        formData.append('category', values.category);
        formData.append('description', values.description);
        formData.append('saltcomposition', values.saltcomposition);
        formData.append('totalstock', values.totalstock);
        formData.append('unitprice', values.unitprice);
        formData.append('medicine_image', selectedFile);
        formData.append('pharmacyid',userdata.id)
        console.log(formData);
        try {
            const response = await axios.post(
                'http://127.0.0.1:5001//medicines/add',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Response:', response.data);
            alert("Medicine Added")
            navigate('/login/pharmacy')

        } catch (error) {
            console.error('Error:', error);
        }

        setSubmitting(false);
    };

    return (
        <>
            {
                userdata.role ?
                    (
                        <div className='myaddmed'>

                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>


                                <Form className='myaddmed1'>
                                    <h3 style={{ display: "flex", justifyContent: "center" }}>Add Medicine</h3>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">
                                            Name
                                        </label>
                                        <Field type="text" id="name" name="name" className="form-control" />
                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="brandname" className="form-label">
                                            Brand Name
                                        </label>
                                        <Field type="text" id="brandname" name="brandname" className="form-control" />
                                        <ErrorMessage name="brandname" component="div" className="text-danger" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="category" className="form-label">
                                            Category
                                        </label>
                                        <Field type="text" id="category" name="category" className="form-control" />
                                        <ErrorMessage name="category" component="div" className="text-danger" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">
                                            Description
                                        </label>
                                        <Field as="textarea" id="description" name="description" className="form-control" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="saltcomposition" className="form-label">
                                            Salt Composition
                                        </label>
                                        <Field type="text" id="saltcomposition" name="saltcomposition" className="form-control" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="totalstock" className="form-label">
                                            Total Stock
                                        </label>
                                        <Field type="number" id="totalstock" name="totalstock" className="form-control" />
                                        <ErrorMessage name="totalstock" component="div" className="text-danger" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="unitprice" className="form-label">
                                            Unit Price
                                        </label>
                                        <Field type="number" id="unitprice" name="unitprice" className="form-control" />
                                        <ErrorMessage name="unitprice" component="div" className="text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="image" className="form-label">
                                            Image
                                        </label>
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

                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary">
                                            Submit
                                        </button>

                                    </div>

                                </Form>

                            </Formik>
                        </div>
                    )
                    : <Login />
            }
        </>


    );
};

export default Addmedicine;
