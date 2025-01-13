import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"; // Digunakan untuk menampilkan child routes
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

function DashboardLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const fetchUser = async () => {
    try {
      await api.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      navigate("/login");
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
