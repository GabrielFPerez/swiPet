import React from 'react';

import NavBarSignup from '../components/NavBarSignup';
import SignUp from '../components/SignUp';
import Footer from '../components/Footer';
import "../styles/SignUpPage.css"
import LayoutSignup from '../components/LayoutSignup';

const SignUpPage = () => {
    return (
        <LayoutSignup>
        <div className='full-page-background signup-page'>
            <SignUp />
        </div>
        </LayoutSignup>
    );
};

export default SignUpPage;



