import React from 'react';

import NavBarLogin from '../components/NavBarLogin';
import Login from '../components/Login';
import "../styles/LoginPage.css"
import Footer from '../components/Footer';

const LoginPage = () =>
{

    return(
      <div className='login-page'>
        <NavBarLogin />
        <div className='login-form'>
            <Login />
        </div>
        <Footer />
      </div>
    );
};

export default LoginPage;
