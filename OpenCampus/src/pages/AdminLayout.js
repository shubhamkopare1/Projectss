import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function AdminLayout({ setIsLoggedIn, setIsAdmin }) {
  return (
    <div>
      <AdminNavbar setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
      <div className="mt-16 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
