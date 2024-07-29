import React from 'react';
import { ReactComponent as SwipetLogo } from '../icons/logo.svg'
import { ReactComponent as Copyright } from '../icons/copyright-icon.svg'
import '../styles/Footer.css'


function Footer()
{
    return( 
        <div className="footer-container">
            <div className="left-side-container">
                <div className="logo"> <SwipetLogo /> </div>
                
                <div className="swipet-copyright">
                    <Copyright />
                    <span id="copyright-text">2024 Swipet</span>
                </div>

            </div>

            <div className="right-side-container">
                <div><span></span></div>
                <div><a href="https://github.com/GabrielFPerez/swiPet"><span>GitHub</span></a></div>
                <div><span></span></div>
            </div>
        </div>
    );
};

export default Footer;
