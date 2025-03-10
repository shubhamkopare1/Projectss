import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { MdDashboardCustomize } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { FaFileMedicalAlt } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdOutlineHowToVote } from "react-icons/md";

import { GrCompliance } from "react-icons/gr";
import { LuFilePenLine } from "react-icons/lu";
import Navbar from "../components/Navbar";

function Layout({ setIsLoggedIn }) {
  const navigate = useNavigate(); // ✅ Define navigate

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login"); // ✅ Now it works!
  };

  return (
    <div className="flex min-h-screen">
  {/* Sidebar */}
  <div className="w-[4rem] bg-gray-900 text-white p-4 flex flex-col justify-between min-h-screen">
    <ul className="flex flex-col gap-8 text-2xl items-center mt-10">
      <li><Link to="/"><MdDashboardCustomize /></Link></li>
      <li><Link to="/leave"><FaFileMedicalAlt /></Link></li>
      <li><Link to="/complaints"><GrCompliance /></Link></li>
      <li><Link to="/applications"><FaMoneyBillTrendUp /></Link></li>
      <li><Link to="/facility"><LuFilePenLine /></Link></li>
      <li><Link to="/elections"><MdOutlineHowToVote /></Link></li>
      <li>
  <a href="http://localhost:8080/books" target="_blank" rel="noopener noreferrer">
    <MdOutlineHowToVote />
  </a>
</li>

    </ul>
    <button onClick={handleLogout} className="text-2xl text-red-500 hover:text-red-300">
      <HiOutlineLogout title="Logout" />
    </button>
  </div>

  {/* Main Content */}
  <div className="flex-1 flex flex-col min-h-screen">
    {/* Ensure Navbar expands properly */}
    <Navbar setIsLoggedIn={setIsLoggedIn} className="h-auto min-h-[4rem]" />
    
    <div className="flex-grow">
      <Outlet />
    </div>
  </div>
</div>

  );
}

export default Layout;
