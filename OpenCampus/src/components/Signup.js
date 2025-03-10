import React from 'react'
import signupImg from "../assets/signup.png"
import Template from '../pages/Template'

const Signup = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Unlock Your Campus – SignIn Now"
      desc1=" Secure access to your college portal."
      desc2="Stay updated with campus activities."
      image={signupImg}
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Signup
