import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    erno: "",
    password: "",
    confirmPassword: "",
    profileImage: "", // Store Base64 Image Here
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  // Convert Image to Base64
  function handleImageChange(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profileImage: reader.result, // Save Image as Base64 String
        }));
      };
    }
  }

  async function submitHandler(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoggedIn(true);
    toast.success("Account Created");

    const { firstName, lastName, email, erno, password, profileImage } = formData;

    try {
      await fetch("https://login--data-default-rtdb.firebaseio.com/data.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          erno,
          password,
          profileImage, // Save Image in Realtime Database
        }),
      });

      toast.success("Signup Successful!");
      navigate("/");
    } catch (error) {
      toast.error("Signup failed, please try again.");
      console.error("Error:", error);
    }
  }

  return (
    <div className="h-[100vh] ">
      <form onSubmit={submitHandler}>
        {/* First Name and Last Name */}
        <div className="flex gap-x-4 mt-[8px]">
          <label className="w-full">
            <p>First Name *</p>
            <input
              required
              type="text"
              name="firstName"
              onChange={changeHandler}
              value={formData.firstName}
              placeholder="Enter First Name"
              className="text-black rounded w-full p-[12px]"
            />
          </label>

          <label className="w-full">
            <p>Last Name *</p>
            <input
              required
              type="text"
              name="lastName"
              onChange={changeHandler}
              value={formData.lastName}
              placeholder="Enter Last Name"
              className="text-black rounded w-full p-[12px]"
            />
          </label>
        </div>

        {/* Enrollment Number */}
        <div className="mt-[20px]">
          <label>
            <p>Enrollment Number *</p>
            <input
              required
              type="text"
              name="erno"
              onChange={changeHandler}
              value={formData.erno}
              placeholder="Enter Your College Enrollment No"
              className="text-black rounded w-full p-[12px]"
            />
          </label>
        </div>

        {/* Email Address */}
        <div className="mt-[20px]">
          <label>
            <p>Email Address *</p>
            <input
              required
              type="email"
              name="email"
              onChange={changeHandler}
              value={formData.email}
              placeholder="Enter Email Address"
              className="text-black rounded w-full p-[12px]"
            />
          </label>
        </div>

        {/* Password Fields */}
        <div className="w-full flex gap-x-4 mt-[20px]">
          <label className="w-full relative">
            <p>Create Password *</p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={changeHandler}
              value={formData.password}
              placeholder="Enter password"
              className="text-black rounded w-full p-[12px]"
            />
            <span className="absolute right-3 top-[38px]" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
            </span>
          </label>

          <label className="w-full relative">
            <p>Confirm Password *</p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={changeHandler}
              value={formData.confirmPassword}
              placeholder="Confirm password"
              className="text-black rounded w-full p-[12px]"
            />
            <span className="absolute right-3 top-[38px]" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
            </span>
          </label>
        </div>

        {/* Profile Picture Upload */}
        <div className="mt-5">
  <label className="block text-sm font-medium text-richblack-5">
    Upload Profile Picture <sup className="text-pink-200">*</sup>
  </label>
  <div className="mt-2 flex items-center gap-3">
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:bg-yellow-400 file:text-richblack-900 file:px-4 file:py-2 file:border-none file:rounded-md hover:file:bg-yellow-500"
    />
  </div>
</div>

        <button type="submit" className="w-full bg-yellow-400 rounded font-medium text-black px-[12px] py-[8px] mt-6">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;