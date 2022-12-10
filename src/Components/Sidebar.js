import React from "react";
import { NavLink } from "react-router-dom";

import "./Sidebar.css";
import DashboardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";
import UserAvatar from "./UserAvatar";
import { useAuthContext } from "../hooks/useAuthContext";


export default function Sidebar() {
  const { user } = useAuthContext();
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <UserAvatar src={user.photoURL}/> 
          <p> Sup {user.displayName}! </p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/">
                <img src={DashboardIcon} alt="dashboard-icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create-project">
                <img src={AddIcon} alt="add-icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
