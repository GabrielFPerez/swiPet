import React from 'react';

import ResetPassword from '../components/ResetPassword.js';
import "../styles/ForgotPasswordPage.css"
import Layout from '../components/LayoutSignup.js'

const ForgotPasswordPage = () => {
    return (
        <Layout>
            <div className='forgot-page'>
                <ResetPassword />
            </div>
        </Layout>
    );
};

export default ForgotPasswordPage;



