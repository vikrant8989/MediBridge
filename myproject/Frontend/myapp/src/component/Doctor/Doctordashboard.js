import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Doctordashboard = () => {
    const navigate = useNavigate();
    const { did } = useParams();
    const [doctorData, setDoctorData] = useState(null); // Initialize doctorData as null
    const handleBookAppointmentClick = () =>{
        navigate("/book/"+ did)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/Doctor/" + did);
                setDoctorData(response.data); // Store the data in the component state

            } catch (error) {
                document.getElementById("dynamicdiv").innerText = "Some error occurred";
            }
        };
        fetchData();
    }, [did]);

    // doctor card image
    return (
        <section className="vh-100" >
            {doctorData ?
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="6" className="mb-4 mb-lg-0">
                            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                                <MDBRow className="g-0">
                                    <MDBCol md="4" className="gradient-custom text-center text-white"
                                        style={{ backgroundColor: "#f08484", borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                        <MDBCardImage src={`http://127.0.0.1:5000/get_image/${doctorData.Dname}`} 
                                            alt="Avatar" className="my-5" style={{ width: '9000px', borderRadius:"500px" }} fluid />
                                        <MDBTypography tag="h5">{doctorData.Dname}</MDBTypography>
                                        <MDBCardText>{doctorData.Specialization}</MDBCardText>
                                        <MDBIcon far icon="edit mb-5" />
                                    </MDBCol>
                                    <MDBCol md="8">
                                        <MDBCardBody className="p-4">
                                            <MDBTypography tag="h4">Information</MDBTypography>
                                            <hr className="mt-0 mb-4" />
                                            <MDBRow className="pt-1">
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Email</MDBTypography>
                                                    <MDBCardText className="text-muted">{doctorData.Email}</MDBCardText>
                                                </MDBCol>
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Phone</MDBTypography>
                                                    <MDBCardText className="text-muted">{doctorData.Phone}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow className="pt-1">
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Specialization</MDBTypography>
                                                    <MDBCardText className="text-muted">{doctorData.Specialization}</MDBCardText>
                                                </MDBCol>
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Gender</MDBTypography>
                                                    <MDBCardText className="text-muted">{doctorData.Gender}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow className="pt-1">
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Age</MDBTypography>
                                                    <MDBCardText className="text-muted">{doctorData.Age}</MDBCardText>
                                                </MDBCol>
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Experience</MDBTypography>
                                                    <MDBCardText className="text-muted">{doctorData.Experience}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow className="pt-1">
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Location</MDBTypography>
                                                    <MDBCardText className="text-muted">{doctorData.Location}</MDBCardText>
                                                </MDBCol>
                                                <MDBCol size="7" className="mb-3">
                                                <button type="button" className="btn btn-primary" onClick={handleBookAppointmentClick}>Book Appointment</button>
                                                </MDBCol>
                                            </MDBRow>

                                            <div className="d-flex justify-content-start">
                                                <a href="https://www.facebook.com/"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                                                <a href="https://twitter.com/"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                                                <a href="https://www.instagram.com/"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                                            </div>
                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                :<h5 id='dynamicdiv'></h5>
                }

        </section >

    );
}

export default Doctordashboard