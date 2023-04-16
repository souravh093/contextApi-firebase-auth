import React, { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
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

  const logOut = () => {
    return signOut(Auth)
  }

  // observer auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, currentUser => {
      console.log('auth state changed', currentUser)
      setUser(currentUser)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    createUser,
    loginUser,
    logOut
  }

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
