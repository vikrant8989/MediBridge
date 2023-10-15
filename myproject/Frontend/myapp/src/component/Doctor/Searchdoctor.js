import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import axios from 'axios';


const Searchdoctor = () => {
    const { problem } = useParams();
    const [doctorData, setDoctorData] = useState([]); // Initialize doctorData as null
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/doctors/search/" + problem);
                if (response.data["error"] && response.data["error"] == `No specialization found for the patient condition ${problem}`) {
                    document.getElementById("dynamicdiv").innerText = "No Doctor Found Please check your choice once";
                }
                else if (response.data["error"] && response.data["error"] == "An error occurred while searching doctors by problem") {
                    document.getElementById("dynamicdiv").innerText = "Sorry! Some error occured"
                }
                else {
                    setDoctorData(response.data); // Store the data in the component state
                }

            } catch (error) {
                document.getElementById("dynamicdiv").innerText = "Some error occurred";
            }
        };
        fetchData();
    }, [problem]);

    return (
        <div className='card-container'>
            {doctorData.length > 0 ? (
                doctorData.map((doctor) => (
                    <div key={doctor.Did} className="card mycard1" style={{ width: '18rem', margin: "2%" }}>
                        <img className="card-img-top" src="/doctor_consult.jpg" alt="Card image cap" />
                        <div className="card-body">
                            <h3 className="card-title">Dr. {doctor.Dname}</h3>
                            <p className="card-text">Speciality: {doctor.Specialization}</p>
                            <p className="card-text">Experience: {doctor.Experience}</p>
                            <Link to={`view/Doctors/${doctor.Did}`} className="btn btn-primary">
                                View Profile
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <h5 id='dynamicdiv'></h5>
            )
            }

        </div >
    )
}

export default Searchdoctor








