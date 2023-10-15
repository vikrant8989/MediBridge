import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../Login/Loginslice';

const Logout = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <>
        {handleLogout()}
        </>
    )
}

export default Logout