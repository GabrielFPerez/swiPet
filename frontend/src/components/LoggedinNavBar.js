import React, { useState } from 'react';
import '../styles/LoggedinNavBar.css';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../icons/logo.svg';
import { ReactComponent as MenuIcon } from '../icons/menu-icon.svg';
import { ReactComponent as Register } from '../icons/emergency-exit.svg';
import Sidebar from './Sidebar';

const LoggedinNavbar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const goToLandingPage = async (event) => {
    event.preventDefault();
    window.location.href = '/';
  };

  const toggleSidebar = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-flex">
          <div className="navbar-menu-button">
            <button onClick={() => toggleSidebar(!isSidebarOpen)}>
              <MenuIcon />
            </button>
          </div>
          <div onClick={() => navigate('/')} className="navbar-logo">
            <Logo />
          </div>
          <div className="create-account">
            <div className="text-wrapper">Logout</div>
            <button onClick={goToLandingPage}></button>
            <Register style={{ width: '19px', height: '19px' }} />
          </div>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default LoggedinNavbar;
