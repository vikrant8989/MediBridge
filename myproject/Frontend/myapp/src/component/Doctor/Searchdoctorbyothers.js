import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import axios from 'axios';


const Searchdoctorbyothers = () => {
    const { others } = useParams();
    const [doctorData, setDoctorData] = useState([]); // Initialize doctorData as null
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000//chat/"+others);
                console.log(response.data)
                setDoctorData(response.data); // Store the data in the component state

            } catch (error) {
                document.getElementById("dynamicdiv").innerText = "Some error occurred";
            }
        };
        fetchData();;
    }, [others]);

    return (
        <div className='card-container'>
            {doctorData.length > 0 ? (<p id='mydatadiv' style={{textAlign:"center",marginLeft:"10%",marginTop:"5%",marginRight:"10%"}}>{doctorData}</p>
            ) : (
                <h5 id='dynamicdiv'>Loading</h5>
            )
            }

        </div >
    )
}

export default Searchdoctorbyothers