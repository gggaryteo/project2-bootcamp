import React, { useState, useEffect } from "react";
import "./LoginPage.css";

import { useAuthContext } from "../../hooks/useAuthContext";
import { auth, db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  // Login authenticaton
  // Assigned to Login button
  // TO DO: Add navigation logic from login to dashboard
  const handleLogin = async (event) => {
    event.preventDefault();

    setError(null);
    setIsLoading(false);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      const user = auth.currentUser;
      console.log(user);

      if (!response) {
        throw new Error("Could not complete sign-up");
      }

      const usersCollectionRef = doc(db, "users", user.uid);
      await updateDoc(usersCollectionRef, {
        online: true,
      });

      dispatch({type: 'LOGIN', payload: user})

      if (!isCancelled) {
        //update states
        setIsLoading(false);
        setError(null);
      }

    } catch(error){
      if(!isCancelled) {
        if (error.code === "auth/wrong-password") {
        setError("Wrong password. Please try again.");
      } else {
        setError(error.message);
      }
      setIsLoading(false) 
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);


  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Login</h2>
      <label>
        <span>Enter E-mail: </span>
        <input
          required
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
        />
      </label>
      <label>
        <span>Enter Password: </span>
        <input
          required
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
        />
      </label>
      
      {!isLoading && <button className="btn">Login Your Account</button>}
      {isLoading && (<button className="btn" disabled>Loading</button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
