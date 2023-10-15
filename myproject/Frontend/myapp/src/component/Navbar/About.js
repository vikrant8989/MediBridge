import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className='myouterabout'>
      <div className="card myaboutcard">
        <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
          <img src="./doctorconn.webp" className="img-fluid" alt="Card Image" />
          <Link to="#!">
            <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
          </Link>
        </div>
        <div className="card-body" style={{backgroundColor:"rgb(175,255,243)"}}>
          <h5 className="card-title" style={{fontFamily:"sans-serif",fontSize:"25px" ,fontWeight:"bold"}}>About Us</h5>
          <p className="card-text" style={{fontFamily:"sans-serif", fontSize:"18px"}}>At Medibridge, we are committed to revolutionizing healthcare accessibility and enhancing the well-being of individuals and communities. Our mission is to connect healthcare seekers with trusted medical professionals 
          seamlessly, providing convenient access to quality healthcare services.</p>
        </div>
      </div>
      <div className="card myaboutcard">
        <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
          <img src="./doctorconn.webp" className="img-fluid" alt="Card Image" />
          <Link to="#!">
            <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
          </Link>
        </div>
        <div className="card-body" style={{backgroundColor:"rgb(175,255,243)"}}>
          <h5 className="card-title" style={{fontFamily:"sans-serif",fontSize:"25px" ,fontWeight:"bold"}}>Who We Are</h5>
          <p className="card-text"  style={{fontFamily:"sans-serif", fontSize:"18px"}}>Medibridge is a passionate team of healthcare enthusiasts, technologists, and innovators who believe that everyone deserves access to reliable healthcare resources. We have embarked on a journey to bridge the gap between patients and healthcare providers, making it easier for individuals
           to access the care they need, when they need it.</p>
        </div>
      </div>
      <div className="card myaboutcard">
        <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
          <img src="./doctorconn.webp" className="img-fluid" alt="Card Image" />
          <Link to="#!">
            <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
          </Link>
        </div>
        <div className="card-body" style={{backgroundColor:"rgb(175,255,243)"}}>
          <h5 className="card-title" style={{fontFamily:"sans-serif",fontSize:"25px" ,fontWeight:"bold"}}>Our Vision</h5>
          <p className="card-text"  style={{fontFamily:"sans-serif", fontSize:"18px"}}>Our vision is a world where healthcare is not just a service but a fundamental right. We envision a future where healthcare decisions are informed, accessible, and patient-centric. Medibridge strives to empower individuals with the
           knowledge and tools to make informed healthcare choices.</p>
        </div>
      </div>
      <div className="card myaboutcard">
        <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
          <img src="./doctorconn.webp" className="img-fluid" alt="Card Image" />
          <Link to="#!">
            <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
          </Link>
        </div>
        <div className="card-body" style={{backgroundColor:"rgb(175,255,243)"}}>
          <h5 className="card-title" style={{fontFamily:"sans-serif",fontSize:"25px" ,fontWeight:"bold"}}>What We Do</h5>
          <p className="card-text"  style={{fontFamily:"sans-serif", fontSize:"18px"}}>Medibridge provides a user-friendly platform that connects patients and doctors, facilitating appointments, consultations, and access to medical information. Our innovative solutions are designed to simplify the healthcare journey, from finding
           the right specialist to managing health records and appointment scheduling.</p>
        </div>
      </div>
    </div>


  );
}

export default About;
