import React from 'react';
import Layout from '../components/LayoutLogin';
import Welcome from '../components/landing/Welcome.js';
import Adopt from '../components/landing/Adopt.js';
import Works from '../components/landing/Works.js';
import Meet from '../components/landing/Meet.js';
import SeeApp from '../components/landing/SeeApp.js';
import { Button } from '../components/Button.js';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Register} from '../icons/emergency-exit.svg'

import '../styles/LandingPage.css';
import '../styles/Navbar.css';

const LandingPage = () => {
    const navigate = useNavigate();
    const handleRegisterClick = () => {
        navigate('/signup');
    };

    return (
        <Layout>
            <div>
                <Welcome />
                <Adopt />
                <Works />
                <Meet />
                <SeeApp />

                <div className='join'>
                    <div className='joinText'>
                        Ready to Join?
                    </div>
                    <div className="create-account">
                        <div className="text-wrapper">Register</div>
                        <button id="login-button" aria-label="Login Button" onClick={handleRegisterClick}></button>
                        <Register style={{ width: '19px', height: '19px' }} />
                        </div>
                </div>
            </div>
        </Layout>
    );
};

export default LandingPage;
