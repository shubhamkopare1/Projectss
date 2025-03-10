import React, { useState } from "react";
import { postData } from "../utils/api";

const AdminSignup = () => {
  const [admin, setAdmin] = useState({ email: "", password: "" });

  const handleSignup = async () => {
    await postData("admins", admin);
    alert("Admin registered successfully!");
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Signup</h2>
      <input
        type="email"
        placeholder="Email"
        className="p-2 w-full border rounded-md mb-2"
        onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 w-full border rounded-md mb-2"
        onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
      />
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        onClick={handleSignup}
      >
        Signup
      </button>
    </div>
  );
};

export default AdminSignup;
