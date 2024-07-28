import React from 'react'
import NavBar from '../components/LoggedinNavBar'
import FooterLoggedin from '../components/FooterLoggedin'
import FavoriteCardContainer from '../components/FavoriteCardContainer';
import Layout from '../components/Layout';

const YourFavoritesPage = () => {
  return (
    <Layout>
      <div className="favorites-page">
          
        <FavoriteCardContainer />
          
      </div>
    </Layout>
  );
};

export default YourFavoritesPage;