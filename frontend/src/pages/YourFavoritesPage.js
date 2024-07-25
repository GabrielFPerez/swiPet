import React from 'react'
import NavBar from '../components/LoggedinNavBar'
import FooterLoggedin from '../components/FooterLoggedin'
import FavoriteCardContainer from '../components/FavoriteCardContainer';

const YourFavoritesPage = () => {
  return (
      <div className="favorites-page">
          <NavBar />
          <FavoriteCardContainer />
          <FooterLoggedin />
      </div>
  );
};

export default YourFavoritesPage;