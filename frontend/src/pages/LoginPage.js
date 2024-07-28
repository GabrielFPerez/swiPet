import React from 'react';
import Login from '../components/Login';
import "../styles/LoginPage.css"
import LayoutLogin from '../components/LayoutLogin';

const LoginPage = () =>
{

    return(
      <LayoutLogin>
        <div className='login-page'>
        
          <div className='login-form'>
              <Login />
          </div>
          
        </div>
      </LayoutLogin>
    );
};

export default LoginPage;
