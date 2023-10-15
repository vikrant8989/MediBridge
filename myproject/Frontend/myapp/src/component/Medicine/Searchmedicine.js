import React, { useState } from "react";
import axios from "axios";
import MedicineLayout from "./MedicineLayout";

const Searchmedicine = () => {
    const [medicineName, setMedicineName] = useState("");
    const [medicineData, setMedicineData] = useState(null);

    const handleInputChange = (e) => {
        setMedicineName(e.target.value); // Update the state with input value
    };

    const handleSearchClick = () => {
        if (medicineName.trim() !== "") {
            var p = axios.get("http://127.0.0.1:5001/medicines/" + medicineName)
            p.then((response) => {
                setMedicineData(response.data)
            })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            alert("Please enter a medicine name.");
        }
    };
    return (
        <div>
            <div className="mysearchmed">
                <input type="search" id="form1" style={{ width: "30%" }} className="form-control" onChange={handleInputChange} placeholder="Medicine name" />
                <button type="button" className="btn btn-primary" onClick={handleSearchClick} >
                    <i className="fas fa-search"></i>
                </button>
            </div>
            {medicineData && <MedicineLayout medicine={medicineData} />}
        </div>


    );
}

export default Searchmedicine;