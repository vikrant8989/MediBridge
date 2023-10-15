import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Login from '../Login/Login';
import axios from 'axios';

const Addprescription = () => {
  const userdata = useSelector((state) => state.check.value);
  console.log(userdata.id);
  const [appointments, setAppointments] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [medicineFields, setMedicineFields] = useState([{ name: '' }]);
  const [uid, setuid] = useState();


  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5004/appointment/" + userdata.id);
      console.log(response.data);
      setAppointments(response.data);
    } catch (error) {
      document.getElementById("dynamicdiv").innerText = "No Appointment found";
    }
  };

  useEffect(() => {
    fetchData();
  }, [userdata.id]);

  const handleAddPrescriptionClick = (uid) => {
    setuid(uid)
    console.log(uid)
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Get the medicine data from the fields
    const medicines = medicineFields.map((field) => field.name);
    const currentDate = new Date().toISOString().split('T')[0];
    const data = {"userid":uid,"doctorid":userdata.id,"medicines":medicines,created_at:currentDate};
    console.log(data)
    try {
        axios.post("http://127.0.0.1:5003//prescription/add",data)
          .then((response) => {
            console.log(response.data);
            if(response.data["error"] && response.data["error"] == "An error occurred while adding the prescription")
            {
              document.getElementById("dynamicdiv").innerText = "Sorry! some error occured";
            }
            else{
            alert("Prescription Added")
            }
          })
      } catch (error) {
        document.getElementById("dynamicdiv").innerText = "Sorry! some error occured";
      }
    setIsFormVisible(false);
  };

  const addMedicineField = () => {
    // Add a new empty medicine field
    setMedicineFields([...medicineFields, { name: '' }]);
  };

  const removeMedicineField = (index) => {
    // Remove a medicine field by index
    const updatedFields = [...medicineFields];
    updatedFields.splice(index, 1);
    setMedicineFields(updatedFields);
  };

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
      {userdata.role ? (
        appointments ? (
          <div>
            <h2 style={{ display: "flex", justifyContent: "center", margin: "2%" }}>Appointments</h2>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Patient Name</th>
                  <th style={thStyle}>Doctor Name</th>
                  <th style={thStyle}>Date and Time</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.username}>
                    <td style={tdStyle}>{appointment.username}</td>
                    <td style={tdStyle}>{userdata.username}</td>
                    <td style={tdStyle}>{appointment.created_at}</td>
                    <td style={tdStyle}>
                      <button
                        onClick={() =>{handleAddPrescriptionClick(appointment.userid)}}
                        style={{
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          padding: '10px 20px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          textDecoration: 'none',
                        }}
                      >
                        Add Prescription
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Outlet />
          </div>
        ) : (
          <h4 id='dynamicdiv'></h4>
        )
      ) : (
        <Login />
      )}

      {/* Render the pop-up form conditionally */}
      {isFormVisible && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '4px',
            }}
          >
            <h3>Add Prescription</h3>
            <form onSubmit={handleFormSubmit}>
              {medicineFields.map((field, index) => (
                <div key={index}>
                  <label htmlFor={`medicine${index + 1}`}>Medicine {index + 1}:</label>
                  <input
                    type="text"
                    id={`medicine${index + 1}`}
                    name={`medicine${index + 1}`}
                    value={field.name}
                    onChange={(e) => {
                      const updatedFields = [...medicineFields];
                      updatedFields[index].name = e.target.value;
                      setMedicineFields(updatedFields);
                    }}
                  />
                  <button type="button" onClick={() => removeMedicineField(index)} style={{margin:"7px"}}>Remove</button>
                </div>
              ))}
              <div>
                <button type="button" onClick={addMedicineField} style={{margin:"7px"}}>Add Medicine</button>
                <button type="submit">Submit</button>
                <button onClick={() => setIsFormVisible(false)} style={{margin:"7px"}}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Addprescription;
