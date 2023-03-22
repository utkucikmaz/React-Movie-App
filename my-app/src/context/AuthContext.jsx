import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
    
    const navigate = useNavigate();
    const [ credentials, setCredentials ] = useState({
        firstName : '',
        lastName: '',
        email: '',
        password: ''
    });
    const [ loginError, setLoginError] = useState(false);
    const [ login, setLogin ] = useState(false);

    const handleCredentials = (firstName, lastName, email, password) => {
        setCredentials({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password
        });
    }

    const handleLogin = (email, password) => {
        if(credentials.email == email && credentials.password == password){
            setLogin(true);
            setLoginError(false);
            navigate('/');
        }else{
            setLoginError(true)
        }
    }

    const handleLogOut = () => {
        setCredentials({
            firstName : '',
            lastName : '',
            email : '',
            password : ''
        });
        setLogin(false);
    }

    return(
        <AuthContext.Provider value={{
            credentials : credentials,
            handleCredentials : handleCredentials,
            handleLogin : handleLogin,
            loginError : loginError,
            login : login,
            handleLogOut : handleLogOut
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;