import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Home/Hero.jsx';
import Footer from './components/Footer/Footer.jsx';
import About from './components/About/About.jsx';
import OtpValidation from './components/register/otpValidation/OtpValidation.jsx';
import SignInPage from './components/register/registerPage/SignInPage.jsx';
import HotelSign from './components/register/registerPage/HotelSign.jsx';
import { Routes, Route } from 'react-router-dom';
import Login from './components/register/login/Login.jsx';
import EmailVarification from './components/register/emailVarification/EmailVarification.jsx';
import ResetPassword from './components/register/resetPassword.jsx/ResetPassword.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card } from '@mui/material';
import AdvCard from './components/cardSlider/AdvCard.jsx';
import Properties from './components/properties/Properties.jsx';
import CheckAvailability from './components/checkAvailability/CheckAvailability.jsx';
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/otpValidation' element={<OtpValidation />} />
        <Route path='/signIn' element={<SignInPage />} />
        <Route path='/hotelSign' element={<HotelSign />} />
        <Route path='/login' element={<Login />}></Route>
        <Route path='/emailVarification' element={<EmailVarification />} />
        <Route path='/resetPassword' element={<ResetPassword />} />
        <Route path='/signIn' element={<SignInPage />} />
        <Route path='/properties' element={<Properties />} />
        <Route path='/checkAvailability' element={<CheckAvailability />} />
      </Routes>
    </>
  )
}

export default App;
