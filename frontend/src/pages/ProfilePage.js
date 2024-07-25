import NavBar from '../components/LoggedinNavBar'
import { useNavigate } from 'react-router-dom';
import FooterLoggedin from '../components/FooterLoggedin'
import React, { useState, useEffect } from 'react';
import ProfileForm from '../components/ProfileForm';
import { retrieveToken, storeToken } from '../tokenStorage.js';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateMessage, setUpdateMessage] = useState('');
  
  const navigate = useNavigate();
  var bp = require('../components/Path.js');

  useEffect(() => {
    const token = retrieveToken();
    console.log("Token in Profile useEffect:", token);
    
    if (!token) {
      console.error('No token found in storage');
      return;
    }
  
    let ud = JSON.parse(localStorage.getItem('user_data'));
    if (ud && ud.username) {
      fetchUserData(ud.username, token);
    } else {
      console.error('No username found in user_data');
    }
  }, []);

  const fetchUserData = async (userLogin, jwtToken) => {
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
  
      console.log('Sending request to:', bp.buildPath('api/getUserInfo'));
  
      const response = await fetch(bp.buildPath('api/getUserInfo'), {
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
  
      if (data) {
        console.log('User data:', data);
        setUserData(data);
      } else {
        throw new Error('No user data received');
      }
    } catch (err) {
      console.error('Error in fetchUserData:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async (updatedData) => {
    try {
      const token = retrieveToken();
      const ud = JSON.parse(localStorage.getItem('user_data'));

      const response = await fetch(bp.buildPath('api/updateUser'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userLogin: ud.username,
          ...updatedData,
          jwtToken: token
        }),
      });

      const result = await response.json();

      if (result.message === 'User updated successfully') {
        // Update the local state with the new data
        setUserData(prevData => ({
          ...prevData,
          ...updatedData,
           // Ensure address is updated correctly
        }));
        storeToken(result.jwtToken);
        setError(null);
        setUpdateMessage('Profile updated successfully!');
        
        // Update user_data in localStorage
        const updatedUserData = {
          ...ud,
          firstName: updatedData.firstName,
          lastName: updatedData.lastName
        };
        localStorage.setItem('user_data', JSON.stringify(updatedUserData));
      } else {
        setError(result.message);
        setUpdateMessage('');
      }
    } catch (err) {
      setError('Failed to update user data');
      setUpdateMessage('');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-page">
      <NavBar />
      <h1>User Profile</h1>
      {updateMessage && <div className="update-message">{updateMessage}</div>}
      <ProfileForm
        initialData={userData}
        onSubmit={handleUpdateUser}
      />

      <FooterLoggedin />
    </div>
  );
};

export default ProfilePage;