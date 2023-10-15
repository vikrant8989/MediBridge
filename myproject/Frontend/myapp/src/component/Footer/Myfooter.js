import React from 'react';
import { Link } from 'react-router-dom';

const Myfooter = () => {
  return (
    <footer className="bg-light text-center text-lg-start" style={{marginTop:"3%"}}>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', fontFamily:"sans-serif", fontWeight:"bold" }}>
        © {new Date().getFullYear()} Copyright:
        <Link to="/" className="text-dark">MediBridge</Link>
      </div>
    </footer>
  );
}

export default Myfooter;
