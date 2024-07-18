import React from 'react'
import NavBar from '../components/LoggedinNavBar'
import FooterLoggedin from '../components/FooterLoggedin'
import Cards from '../components/CardContainer'

const SwipingPage = () => {
  return (
      <div className="swiping-page">
          <NavBar />
          <div className="content-wrapper">
              <Cards />
          </div>
          <FooterLoggedin />
      </div>
  );
};

export default SwipingPage;