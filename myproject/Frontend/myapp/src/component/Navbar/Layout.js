import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import UserNavbar from '../User/Usernavbar'
import Generalnavabar from './Generalnavabar'
import Doctornavbar from '../Doctor/Doctornavbar'
import Pharmacynavbar from '../Pharmacy/Pharmacynavbar'

const Layout = () => {
    const userdata = useSelector((state) =>state.check.value)
    console.log(userdata)
    return (
        <>
            {userdata.role?(userdata.role == 'user'?<UserNavbar />:(userdata.role =='doctor'?<Doctornavbar/>:<Pharmacynavbar/>)):<Generalnavabar/>}       
            <Outlet />
        </>
    )
}

export default Layout


