import React from 'react'
import { useSelector } from 'react-redux'
import AppointmentForm from './Appointmentform'
import Login from '../Login/Login'

const Bookappointment = () => {
    const userdata = useSelector((state) =>state.check.value)
    console.log(userdata)
  return (
    <div>{userdata.username  ? <AppointmentForm handler={userdata}/>
         :<Login/>
        }
    </div>
  )
}

export default Bookappointment