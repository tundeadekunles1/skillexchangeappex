import React from "react";
import "../styles/welcome.css";
import { useAuth } from "../contexts/AuthContext";
import welcome from "../assets/welcome.png";
import { Link } from "react-router-dom";

function Welcome() {
  const { user } = useAuth();
  return (
    <div className="welcome">
      <div className="welcomeDiv1">
        <h2 style={{ color: "#EFEFEF" }}>Home</h2>
        <div>
          <img src={welcome} alt="welcome" />
        </div>
        <p style={{ color: "#EFEFEF" }}>WELCOME TO SKILLBRIDGE </p>
      </div>
      <div className="welcomeDiv2">
        <h3> Hello! Welcome, {user?.fullName || "User"}!</h3>
        <p>Let’s help you connect and grow.</p>
        <Link to="/dashboard/matches">
          <button style={{ color: "#3A97E8" }}>Continue</button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
