import React, { createContext, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const Auth = getAuth(app)

const createUser = (email, password) => {
    return createUserWithEmailAndPassword(Auth, email, password)
}

const loginUser = (email, password) => {
    return signInWithEmailAndPassword(Auth, email, password)
}

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)

  const authInfo = {
    user,
    createUser,
    loginUser
  }

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
