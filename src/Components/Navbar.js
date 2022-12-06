// styles and images
import './Navbar.css';
import ProjectLogo from '../assets/ProjectLogo.svg';

import { Link } from "react-router-dom";

import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, updateDoc } from "firebase/firestore";
import { signOut } from 'firebase/auth';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Navbar() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch, user } = useAuthContext();

  const handleLogout = async() => {
    setError(null);
    setIsLoading(true);

    // Log the user out
    try {
      // change status from online to offline
      const { uid } = user
      const usersCollectionRef = doc(db, 'users', uid);
      await updateDoc(usersCollectionRef, {
        online: false
      });

      await signOut(auth);
      // dispatch logout action
      dispatch({type: 'LOGOUT'})

      if (!isCancelled) {
        //update states
        setIsLoading(false);
        setError(null);
      }
    }
    catch(error) {
      if (!isCancelled) {
        setError(error.message);
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={ProjectLogo} alt="project-logo"/>
          <span>Dr. Project</span>
        </li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        {!isLoading && <button className='btn' onClick={handleLogout}>Logout</button>}
        {isLoading && <button className='btn' onClick={handleLogout} disabled>Logging Out</button>}
      </ul>
    </div>
  )
}
 