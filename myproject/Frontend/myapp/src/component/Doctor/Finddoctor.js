import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
// import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Finddoctor = () => {
  const navigate = useNavigate();
  const initialValues = {
    role: 'problem',
    inputfield: '',
  };
  const validationSchema = Yup.object().shape({
    inputfield: Yup.string().required('Input is required'),
  });
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    let apiUrl = '';

    switch (values.role) {
      case 'problem':
        navigate("/search/doctor/"+values.inputfield)
        break;
      case 'spz':
        navigate("/search/doctors/"+values.inputfield)
        break;
      case 'others':
        navigate("/search/doctor2/"+values.inputfield)
        break;
      default:
        break;
    }
    setSubmitting(false);
  };
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form className='mysearchclass'>
        <div className="form-group">
          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fa-solid fa-face-smile fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <label htmlFor="role" style={{ fontFamily: "sans-serif", fontWeight: "bold", marginBottom: "1%" }}>Find Your Doctor</label>
              <Field as="select" id="role" name="role" className="form-control">
                <option value="problem">Problem</option>
                <option value="spz">Specialization</option>
                <option value="others">Others</option>
              </Field>
            </div>

          </div>
        </div>
        <div className="d-flex flex-row align-items-center mb-4">
          <i class="fa-solid fa-magnifying-glass fa-lg me-3 fa-fw"></i>
          <div className="form-outline flex-fill mb-0">
            <Field type="text" id="inputfield" name="inputfield" className="form-control" placeholder="Give your choice" />
          </div>
        </div>
        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
          <button type="submit" className="btn btn-primary btn-lg">
            Find
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default Finddoctor;
