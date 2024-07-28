// Layout.js
import React from 'react';
import '../styles/Layout.css';
import NavBar from '../components/NavBarLogin';
import Footer from '../components/Footer';

const LayoutLogin = ({ children }) => {
  return (
    <div className="layout">
      <NavBar />
      <div className="content">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default LayoutLogin;