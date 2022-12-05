import "./SignupPage.css";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./SignupPage.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const Create = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        console.log("Success registeration");

        // if successful, redirect back to login page
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error code: ", errorCode);
        console.log("Error message: ", errorMessage);
      });
  };

  return (
    <div className="signupBox">
      <h2>Sign up Page</h2>

      <form className="formbox">
        <input
          className="input"
          type="text"
          placeholder="email"
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <br />
        <input
          className="input"
          type="text"
          placeholder="password"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />

        <br />
        <button className="button" onClick={Create}>
          Create
        </button>
      </form>
    </div>
  );
}
