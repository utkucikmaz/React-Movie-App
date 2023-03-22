import React, {useContext} from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";

export default function Navbar() {
    const navigate = useNavigate();
    const { credentials, login, handleLogOut } = useContext (AuthContext);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-between">
        <a className="navbar-brand" href="/">
          React Movie App
        </a>
        <div className="buttons">
            {
              login ?
                <div className="d-flex">
                   <h1 className="user-id text-capitalize">
                      {credentials.firstName + ' ' + credentials.lastName}
                   </h1>
                   <button 
                   className="btn btn-outline-light mx-2 btn-logout"
                   onClick={handleLogOut}
                   >
                      Logout
                      <svg className="logout-icon" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="#374151" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
                   </button>
                </div>
              : (
                <div>
                   <button
                      type="button"
                      className="btn btn-outline-light mx-2"
                      onClick={() => navigate ('/login')} >
                        Login
                   </button>
                   <button
                      type="button"
                      className="btn btn-outline-light mx-2"
                      onClick={() => navigate ('/register')} >
                        Register
                   </button>
                </div>
              )

            }

        </div>
      </nav>
    </div>
  );
}
