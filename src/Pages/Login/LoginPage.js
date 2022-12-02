
import React, { useState } from "react";
import "./LoginPage.css";
import { auth } from "../../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  // Track current user
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  // Login authenticaton
  // Assigned to Login button
  // TO DO: Add navigation logic from login to dashboard
  const login = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Login succesful");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error code: ", errorCode);
        console.log("Error message: ", errorMessage);
      });
  };

  return (
    <div className="loginbox">
      <h2 className="header"> Login </h2>
      <form className="formbox">
        <input
          className="input"
          type="text"
          placeholder="Enter email"
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <br />
        <input
          className="input"
          type="text"
          placeholder="Enter password"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <div>
          <button className="button">Sign up</button>
          <button className="button" onClick={login}>
            Login
          </button>
        </div>
      </form>

      {/* {To test if user is logged in or not} */}
      <div className="testbox">
        <h2>Current user logged in: {user.email} </h2>
      </div>
    </div>
  );
}
