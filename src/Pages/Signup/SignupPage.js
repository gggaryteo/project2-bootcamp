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
  const [displayName, setDisplayName] = useState("");
  const [displayPicture, setDisplayPicture] = useState(null);
  const [displayPictureError, setDisplayPictureError] = useState(null);

  const Create = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        console.log("Successful registration");

        navigate("/login");
        // if successful, redirect back to login page
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error code: ", errorCode);
        console.log("Error message: ", errorMessage);
      });
  };

  const handleFileChange = (event) => {
    setDisplayPicture(null);
    let selectedImage = event.target.files[0]
    console.log(selectedImage);

    // Check if the image is selected or not. Do not want undefined if the person clicked 'Cancel'
    if (!selectedImage) {
      setDisplayPictureError('Please select a image file');
      return
    }

    // Check if the image selected is of image type. If it's not, show error message.
    if (!selectedImage.type.includes('image')) {
      setDisplayPictureError('The selected file must be either JPG or PNG only.')
      return
    }
    
    // Limit the image upload size to 1 Mb
    if(selectedImage.size > 1000000) {
      setDisplayPictureError('Image file size must be less than 1MB')
      return
    }

    setDisplayPictureError(null)
    setDisplayPicture(selectedImage)
    console.log('display picture updated', displayPicture)

  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(registerEmail, registerPassword, displayName, displayPicture)
  // }

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
            onChange={handleFileChange}
          />
          {displayPictureError && <div className="error">{displayPictureError}</div>}
        </label>
        <button className="btn" onClick={Create}>
          Create Account
        </button>
      </form>
  );
}
