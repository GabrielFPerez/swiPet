import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { ReactComponent as LoginCat } from '../icons/login-cat.svg';
import { jwtDecode } from "jwt-decode";
import { storeToken } from '../tokenStorage.js';

function Login() {
    const [loginName, setLoginName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    var bp = require('./Path.js');

    const doLogin = async (event) => {
        event.preventDefault();

        var obj = { userLogin: loginName, password: loginPassword };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(bp.buildPath('api/login'), {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' }
            });

            let res = await response.json();
            const { jwtToken, message } = res;
            
            console.log("Received JWT:", jwtToken);

            if (message) {
                setMessage(message);
            }

            if (!jwtToken) {
                throw new Error(message || "Invalid login password combination");
            }

            storeToken(jwtToken);
            console.log("Stored token:", jwtToken);

            const decoded = jwtDecode(jwtToken);
            console.log("Decoded JWT:", decoded);

            let userID = decoded.userId;
            let FirstName = decoded.firstName;
            let LastName = decoded.lastName;
            let username = decoded.username;

            if (userID) {
                var user = { FirstName: FirstName, LastName: LastName, userID: userID, username: username };
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                console.log("Login successful, navigating to /swipe");
                navigate('/swipe');
            } else {
                console.log("userID is invalid:", userID);
                setMessage(message || 'Login failed');
            }
        } catch (e) {
            console.error('Login error:', e.message);
            setMessage(e.message);
        }
    };

    return (
        <div id="loginDiv">
            <div id="login-header">
                <LoginCat />
                <span id="inner-title">Login</span><br />
            </div><br/>

            <div id="username-box">
                <span id="username-title">Username</span><br />
                <input 
                    type="text" 
                    id="loginName"
                    aria-label="username"
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                /><br/>
            </div>
                
            <div id="password-box">
                <span id="password-title">Password</span><br />
                <input 
                    type="password" 
                    id="loginPassword"
                    aria-label="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
            </div><br/>
                
            <input 
                type="submit" 
                id="loginButton" 
                className="buttons" 
                value="Login"
                onClick={doLogin} 
            />
            <br/>
            <span id="loginResult">{message}</span>

            <p><Link to="/forgotpassword">Forgot your password?</Link></p>
        </div>
    );
}

export default Login;