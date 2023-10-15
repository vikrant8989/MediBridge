import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../dashboard.css'
import { useSelector } from 'react-redux';

const Doctornavbar = () => {
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.check.value)
  const [showPrescription, setShowPrescription] = useState(false);

  const togglePrescription = () => {
    setShowPrescription(!showPrescription);
    navigate('/addprescription');
  };

  return (
    <nav className="mynavbar navbar navbar-expand-lg navbar-light">
      <Link className="mynavbarbrand" to="/home">
        •MediBridge•
      </Link>
      <button
        className="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navb"
        aria-expanded="true"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse hide mynavbarcontent" id="navbarSupportedContent">
        <ul className="navbar-nav mynavbaritem1">
          <li className="nav-item">
            <p className='nameset'>Welcome Dr {userdata.username}</p>
          </li>
        </ul>
        <ul className="nav navbar-nav mynavbaritem2">
          <li className="nav-item">
          <button onClick={togglePrescription} style={{fontFamily:"sans-serif",fontWeight:"bold"}}>View Appointment</button>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/logout" style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>
              <span className="fa-solid fa-right-from-bracket"></span> Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Doctornavbar;

