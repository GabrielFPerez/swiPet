import React from 'react';
import './Welcome.css';
import LandingCat from '../../icons/landing-page-cat.png';


const Welcome = () => {
    return(
      <div className='Welcome'>
        <div className='welcome-text'>
          <span className='top-text'>Welcome to SwiPet</span><br/>
          <span className='bot-text'>Finding a forever home for every pet is our mission. Whether you’re a pet owner needing to rehome your beloved companion or a prospective pet parent looking to add a family member, we’re here to help.</span>
        </div>
        <div className="land-cat">
          <img  src={LandingCat} alt="fireSpot"/>
        </div>

          
      </div>
        
    );
};

export default Welcome;