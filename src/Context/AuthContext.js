import { createContext, useReducer } from "react";
import React from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // spread the properties of the state, and override the user property with action.payload
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  console.log("Authcontext State:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};
