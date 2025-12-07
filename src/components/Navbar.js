import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-brand">JobTracker</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {user ? <Link to="/dashboard">Dashboard</Link> : null}
        <Link to="/add-application">Add Application</Link>
        <Link to="/applications">Applications</Link>
        {user ? (
          <>
            <span className="nav-user">{user.email}</span>
            <button className="btn-link" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
