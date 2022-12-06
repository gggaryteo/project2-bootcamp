import { useState } from "react";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { collection, setDoc, doc } from "firebase/firestore";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (registerEmail, registerPassword, displayName, displayPicture) => {
    // Set error to null whenever a user signs up
    setError(null);
    // When a request is made, isPending == true
    setIsPending(true);

    try {
      // Create the user
      const response = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      const user = auth.currentUser;
      console.log(user);

      if (!response) {
        throw new Error('Could not complete sign-up');
      }
      // upload user display picture. Store it inside userPictures folder, thereafter, every user has their own folder with a unique ID.
      // Make it easier to iterate through and output the pictures one by one when setting up the User Online Component
      const uploadPath = `images/${user.uid}/${displayPicture.name}`;
      const imageRef = ref(storage, uploadPath);
      // Upload image into firebase storage
      const img = await uploadBytes(imageRef, displayPicture);
      // Get the Download URL
      const photoURL = await getDownloadURL(imageRef);

      // Update the user profile
      await updateProfile(user, { displayName, photoURL });
      setIsPending(false);
      setError(null);

      // Create and store user Document in Firestore Database
      const usersCollectionRef = doc(db, 'users', user.uid)
      await setDoc(usersCollectionRef, {
        online: true,
        displayName,
        photoURL: photoURL
      })

      // Dispatch Action (useAuthContext)
      dispatch({ type: "LOGIN", payload: auth.currentUser });

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

  return { signup, error, isPending };
};
