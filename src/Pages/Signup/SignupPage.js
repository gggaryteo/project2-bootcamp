import "./SignupPage.css";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./SignupPage.css";

export default function Signup() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [displayPicture, setDisplayPicture] = useState(null);

  const Create = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        console.log("Success registeration");

        // if successful, redirect back to login page
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error code: ", errorCode);
        console.log("Error message: ", errorMessage);
      });
  };

  return (
      <form className="auth-form">
        <h2>Sign Up</h2>
        <label>
          <span>Enter E-mail: </span>
          <input
            required
            type="email"
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
            value={registerEmail}
          />
        </label>
        <label>
          <span>Enter Password: </span>
          <input
            required
            type="password"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
            value={registerPassword}
          />
        </label>
        <label>
          <span>Display Name: </span>
          <input
            required
            type="text"
            onChange={(event) => {
              setDisplayName(event.target.value);
            }}
            value={displayName}
          />
        </label>
        <label>
          <span>Profile Picture: </span>
          <input
            required
            type="file"
          />
        </label>
        <button className="btn" onClick={Create}>
          Create Account
        </button>
      </form>
  );
}
