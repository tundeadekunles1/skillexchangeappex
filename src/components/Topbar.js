import React from "react";
import "../styles/topbar.css";
import { useAuth } from "../contexts/AuthContext";

function Topbar({ onLogout }) {
  const { user } = useAuth();
  return (
    <div className="topbar">
      <h3> Hello, {user?.fullName || "User"}!</h3>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Topbar;
