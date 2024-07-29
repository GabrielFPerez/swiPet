import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Cat } from '../icons/forgot-password-cat.svg'
import '../styles/ForgotPassword.css';


const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();


    const handleResetPassword = async (e) => {
        var bp = require('./Path.js');

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');

        console.log("password:",newPassword);
        console.log("token:",token);

        let obj = {
            token,
            newPassword
        }

        let js = JSON.stringify(obj);

        console.log('Sending request to:', bp.buildPath('api/resetPassword'));

        try {
            const response = await fetch(bp.buildPath('api/resetPassword'), {
              method: 'POST',
              body: js,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
      });

            setMessage(response.data.message);
            if (response.ok) {
                navigate('/login');
                
            }
        } catch (error) {
            setMessage('An error occurred while resetting the password');
        }
    };

    return (

        <div id="ForgotDiv">
            <div id="forgot-header">
                <Cat />
                <span id="inner-title">Reset Your Password!</span>
            </div>

            <div id="userLogin-box">
                <span id="Login-title">New Password</span><br />
                <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
            </div>

            <div id="email-box">
                <span id="email-title">Confirm Your Password</span><br />
                <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
            </div>


            <button type="submit" id="loginButton" class="buttons" value = "Reset"
            onClick={handleResetPassword} />
            <span id="loginResult"></span>
        </div>        
        
    );
};

export default ResetPassword;
