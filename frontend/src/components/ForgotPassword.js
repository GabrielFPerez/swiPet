import React, { useState } from 'react';
import '../styles/ForgotPassword.css'
import { ReactComponent as Cat } from '../icons/forgot-password-cat.svg'
import { retrieveToken } from '../tokenStorage';

function Forgot()
{
    var bp = require('./Path.js');
    const [error, setError] = useState('');


    const doForget = async () => 
    {
        const userLogin = document.getElementById('userLogin').value;
        
        const email = document.getElementById('email').value;


        let obj = {userLogin, email};

        try {
            const response = await fetch(bp.buildPath('api/forgotPassword'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });

            const data = await response.json();
            if (response.ok) {
                //alert('forget successful');
                window.location.href = '/login';
            } else {
                setError('Registration failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error during forget password:', error);
            setError('An error occurred during forget password.');
        }
        
    };

    return(
        <div id="ForgotDiv">
                <div id="forgot-header">
                    <Cat />
                    <span id="inner-title">Forgot your Password?</span>
                    <span id="inner-title">No Problem!</span><br />
                </div>

                <div id="userLogin-box">
                    <span id="Login-title">Login</span><br />
                    <input type="text" id="userLogin" /><br />
                </div>

                <div id="email-box">
                    <span id="email-title">Email</span><br />
                    <input type="text" id="email" /><br />
                </div>


                <input type="submit" id="loginButton" class="buttons" value = "Reset"
                onClick={doForget} />
                <span id="loginResult"></span>
        </div>


        
    );
};

export default Forgot;
