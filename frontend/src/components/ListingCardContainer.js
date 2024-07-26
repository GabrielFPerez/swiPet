import React, { useState, useEffect } from 'react';
import ListingCard from './ListingCard';
import PetCard from './PetCard';
import AddPetForm from './AddPetForm';
import EditPetForm from './EditPetForm.js';
import '../styles/ListingCardContainer.css';
import { useNavigate } from 'react-router-dom';
import { retrieveToken, storeToken } from '../tokenStorage.js';
import axios from 'axios';

const ListingCardContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listings, setListings] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showAddPetForm, setShowAddPetForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  
  const navigate = useNavigate();
  var bp = require('../components/Path.js');

  useEffect(() => {
    const token = retrieveToken();
    
    if (!token) {
      return;
    }

    let ud = JSON.parse(localStorage.getItem('user_data'));
    fetchListings(ud.username, token);
  }, []);

  const fetchListings = async (userLogin, jwtToken) => {
    setIsLoading(true);
    setError(null);
  
    try {
      if (!userLogin || !jwtToken) {
        throw new Error('Missing userLogin or jwtToken');
      }
  
      let obj = { userLogin, jwtToken };
      let js = JSON.stringify(obj);
    
      const response = await fetch(bp.buildPath('api/getUserListings'), {
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
  
      if (data.listings) {
        setListings(Array.isArray(data.listings) ? data.listings : []);
      } else {
        throw new Error('No user data received');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditListing = async (petData) => {
  
    let token = retrieveToken();
    let ud = JSON.parse(localStorage.getItem('user_data'));
    let username = ud.username;
  
    if (!username || !token) {
      return;
    }
  
    const response = await fetch(bp.buildPath('api/updatepet'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userLogin: username, petId: petData.petId, ...petData, jwtToken: token })
    });
  
    const data = await response.json();
    console.log('API response:', data);
  
    if (data.token) {
      localStorage.setItem('jwtToken', data.token);
      token = data.token;
    }
  
    fetchListings(username, token);
  };
  
  const handleCreateListing = async (formData) => {
    let token = retrieveToken();
    let ud = JSON.parse(localStorage.getItem('user_data'));
    let username = ud.username;

    if (!username || !token) {
      console.error('User login or JWT token not found');
      return;
    }

    formData.append('userLogin', username);
    formData.append('jwtToken', token);

    for (let key of formData.keys()) {
      console.log(key, formData.get(key));
    }

    try {
      const response = await fetch(bp.buildPath('api/addpet'), {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      console.log("returned from API", data);
  
      if (data.jwtToken) {
        storeToken(data.jwtToken);
      }
  
      if (data.message === "Pet Created") {
        console.log("Pet created successfully. Pet ID:", data.petId);
        fetchListings(username, data.jwtToken || token);
      } else {
        console.error("Failed to create pet:", data.message);
      }
  
      if (data.imageMessage) {
        console.log("Image upload message:", data.imageMessage);
      }
    } catch (error) {
      console.error('Error adding pet:', error);
    }
  };

  const handleRemoveListing = async (petId) => {
    let token = retrieveToken();
    console.log("Token in remove listings:", token);

    let ud = JSON.parse(localStorage.getItem('user_data'));
    let username = ud.username;

    console.log("current user is: ", username);

    if (!username || !token) {
      console.error('User login or JWT token not found');
      return;
    }

    const response = await fetch(bp.buildPath('api/deletepet'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userLogin: username, petId, jwtToken: token })
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem('jwtToken', data.token);
      token = data.token;
    }

    console.log("username is: ", username);
    console.log("token is: ", token);

    fetchListings(username, token);
  };

  const handleViewOriginal = (pet) => {
    setSelectedPet(pet);
  };

  const handleCloseModal = () => {
    setSelectedPet(null);
  };

  const handleEditClick = (pet) => {
    setSelectedPet(pet);
    setShowEditForm(true);
  };

  return (
    <div className="listings-container">
      <button 
        className="add-pet-button" 
        onClick={() => setShowAddPetForm(true)}
      >
        Add New Pet
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : listings.length > 0 ? (
        listings.map(pet => (
          <ListingCard
            key={pet._id}
            pet={pet}
            onRemoveListing={handleRemoveListing}
            onEditClick={handleEditClick}
            onViewOriginal={handleViewOriginal}
          />
        ))
      ) : (
        <p>No listings found.</p>
      )}
      {selectedPet && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <PetCard pet={selectedPet} showButtons={false} />
          </div>
        </div>
      )}
      {showAddPetForm && (
        <div className="modal-overlay" onClick={() => setShowAddPetForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <AddPetForm onSubmit={handleCreateListing} onCancel={() => setShowAddPetForm(false)} />
          </div>
        </div>
      )}
      {showEditForm && selectedPet && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditPetForm
              pet={selectedPet}
              onSubmit={handleEditListing}
              onCancel={() => {
                setShowEditForm(false);
                setSelectedPet(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingCardContainer;