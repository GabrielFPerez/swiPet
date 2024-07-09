import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignUp.css'
import { ReactComponent as SigninCat } from '../icons/register-cat.svg'

function SignUp() {

    const app_name = 'swipet-becad9ab7362';

    function buildPath(route) {
        if (process.env.NODE_ENV == 'production') {
            return 'https://' + app_name + '.herokuapp.com/' + route;
        } else {
            return 'http://localhost:3001/' + route;
        }
    }

    const [error, setError] = useState('');

    const doSignUp = async event => 
    {
        event.preventDefault();

        const firstName = document.getElementById('firstname').value;
        const lastName = document.getElementById('lastname').value;
        const login = document.getElementById('login').value;
        const email = document.getElementById('email').value;
        const location = document.getElementById('location').value;
        const phoneNumber = document.getElementById('phonenumber').value;
        const password = document.getElementById('registerpassword').value;
        const confirmPassword = document.getElementById('confirmpassword').value;

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const payload = {
            firstName,
            lastName,
            email,
            phoneNumber,
            location,
            login,
            password
        };

        try {
            const response = await fetch(buildPath('/api/register'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (response.ok) {
                //alert('Registration successful');
                window.location.href = '/login';
            } else {
                setError('Registration failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('An error occurred during registration.');
        }
    };


    return(
        <div id="SignupDiv">
            <div id="signup-text">
                <div id="signup-header">
                    <SigninCat />
                    <span id="inner-title">Register</span><br />
                </div>

                <div id="username-box">
                    <span id="signup-title">First Name</span><br />
                    <input type="text" aria-label="firstname" id="firstname" /><br />
                </div>

                <div id="username-box">
                    <span id="signup-title">Last Name</span><br />
                    <input type="text" aria-label="lastname" id="lastname" /><br />
                </div>

                <div id="username-box">
                    <span id="signup-title">Username</span><br />
                    <input type="text" aria-label="username" id="login" /><br />
                </div>

                <div id="username-box">
                    <span id="signup-title">Email Address</span><br />
                    <input type="text" aria-label="email" id="email" /><br />
                </div>

                <div id="username-box">
                    <span id="signup-title">Phone Number</span><br />
                    <input type="text" aria-label="phonenumber" id="phonenumber" /><br />
                </div>

                <div id="username-box">
                    <span id="signup-title">Location</span><br />
                    <input type="text" aria-label="location" id="location" /><br />
                </div>
                
                <div id="password-box">
                <span id="signup-title">Password</span><br />
                <input type="password" aria-label="password" id="registerpassword" /><br />
                </div>
                
                <div id="password-box">
                <span id="signup-title">Confirm Password</span><br />
                <input type="password" aria-label="confirmpassword" id="confirmpassword" /><br />
                </div>

                {error && <div className="error-message">{error}</div>}

                <input type="submit" id="loginButton" class="buttons" value = "Create Account"
                onClick={doSignUp} />
                <span id="loginResult"></span>

                <p>Already have an <Link to="/login">account?</Link></p>
            
            </div>


        </div>
    );
};

export default SignUp;
