import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css'
import { ReactComponent as LoginCat } from '../icons/login-cat.svg'

function Login() {
    const [loginName, setLoginName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [message, setMessage] = useState('');
    const app_name = 'swipet-becad9ab7362';

    function buildPath(route) {
        if (process.env.NODE_ENV == 'production') {
            return 'https://' + app_name + '.herokuapp.com/' + route;
        } else {
            return 'http://localhost:3001/' + route;
        }
    }

    const doLogin = async (event) => {
        event.preventDefault();

        var obj = { login: loginName, password: loginPassword };
        var js = JSON.stringify(obj);

        const url = '/api/login';
        console.log('Sending request to:', new URL(url, window.location.origin).href);


        try {
            const response = await fetch(buildPath('api/login'), {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const res = await response.json();

            if (res.id) {
                var user = { firstName: res.firstName, lastName: res.lastName, id: res.id };
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/swipe';
            } else {
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