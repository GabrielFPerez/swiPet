import React from 'react';

import ForgotPassword from '../components/ForgotPassword';
import "../styles/ForgotPasswordPage.css"
import Layout from '../components/LayoutSignup.js'

const ForgotPasswordPage = () => {
    return (
        <Layout>
            <div className='forgot-page'>
                <ForgotPassword />
            </div>
        </Layout>
    );
};

export default ForgotPasswordPage;



