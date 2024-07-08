import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ForgotPassword.css'
import { ReactComponent as Cat } from '../icons/forgot-password-cat.svg'

function SignUp()
{

    const doLogin = async event => 
    {
        event.preventDefault();

        
    };

    return(
        <div id="ForgotDiv">
                <div id="forgot-header">
                    <Cat />
                    <span id="inner-title">Forgot your Password?</span>
                    <span id="inner-title">No Problem!</span><br />
                </div>

                <div id="email-box">
                    <span id="email-title">Email</span><br />
                    <input type="text" id="email" /><br />
                </div>

                <div id="password-box">
                    <span id="newpassword-title">New Password</span><br />
                    <input type="text" id="password" /><br />
                </div>
                
                <div id="password-box">
                    <span id="newpassword-title">Confirm Password</span><br />
                    <input type="password" id="confirmpassword" /><br />
                </div>

                <input type="submit" id="loginButton" class="buttons" value = "Reset"
                onClick={doLogin} />
                <span id="loginResult"></span>
        </div>


        
    );
};

export default SignUp;
