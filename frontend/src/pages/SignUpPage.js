import React from 'react';

import NavBarSignup from '../components/NavBarSignup';
import SignUp from '../components/SignUp';
import Footer from '../components/Footer';
import "../styles/SignUpPage.css"

const SignUpPage = () => {
    return (
        <div className='full-page-background signup-page'>
            <NavBarSignup />
            <SignUp />
            <Footer />
        </div>
    );
};

export default SignUpPage;



