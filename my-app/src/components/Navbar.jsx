import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    // const navigate = useNavigate();

    // const handleClick = () => {
    //     navigate ('/login')
    // }

  return (
    <div>
      <nav className="navbar navbar-light">
        <a className="navbar-brand" href="/">
          React Movie App
        </a>
        <div className="buttons">
            <button
            type="button"
            className="btn btn-outline-light mx-2"
            // onClick={handleClick}
            >
                Login
            </button>
            <button
            type="button"
            className="btn btn-outline-light mx-2"
            // onClick={() => navigate ('/register')}
            >
                Register
            </button>
        </div>
      </nav>
    </div>
  );
}
