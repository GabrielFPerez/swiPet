import React from 'react'
import NavBar from '../components/LoggedinNavBar'
import FooterLoggedin from '../components/FooterLoggedin'
import Cards from '../components/CardContainer'

const SwipingPage = () =>
    {
    
        return(
          <div>
            <NavBar />
            <Cards />
            <FooterLoggedin />
          </div>
        );
    };
    
export default SwipingPage;