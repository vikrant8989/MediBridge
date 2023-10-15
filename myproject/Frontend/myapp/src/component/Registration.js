import React, { useState } from 'react';
// import UserRegistration from './User/UserRegistration';
import Registerdoctor from './Doctor/Registerdoctor';
import Pharmacyregister from './Pharmacy/Pharmacyregister';
import UserRegistration1 from './User/Userregistration1';


const Registration = () => {
  const [selectedOption, setSelectedOption] = useState('user');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div className='myregister'>
        <label style={{fontFamily:"sans-serif", fontWeight:"bold"}}>Who are you ?</label>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="user">User</option>
          <option value="doctor">Doctor</option>
          <option value="pharmacy">Pharmacy</option>
        </select>
      </div>


      {selectedOption === 'user' && <UserRegistration1 />}
      {selectedOption === 'doctor' && <Registerdoctor />}
      {selectedOption === 'pharmacy' && <Pharmacyregister />}
    </div>
  );
};

export default Registration;
