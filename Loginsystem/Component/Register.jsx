import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';






const Register = () => {
  const navigate =useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [type, settype] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== cpassword) {
      setError('Passwords do not match');
      return;
    }

    try {
    
      const data ={
        email: email,
        password: password,
        type: type
      }

     axios.post("http://localhost:8000/validate",data).then(  (res)=>{
        console.log(res.data);
        if(res.data.message){
          setError(res.data.message)
        }else if(res.data.Valid){

          axios.post("http://localhost:8000/userinsert",data).then( (res)=>{
            if(res.data.Erorr ){
              setError(res.data.Erorr)
            }else{
              setSuccess(res.data.success)
            }
 
            setTimeout(() => {
        
              navigate("/login")
            }, 3000);
          }).catch((err)=>{
            console.log(err);
          })
        }
      }).catch((err)=>{
        console.log(err);
      })

      
      // Reset form
      setEmail('');
      setPassword('');
      setCpassword('');
     
    } catch (err) {
      // setError('Error hashing password');
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?ga=GA1.1.570468469.1692003253&semt=ais_hybrid&w=740"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Register your account
          </h2>
          {error && <h5 className="text-red-600">{error}</h5>}
            {success && <h5 className="text-green-600 break-words">{success}</h5>}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Enter Your Email address <small className='text-red-600'>*</small>
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password <small className='text-red-600'>*</small>
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="cpassword" className="block text-sm/6 font-medium text-gray-900">
                  Confirm Password <small className='text-red-600'>*</small>
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="cpassword"
                  name="cpassword"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
            <div className="flex items-center justify-between">
                <label htmlFor="usertype" className="block text-sm/6 font-medium text-gray-900">
                  User Type <small className='text-red-600'>*</small>
                </label>
              </div>
              <div className="mt-2">
                <select
                  id="usertype"
                  name="usertype"
                 
                  required
                  autoComplete="current-password"
                  value={type}
                  onChange={(e) => settype(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                > 
                <option value="">Select</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
               
                
                
                </select>
              </div>
            </div>

            

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
