import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../auth/firebase-config';

const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
    
    const [currentUser, setCurrentUser] =useState();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser (user);
        })
    },[])

    return(
        <AuthContext.Provider value={{currentUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;