import React from 'react'
import NavBar from '../components/LoggedinNavBar'
import FooterLoggedin from '../components/FooterLoggedin'
import ListingCardContainer from '../components/ListingCardContainer';
import Layout from '../components/Layout';

const YourListingsPage = () => {
  return (
    <Layout>
      <div className="listings-page">
          
          <ListingCardContainer />
          
      </div>
    </Layout>
  );
};

export default YourListingsPage;