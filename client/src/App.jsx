import React from "react";
import NewBill from "./components/CreateBill";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import UpdateBill from "./components/UpdateBill";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const baseUrl = "http://localhost:5000/api/v1" //https://golapsangha-backend.onrender.com/api/v1
  return (
    <>
      <Navbar />
      <Routes>
       
        <Route path="/about" element={<About baseUrl={baseUrl} />} />
        <Route path="/" element={<NewBill  baseUrl={baseUrl}/>} />
        <Route path="/update-bill" element={<UpdateBill baseUrl={baseUrl}/>} />
        <Route path="/dashboard" element={<Dashboard baseUrl={baseUrl}/>} />
      </Routes>
    </>
  );
}

export default App;
