import { Link } from 'react-router-dom'

// styles and images
import './Navbar.css'
import ProjectLogo from '../assets/ProjectLogo.svg'

import React from 'react'

export default function Navbar() {
  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={ProjectLogo} alt="project-logo"/>
          <span>Dr. Project</span>
        </li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <button className='btn'>Logout</button>
      </ul>
    </div>
  )
}
 