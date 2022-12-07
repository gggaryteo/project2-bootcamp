import { createContext, useEffect, useReducer } from "react";
import React from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // spread the properties of the state, and override the user property with action.payload
      return { ...state, user: action.payload }
      
    case "LOGOUT":
      return {...state, user: null}

      // show the user content/component tree based off their authentication status in App.js
    case "AUTH_IS_READY":
      return {...state, user: action.payload, authIsReady: true}

    default:
      return state;
  }
};

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, { user: null, authIsReady: false});
  console.log("Authcontext State:", state);

  // Fire the function once. Communicate to firebase to evaluate whether there is a change in auth status.
  // If user has logged in, get the user object
  // If user has logged out, set user to null
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({type: 'AUTH_IS_READY', payload: user})
      unsubscribe();
    })
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};
