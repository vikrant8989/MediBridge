import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';


const Viewallmedicine = () => {
    const userdata = useSelector((state) => state.check.value)
    const [medicine, setmedicinedata] = useState([]); // Initialize doctorData as null
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5001//pharmacies/getmed/" + userdata.id);
                console.log(response.data)
                setmedicinedata(response.data); // Store the data in the component state

            } catch (error) {
                document.getElementById("dynamicdiv").innerText = "Some error occured"
            }
        };
        fetchData();
    }, [userdata.id]);

    return (
        <div className='card-container'>
            {medicine.length > 0 ? (
                medicine.map((med) => (
                    <div key={med.medicineid} className="card mycard1" style={{ width: '18rem', margin: "2%" }}>
                        <img className="card-img-top" src={`http://127.0.0.1:5001/get_image/${med.name}`} alt="Card image cap" />
                        <div className="card-body">
                            <h3 className="card-title">{med.name}</h3>
                            <p className="card-text" style={{fontFamily:"sans-serif"}}><h5>Speciality</h5>: {med.brandname}</p>
                            <p className="card-text" style={{fontFamily:"sans-serif"}}><h5>Category</h5>: {med.category}</p>
                            <p className="card-text" style={{fontFamily:"sans-serif"}}><h5>Description</h5>: {med.description}</p>
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

export default Viewallmedicine