import React, { useEffect } from "react";
import { useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/firebase-config";

const AuthContext = React.createContext<{
  currentUser: User | null;
} | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
