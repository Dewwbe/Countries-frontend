import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import CountryPage from './pages/CountryPage';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<div>404 - Page Not Found</div>} />

       <Route path='/home' element={<Home />} /> 
      <Route path="/country/:name" element={<CountryPage />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register/>} />
    </Routes>
  )
}

export default App