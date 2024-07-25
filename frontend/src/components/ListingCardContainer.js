import React, { useState, useEffect } from 'react';
import ListingCard from './ListingCard';
import PetCard from './PetCard';
import AddPetForm from './AddPetForm';  // Import the AddPetForm component
import EditPetForm from './EditPetForm.js';
import '../styles/ListingCardContainer.css';
import { useNavigate } from 'react-router-dom';
import { retrieveToken, storeToken } from '../tokenStorage.js';

const ListingCardContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listings, setListings] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showAddPetForm, setShowAddPetForm] = useState(false);  // New state for showing/hiding the form
  const [showEditForm, setShowEditForm] = useState(false);
  
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

    fetchListings(ud.username, token);
  }, []);

  const fetchListings = async (userLogin, jwtToken) => {
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
  
      console.log('Sending request to:', bp.buildPath('api/getUserListings'));
  
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
        console.log('User data:', data.listings);
        setListings(Array.isArray(data.listings) ? data.listings : []);
      } else {
        throw new Error('No user data received');
      }
    } catch (err) {
      console.error('Error in fetchUserListings:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditListing = async (petData) => {
    console.log("Submitting edited pet data:", petData); // Debugging log
    console.log("edited pet id:", petData.petId); // Debugging log

  
    let token = retrieveToken();
    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let username = ud.username;
  
    if (!username || !token) {
      console.error('User login or JWT token not found');
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
    console.log('API response:', data); // Debugging log
  
    if (data.token) {
      localStorage.setItem('jwtToken', data.token);
      token = data.token;
    }
  
    fetchListings(username, token);
  };
  

  const handleCreateListing = async (petData) => {

    console.log("pet being added", petData);

    let token = retrieveToken();
    console.log("Token in add listing:", token);

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);

    let username = ud.username;

    

    if (!username || !token) {
        console.error('User login or JWT token not found');
        return;
    }

    const response = await fetch(bp.buildPath('api/addpet'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({userLogin: username, ... petData, jwtToken: token})
    });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem('jwtToken', data.token);
        let token = data.token
    }

    fetchListings(username, token);


  }

  const handleRemoveListing = async (petId) => {
    
    let token = retrieveToken();
    console.log("Token in remove listings:", token);

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);

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
        body: JSON.stringify({ userLogin: username, petId: petId, jwtToken: token})
    });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem('jwtToken', data.token);
        let token = data.token
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