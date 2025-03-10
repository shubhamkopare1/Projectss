import { Link, useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { MdDashboardCustomize } from "react-icons/md";
import { FaClipboardList, FaMoneyBillWave } from "react-icons/fa";
import { toast } from "react-toastify";

function AdminNavbar({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/admin-login");
    toast.warning("Admin logged out!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Admin Panel</h1>

      <div className="grid grid-cols-2 gap-6">

        <button
          onClick={() => navigate("/admin/electiondashbord")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
        >
          <FaClipboardList /> Admin Election Dashboard
        </button>

        <button
          onClick={() => navigate("/admin/budget")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg"
        >
          <FaMoneyBillWave /> Budget Approval
        </button>

        <button
          onClick={() => navigate("/admin/complaint-panel")}
          className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg"
        >
          <FaClipboardList /> Complaint Panel
        </button>

        <button
          onClick={() => navigate("/admin/facultydashbord")}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg"
        >
          <FaClipboardList /> Faculty Dashboard
        </button>

      </div>

      <button
        onClick={handleLogout}
        className="mt-8 flex items-center gap-2 text-red-500 hover:text-red-300 text-lg"
      >
        <HiOutlineLogout /> Logout
      </button>
    </div>
  );
}

export default AdminNavbar;
