import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/LogIn/Login';
import LandingPage from './Pages/LandingPage/LandingPage';
import Register from './Pages/Register/Register';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/*" element={<LandingPage />} />
      </Routes>
  );
}

export default App;