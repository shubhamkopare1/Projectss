import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import adminImage from "../assets/admin.jpg"; 
import frameImage from "../assets/frame.png"; 

const AdminLogin = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(
        "https://admin-e29c0-default-rtdb.firebaseio.com/data.json"
      );
      const data = await response.json();

      if (!data) {
        toast.error("No admin users found in the database.");
        return;
      }

      let userFound = false;
      for (const key in data) {
        if (data[key].email === email) {
          userFound = true;
          if (data[key].password === password) {
            setIsLoggedIn(true);
            localStorage.setItem("isAdmin", "true");
            toast.success("Admin Login Successful!");
            navigate("/admin");
            return;
          } else {
            toast.error("Incorrect Password!");
            return;
          }
        }
      }

      if (!userFound) {
        toast.error("Admin Not Found!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Error logging in. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 w-screen h-screen flex items-center justify-center">
      <div className="flex justify-between w-11/12 max-w-[1160px] mx-auto gap-x-12 text-white">
        <div className="w-11/12 max-w-[450px]">
          <h1 className="text-white font-semibold text-[1.875rem]">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4 mt-6">
            <div>
              <label className="block text-gray-400 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white mt-1"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 font-medium">Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 mt-4"
            >
              Login
            </button>
          </form>
        </div>
        <div className="relative w-11/12 max-w-[450px]">
          <img src={frameImage} alt="Pattern" />
          <img src={adminImage} alt="Admin Panel" className="absolute -top-4 right-4" />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
