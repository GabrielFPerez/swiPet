import React from 'react';
import './Meet.css';
import Kevin from '../../icons/Kevin.png';
import Jamba from '../../icons/Jamba.png';
import Teller from '../../icons/Teller.png';







const Meet = () => {
    return(
      <div className='Meet'>

        <span className='meet-text'>Meet some of our wonderful SwiPets!</span>

        <div className='swipet-cont'>
            <div className='swipet'>
                <img src={Jamba} alt="jamba cat "/>
                <span className='meet-text'>Teller<br/>6 Years Old</span>

            </div>

            <div className='swipet'>
                <img src={Teller} alt="teller dog"/>
                <span className='meet-text'>Kevin<br/>4 Years Old</span>

            </div>

            <div className='swipet'>
                <img src={Kevin} alt="kevin cat"/>
                <span className='meet-text'>Jamba<br/>2 Years Old</span>
                

            </div>

        </div>



          
      </div>
        
    );
};

export default Meet;