import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-white p-4 flex justify-between items-center border-b">
      <Link to="/" className="font-bold text-lg">
        Campus Pulse+
      </Link>
      <div className="flex gap-2">
        {user?.role === "admin" && (
          <>
            <Link to="/admin/dashboard" className="text-blue-600 underline">
              Dashboard
            </Link>
            <Link to="/admin/analytics" className="text-blue-600 underline">
              Analytics
            </Link>
          </>
        )}
        {user && <span className="text-gray-700">{user.role}</span>}
      </div>
    </nav>
  );
}
