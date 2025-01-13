import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Swal from "sweetalert2";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const token = localStorage.getItem("token");
  const handleLogout = async () => {
    try {
      console.log(token);
      await api.delete("/logout", {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire({
        title: "Success!",
        text: "You have successfully log out.",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: "Logout Failed",
        text: error.response?.data?.message || "Failed to logout.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div>
      {/* Sidebar untuk versi desktop */}
      <div
        className={`lg:w-64 w-full lg:pt-0 pt-10  h-full bg-gray-800 text-white fixed   transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        } lg:block`}
      >
        <div className="p-4 h-full bg-black flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/dashboard"
                  className="text-white hover:bg-gray-700 p-2 rounded block"
                >
                  Dashboard Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/panggil-antrian"
                  className="text-white hover:bg-gray-700 p-2 rounded block"
                >
                  Panggil Antrian
                </Link>
              </li>
            </ul>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 p-1 rounded-lg hover:opacity-80 transition-opacity"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar Toggle Button (Mobile only) */}
      <button
        className="lg:hidden absolute top-4 left-4 text-white"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12h18M3 6h18M3 18h18"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default Sidebar;
