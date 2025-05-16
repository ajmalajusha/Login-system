import React from 'react'
import './App.css'
import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom"
import Login from '../Component/Login'
import Register from '../Component/Register'
import Dashboard from '../Component/Dashboard'
import Protected from '../Component/Protected'
import Error from '../Component/Error'
import LoginProtected from '../Component/LoginProtected'


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<LoginProtected/>}>

    <Route path="/" element={<Navigate to="/login"  />} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      </Route>


      <Route element={<Protected/>}>

       <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='*' element={<Error/>} />
      </Route>
    </Routes>
    </BrowserRouter>
      
    
    </>
  )
}

export default App
