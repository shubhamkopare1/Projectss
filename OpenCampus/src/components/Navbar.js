import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoNotifications } from "react-icons/io5";
import logo1 from "../assets/logo.png";
import { useState } from "react";
import ProfilePopup from "./ProfilePopup";

function Navbar({ setIsLoggedIn }) {
  const [showPopup, setShowPopup] = useState(false);
  const studentId = "202312345"; // Replace with actual logged-in student ID

  return (
    <div className="w-full bg-gray-900 text-white p-4 flex justify-between items-center z-50">
      <Link to="/" aria-label="Home">
        <img src={logo1} alt="Logo" width={50} loading="lazy" />
      </Link>

      <ul className="flex gap-4">
        <li>
          <IoNotifications className="text-2xl cursor-pointer" title="Notifications" />
        </li>
        <li>
          <button onClick={() => setShowPopup(true)}>
            <CgProfile className="text-2xl" title="Profile" />
          </button>
        </li>
      </ul>

      {showPopup && (
        <ProfilePopup studentId={studentId} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}

export default Navbar;