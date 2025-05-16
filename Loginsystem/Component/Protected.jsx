import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Protected = () => {
  const userval = localStorage.getItem("token");

  if (!userval) {
    return <Navigate to="/login" />
  }

  try {
    const parsedData = JSON.parse(userval);
    console.log(parsedData.type);

    if (parsedData.type === 'Admin' || parsedData.type === 'User') {
      return <Outlet />
    } else {
      return <Navigate to="/login" />
    }
  } catch (error) {
    return <Navigate to="/login" />
  }
}

export default Protected
