import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const useSignUp = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const signup = async (registerEmail, registerPassword, displayName, displayPicture) => {
    // Set error to null whenever a user signs up
    setError(null);
    // When a request is made, isPending == true
    setIsPending(true);

    try {
      // Create the user
      const response = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log(response.user)

      if (!response) {
        throw new Error('Could not complete sign-up');
      }
      // upload user display picture. Store it inside userPictures folder, thereafter, every user has their own folder with a unique ID.
      // Make it easier to iterate through and output the pictures one by one when setting up the User Online Component
      const uploadPath = `images/${auth.currentUser.uid}/${displayPicture.name}`;
      const imageRef = ref(storage, uploadPath);
      // Upload image into firebase storage
      await uploadBytes(imageRef, displayPicture);
      // Get the Download URL
      const photoURL = await getDownloadURL(imageRef);

      // Update the user profile
      await updateProfile(auth.currentUser, { displayName, photoURL });
      setIsPending(false);
      setError(null);

      // Dispatch login action
      // dispatch({ type: "LOGIN", payload: auth.currentUser });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("The email address is already in use");
      } else {
        setError(error.message)
      }
      setIsPending(false);
    }
    // Navigate to login page
    // await navigate("/login");
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
