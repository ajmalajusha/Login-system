import React from 'react'
import {Navigate, Outlet } from 'react-router-dom'
const LoginProtected = () => {
    const userval = localStorage.getItem("token");





  return  !userval ?   <Outlet/>:<Navigate to="/dashboard"/>
}

export default LoginProtected