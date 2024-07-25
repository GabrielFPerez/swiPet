import React from 'react'
import NavBar from '../components/LoggedinNavBar'
import FooterLoggedin from '../components/FooterLoggedin'
import ListingCardContainer from '../components/ListingCardContainer';


const YourListingsPage = () => {
  return (
      <div className="listings-page">
          <NavBar />
          <ListingCardContainer />
          <FooterLoggedin />
      </div>
  );
};

export default YourListingsPage;