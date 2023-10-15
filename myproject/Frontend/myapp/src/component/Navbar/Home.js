import React from 'react'
import { Outlet } from 'react-router'
import {Link} from 'react-router-dom';
import Myfooter from '../Footer/Myfooter';

const Home = () => {
  return (
    <>
      <div className='maincardiv'>
        {/* <div className="card mycard">
          <img className="card-img-top" src="./Doctors/D3.jpg" alt="Card  cap" />
          <div className="card-body">
            <Link to='/search/doctor' className="div1innertext">Find Doctors Near You</Link>
            <p className='card-text'>Confirmed Appointment</p>
          </div>
        </div> */}
        <div className="card mycard">
          <img className="card-img-top" src="./Medicines/Medicine1.jpg" alt="Card  cap2" />
          <div className="card-body">
            <Link to='/search/medicine' className="div1innertext">Search Medicines</Link>
            <p className='card-text'>Order Medicine</p>
          </div>
        </div>
      </div>
      <h2 style={{ fontFamily: "sans-serif", margin: "1.5%", fontSize: "bold" }}>Connect with doctors for any health concern</h2>
      <div className='maincarddiv2'>
        <div className="card mycard">
          <img className="card-img-top" src="./problems/acne,pimple,skin.jpg" alt="Card  cap2" />
          <div className="card-body">
            <p className='card-text'>Acne, pimple, or skin issues</p>
            <Link to='/search/doctor/Skin Care' className="div2innertext">Find Doctor</Link>
          </div>
        </div>
        <div className="card mycard">
          <img className="card-img-top" src="./problems/back pain.jpg" alt="Card  cap2" />
          <div className="card-body">
            <p className='card-text'>Fractures, Back and Neck Pain, Joint Pain</p>
            <Link to='/search/doctor/Fractures' className="div2innertext">Find Doctor</Link>
          </div>
        </div>
        <div className="card mycard">
          <img className="card-img-top" src="./problems/cough,cold,fever.jpg" alt="Card  cap2" />
          <div className="card-body">
            <p className='card-text'>Cold, cough or fever</p>
            <Link to='/search/doctor/Cold' className="div2innertext">Find Doctor</Link>
          </div>
        </div>
        <div className="card mycard">
          <img className="card-img-top" src="./problems/headache.jpg" alt="Card  cap2" />
          <div className="card-body">
            <p className='card-text'>Seizures, Headaches and Stroke</p>
            <Link to='/search/doctor/Seizures' className="div2innertext">Find Doctor</Link>
          </div>
        </div>
        <div className="card mycard">
          <img className="card-img-top" src="./problems/heartattack.jpg" alt="Card  cap2" />
          <div className="card-body">
            <p className='card-text'>Heart Attack, Hypertension and Heart Failure</p>
            <Link to='/search/doctor/Heart Attack' className="div2innertext">Find Doctor</Link>
          </div>
        </div>
        <div className="card mycard">
          <img className="card-img-top" src="./problems/depression.jpg" alt="Card  cap2" />
          <div className="card-body">
            <p className='card-text'>Depression, Anxiety Disorders, Eating Disorders and Personality Disorders</p>
            <Link to='/search/doctor/Depression' className="div2innertext">Find Doctor</Link>
          </div>
        </div>
        <div className="card mycard">
          <img className="card-img-top" src="./problems/toothdecay.jpg" alt="Card  cap2" />
          <div className="card-body">
            <p className='card-text'>Tooth Decay, Tooth Sensitivity</p>
            <Link to='/search/doctor/Tooth Decay' className="div2innertext">Find Doctor</Link>
          </div>
        </div>
        <div className="card mycard">
          <img className="card-img-top" src="./problems/kidney.jpg" alt="Card  cap2" />
          <div className="card-body">
            <p className='card-text'>Urinary Tract Infections (UTI), Kidney Stones and Bladder Problem</p>
            <Link to='/search/doctor/Kidney Stones' className="div2innertext">Find Doctor</Link>
          </div>
        </div>
        <div className="card mycard">
          <img className="card-img-top" src="./problems/pregnancy_issue.png" alt="Card  cap2" />
          <div className="card-body">
            <p className='card-text'>Period doubts or Pregnancy</p>
            <Link to='/search/doctor/Pregnancy' className="div2innertext">Find Doctor</Link>
          </div>
        </div>
      </div>
      <h2 style={{ fontFamily: "sans-serif", margin: "1.5%", fontSize: "bold" }}>Book an appointment for an in-clinic consultation</h2>
      <div className='maincarddiv2'>
        <div className="card mycard">
          <img className="card-img-top" src="./Specialization/dental.jpg" alt="Card  cap2" />
          <div className="card-body">
            <p className='card-text' style={{fontSize:"20px"}}>Dentist</p>
            <Link to='/search/doctors/Dentist' className="div3innertext">Teething troubles ? Schedule a checkup</Link>
          </div>
        </div>
        <div className="card mycard">
          <img className="card-img-top" src="./Specialization/neurologist.png" alt="Card  cap2" />
          <div className="card-body">
            <p className='card-text' style={{fontSize:"20px"}}>Neurologist</p>
            <Link to='/search/doctors/Neurologist' className="div3innertext">Having Headache or Stroke ? Schedule a checkup</Link>
          </div>
        </div>
        <div className="card mycard">
          <img className="card-img-top" src="./Specialization/orthopedic.jpg" alt="Card  cap2" />
          <div className="card-body">
            <p className='card-text' style={{fontSize:"20px"}}>Orthopedic</p>
            <Link to='/search/doctors/Orthopedic' className="div3innertext">Having Fractures or Back and Neck Pain? Schedule a checkup</Link>
          </div>
        </div>
        <div className="card mycard">
          <img className="card-img-top" src="./Specialization/dermatologist.png" alt="Card  cap2" />
          <div className="card-body">
            <p className='card-text' style={{fontSize:"20px"}}>Dermatologist</p>
            <Link to='/search/doctors/Dermatologist' className="div3innertext">Having Skin or Hair Problem? Schedule a checkup</Link>
          </div>
        </div>
        <div className="card mycard">
          <img className="card-img-top" src="./Specialization/urologist.jpg" alt="Card  cap2" />
          <div className="card-body">
            <p className='card-text' style={{fontSize:"20px"}}>Urologist</p>
            <Link to='/search/doctors/Urologist' className="div3innertext"> Having Kidney Stones or Bladder Problem? Schedule a checkup</Link>
          </div>
        </div>
        <div className="card mycard">
          <img className="card-img-top" src="./Specialization/Psychiatrist.jpg" alt="Card  cap2" />
          <div className="card-body">
            <p className='card-text' style={{fontSize:"20px"}}>Psychiatrist</p>
            <Link to='/search/doctors/Psychiatrist' className="div3innertext"> Having Depression or Anxiety Disorders? Schedule a checkup</Link>
          </div>
        </div>
        <div className="card mycard">
          <img className="card-img-top" src="./Specialization/cold.jpg" alt="Card  cap2" />
          <div className="card-body">
            <p className='card-text' style={{fontSize:"20px"}}>General Practitioner</p>
            <Link to='/search/doctors/General Practitioner' className="div3innertext"> Having Cold,Cough or Fever? Schedule a checkup</Link>
          </div>
        </div>
      </div>
      <Myfooter/>
      <Outlet />
    </>
  )
}

export default Home