import React from 'react';
import './Adopt.css';
import { ReactComponent as Divider } from '../../icons/Divider3.svg';
import { ReactComponent as Heartfelt } from '../../icons/heartfelt.svg';
import { ReactComponent as Simple } from '../../icons/simple2.svg';
import { ReactComponent as Transparent } from '../../icons/transparent.svg';



const Adopt = () => {
    return(
      <div className='Adopt'>
        
        <Divider />
        <span className='adopt-text'>SwiPet makes the process of adopting or rehoming pets <span className='ital'>simple, transparent, </span> and <span className='ital'>heartfelt</span> 
        </span>

        <div className='mission-box-container'>
            <div className='mission-box'>
                <Simple />
                <span className='mission-text'>Our easy-to-use search and filter options make adopting a seamless  experience</span>


            </div>

            <div className='mission-box'>
                <Transparent />
                <span className='mission-text'>We connect you with trusted adoption centers and fellow swiPet users, ensuring you have peace of mind</span>
                
            </div>

            <div className='mission-box'>
                <Heartfelt />
                <span className='mission-text'>Our goal is to ensure every animal is sent to a loving home one adoption at a time</span>
                
            </div>
        </div>

          
      </div>
        
    );
};

export default Adopt;