import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Login from '../Login/Login';
import axios from 'axios';

const PrescriptionView = () => {
  const userdata = useSelector((state) => state.check.value)
  console.log(userdata.id)
  const [prescription, setPrescription] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5003/prescription/" + userdata.id);
      if (response.data["error"] && response.data["error"] === "No prescription found for the specified user") {
        document.getElementById("dynamicdiv").innerText = "No prescription found";
      }
      else if (response.data["error"] && response.data["error"] === "An error occurred while fetching prescriptions for the user") {
        document.getElementById("dynamicdiv").innerText = "Sorry! Some error occured"
      }
      else {
        setPrescription(response.data); // Store the data in the component state
      }

    } catch (error) {
      // alert("Some error occurred");
      document.getElementById("dynamicdiv").innerText = "Sorry! Some error occured"
    }
  };
  useEffect(() => {
    fetchData();
  }, [userdata.id]);

  const tableStyle = {
    width: '80%',
    margin: '0 auto',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    background: '#f2f2f2',
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  return (
    <>
      {userdata.role ?
        (prescription.length > 0 ? (<div>
          <h2 style={{ display: "flex", justifyContent: "center", margin: "2%" }}>Prescription</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Username</th>
                <th style={thStyle}>Doctor Name</th>
                <th style={thStyle}>Medicines</th>
                <th style={thStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {prescription.map((prescription, prescriptionIndex) => (
                <tr key={prescriptionIndex}>
                  <td style={tdStyle}>{userdata.username}</td>
                  <td style={tdStyle}>{prescription.doctorname}</td>
                  <td style={tdStyle}>
                    {prescription.medicines.map((medicine, medIndex) => (
                      <div key={medIndex}>{medicine}</div>
                    ))}
                  </td>
                  <td style={tdStyle}>{prescription.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}>
              Order Now
            </button>
          </div>
          <Outlet />
        </div>) : 
        <h4 id='dynamicdiv'></h4>)
        : <Login />
      }
    </>
  );
};

export default PrescriptionView;
