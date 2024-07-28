import React, { useState, useEffect } from 'react';
import FavoriteCard from './FavoriteCard';
import PetCard from './PetCard';
import '../styles/FavoriteCardContainer.css';
import { useNavigate } from 'react-router-dom';
import { retrieveToken, storeToken } from '../tokenStorage.js';
import { ReactComponent as Balloon} from '../icons/balloon.svg';

const FavoriteCardContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const navigate = useNavigate();
  var bp = require('../components/Path.js');

  useEffect(() => {
    const token = retrieveToken();
    console.log("Token in favorites card useEffect:", token);
    
    if (!token) {
      console.error('No token found in storage');
      return;
    }

    let ud = JSON.parse(localStorage.getItem('user_data'));

    fetchFavorites(ud.username, token);
  }, []);

  const fetchFavorites = async (userLogin, jwtToken) => {
    setIsLoading(true);
    setError(null);
  
    try {
      if (!userLogin || !jwtToken) {
        throw new Error('Missing userLogin or jwtToken');
      }
  
      let obj = {
        userLogin: userLogin,
        jwtToken: jwtToken
      };
  
      let js = JSON.stringify(obj);
  
      console.log('Sending request to:', bp.buildPath('api/getUserFavorites'));
  
      const response = await fetch(bp.buildPath('api/getUserFavorites'), {
        method: 'POST',
        body: js,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      if (data.jwtToken) {
        storeToken(data.jwtToken);
      }
  
      if (data.favorites) {
        console.log('User data:', data.favorites);
        setFavorites(Array.isArray(data.favorites) ? data.favorites : []);
      } else {
        throw new Error('No user data received');
      }
    } catch (err) {
      console.error('Error in fetchUserFavorites:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFavorite = async (petId) => {
    
    let token = retrieveToken();
    console.log("Token in undoFavorite:", token);

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);

    let username = ud.username;

    console.log("current user is: ", username);

    if (!username || !token) {
        console.error('User login or JWT token not found');
        return;
    }

    const response = await fetch(bp.buildPath('api/unfavorite'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userLogin: username, petId: petId, jwtToken: token})
    });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem('jwtToken', data.token);
        let token = data.token
    }

    console.log("username is: ", username);
    console.log("token is: ", token);

    fetchFavorites(username, token);
  };

  const handleSendInquiry = async (petId) => {
    let token = retrieveToken();
    console.log("Token in SendInquiry: ", token);

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);

    let username = ud.username;

    console.log("current user is: ", username);

    if (!username || !token) {
        console.error('User login or JWT token not found');
        return;
    }

    const response = await fetch(bp.buildPath('api/sendInquiry'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userLogin: username, petId: petId, jwtToken: token})
    });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem('jwtToken', data.token);
        let token = data.token
    }

    console.log("username is: ", username);
    console.log("token is: ", token);
    fetchFavorites(username, token);



  };

  const handleViewOriginal = (pet) => {
    setSelectedPet(pet);
  };

  const handleCloseModal = () => {
    setSelectedPet(null);
  };

  return (
    <div className='page-content'>
      <div className='title' > <Balloon />Likes</div>
      <div className="favorites-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : favorites.length > 0 ? (
          favorites.map(pet => (
            <FavoriteCard
              key={pet._id}
              pet={pet}
              onRemoveFavorite={handleRemoveFavorite}
              onSendInquiry={handleSendInquiry}
              onViewOriginal={handleViewOriginal}
            />
          ))
        ) : (
          <p>No favorites found.</p>
        )}
        {selectedPet && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <PetCard pet={selectedPet} showButtons={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteCardContainer;