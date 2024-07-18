import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import { ReactComponent as LoginCat } from '../icons/login-cat.svg';
import { jwtDecode } from "jwt-decode";
import tokenStorage from '../tokenStorage.js';

function Login() {
    const [loginName, setLoginName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [message, setMessage] = useState('');
    
    var bp = require('./Path.js');

    const doLogin = async (event) => {
        event.preventDefault();

        var obj = { userLogin: loginName, password: loginPassword };
        var js = JSON.stringify(obj);

        const url = '/api/login';
        console.log('Sending request to:', new URL(url, window.location.origin).href);


        try {
            const response = await fetch(bp.buildPath('api/login'), {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' }
            });

            let res = JSON.parse(await response.text());
            const { jwtToken } = res;
            
            console.log("Received JWT:", jwtToken);

            if (!jwtToken) {
                throw new Error("No JWT token received");
            }

            //let storage = require('../tokenStorage.js');
            tokenStorage.storeToken(jwtToken);
            


            const decoded = jwtDecode(jwtToken, {complete: true});
            console.log("Decoded JWT:", decoded);
            

            let userID = decoded.userId;
            let FirstName = decoded.firstName;
            let LastName = decoded.lastName;
            let username = decoded.username;

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (userID) {
                var user = { FirstName: FirstName, LastName: LastName, userID: userID, username: username};
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/swipe';
            } else {
                console.log("userID is invalid:", userID);
                setMessage(res.message || 'Login failed');
            }
        } catch (e) {
            console.error('Login error:', e);
            setMessage('An error occurred: ' + e.message);
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