// src/components/Navbar.js
import React from 'react';
import '../styles/Navbar.css';
import { ReactComponent as Logo} from '../icons/logo.svg'
import { ReactComponent as MenuIcon} from '../icons/menu-icon.svg'
import { ReactComponent as Register} from '../icons/emergency-exit.svg'

const Navbar = () => {
  const goToLoginPage= async event => 
    {
        event.preventDefault();
        window.location.href = '/login';
        
    };
  
  
  
  
  
  return (
    <nav className="navbar"> {/* Add this wrapper */}
      <div className="navbar-flex">
        
        <div className="navbar-logo">
          <Logo />
        </div>
        <div className="create-account">
          <div className="text-wrapper">Login</div>
          <button onClick={goToLoginPage}></button>
          <Register style={{ width: '19px', height: '19px' }} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;