import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";






const Dashboard = () => {

  const navigate = useNavigate();
const Logout =()=>{
  localStorage.removeItem('token');
  navigate("/login")
}

  const [adminData, setAdminData] = useState({ type: "" });

  useEffect(() => {
    const storedAdminData = localStorage.getItem("token");
    if (storedAdminData) {
      try {
        const parsedData = JSON.parse(storedAdminData);
        setAdminData({
          type: parsedData.type || "",
        });
      } catch (error) {
        console.error("Failed to parse admin data from localStorage", error);
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-96 p-5">
        <div className="border-b border-slate-200 pb-2">
          <span className="text-sm text-slate-600 font-medium">Dashboard</span>
        </div>
        <div className="flex-grow">
          <h5 className="mb-2 text-slate-800 text-xl font-semibold">
            Welcome, {adminData.type ? adminData.type : ""}
          </h5>
          <p className="text-slate-600 leading-normal font-light">
            {adminData.type
              ? `You are logged in as: ${adminData.type}`
              : "Type is not available"}
          </p>
        </div>
        <button className="mt-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={Logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
