import React from 'react'
import Template from '../pages/Template'
import loginImg from "../assets/login.png"

const   Login = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Welcome to OpenCampus – Secure & Transparent College Management"
      desc1=" Secure access to your college portal."
      desc2="Stay updated with campus activities."
      image={loginImg}
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Login
