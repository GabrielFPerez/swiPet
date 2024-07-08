import React from 'react';

import NavBarSignup from '../components/NavBarSignup';
import ForgotPassword from '../components/ForgotPassword';
import Footer from '../components/Footer';
import "../styles/ForgotPasswordPage.css"

const ForgotPasswordPage = () => {
    return (
        <div className='forgot-page'>
            <NavBarSignup />
            <ForgotPassword />
            <Footer />
        </div>
    );
};

export default ForgotPasswordPage;



