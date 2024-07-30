import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignUp.css'
import { ReactComponent as SigninCat } from '../icons/register-cat.svg'

function SignUp() {
    var bp = require('./Path.js');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userLogin, setUserLogin] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const errors = [];
        if (!userLogin) errors.push('Username is required');
        if (userLogin && userLogin.length < 3) errors.push('Username must be at least 3 characters long');
        if (!email) errors.push('Email is required');
        if (email && !validateEmail(email)) errors.push('Invalid email address');
        if (!password) errors.push('Password is required');
        if (password && password.length < 6) errors.push('Password must be at least 6 characters long');
        setValidationErrors(errors);
        return errors.length === 0;
    };

    const handleChange = (setter, value) => {
        setter(value);
        validateForm();
    };

    const doSignUp = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const payload = {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            userLogin,
            password
        };

        console.log(confirmPassword);

        console.log(payload);

        if (confirmPassword !== password) {
            setError("Passwords must match");
            return;
        }

        try {
            const response = await fetch(bp.buildPath('api/register'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (response.ok) {
                window.location.href = '/login';
            } else {
                setError('Registration failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('An error occurred during registration.');
        }
    };

    return (
        <div id="SignupDiv">
            <div id="signup-text">
                <div id="signup-header">
                    <SigninCat />
                    <span id="inner-title">Register</span><br />
                </div>

                <div id="username-box">
                    <span id="signup-title">First Name</span><br />
                    <input 
                        type="text" 
                        id="firstname" 
                        value={firstName} 
                        onChange={(e) => handleChange(setFirstName, e.target.value)} 
                    /><br />
                </div>

                <div id="username-box">
                    <span id="signup-title">Last Name</span><br />
                    <input 
                        type="text" 
                        id="lastname" 
                        value={lastName} 
                        onChange={(e) => handleChange(setLastName, e.target.value)} 
                    /><br />
                </div>

                <div id="username-box">
                    <span id="signup-title">Username</span><br />
                    <input 
                        type="text" 
                        id="login" 
                        value={userLogin} 
                        onChange={(e) => handleChange(setUserLogin, e.target.value)} 
                        required 
                    /><br />
                </div>

                <div id="username-box">
                    <span id="signup-title">Email Address</span><br />
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => handleChange(setEmail, e.target.value)} 
                        required 
                    /><br />
                </div>

                <div id="username-box">
                    <span id="signup-title">Phone Number</span><br />
                    <input 
                        type="text" 
                        id="phonenumber" 
                        value={phoneNumber} 
                        onChange={(e) => handleChange(setPhoneNumber, e.target.value)} 
                    /><br />
                </div>

                <div id="username-box">
                    <span id="signup-title">Location</span><br />
                    <input 
                        type="text" 
                        id="address" 
                        value={address} 
                        onChange={(e) => handleChange(setAddress, e.target.value)} 
                    /><br />
                </div>

                <div id="password-box">
                    <span id="signup-title">Password</span><br />
                    <input 
                        type="password" 
                        id="registerpassword" 
                        value={password} 
                        onChange={(e) => handleChange(setPassword, e.target.value)} 
                        required 
                    /><br />
                </div>

                <div id="password-box">
                    <span id="signup-title">Confirm Password</span><br />
                    <input 
                        type="password" 
                        id="confirmpassword" 
                        value={confirmPassword} 
                        onChange={(e) => handleChange(setConfirmPassword, e.target.value)} 
                    /><br />
                </div>

                {validationErrors.length > 0 && (
                    <div className="error-messages">
                        {validationErrors.map((error, index) => (
                            <div key={index} className="error-message">{error}</div>
                        ))}
                    </div>
                )}

                {error && <div className="error-message">{error}</div>}

                <input 
                    type="submit" 
                    id="loginButton" 
                    className="buttons" 
                    value="Create Account"
                    onClick={doSignUp} 
                />
                <span id="loginResult"></span>

                <p>Already have an <Link to="/login">account?</Link></p>
            </div>
        </div>
    );
}

export default SignUp;
