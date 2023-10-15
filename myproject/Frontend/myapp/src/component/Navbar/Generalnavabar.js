import React from 'react'
import { Link } from 'react-router-dom'

const Generalnavabar = () => {
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
                            <Link className="nav-link" to="/doctor/find" style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>
                                Find Doctors
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/search/medicine" style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>
                                Medicines
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about" style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>
                                About Us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact" style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav mynavbaritem2">
                        <li className="nav-item">
                            <Link className="nav-link" to="/register" style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>
                            <span className="fas fa-user"></span>Register
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login" style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>
                                <span className="fa-solid fa-right-to-bracket"></span> Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
  )
}

export default Generalnavabar