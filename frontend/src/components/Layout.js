// Layout.js
import React from 'react';
import '../styles/Layout.css';
import NavBar from '../components/LoggedinNavBar';
import FooterLoggedin from '../components/FooterLoggedin';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <NavBar />
      <div className="content">
        {children}
      </div>
      <FooterLoggedin />
    </div>
  );
};

export default Layout;