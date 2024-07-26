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
        setUserData(data.userInfo);
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

  const handleUpdateUser = async (formData) => {
    console.log("Starting handleUpdateUser");
    const token = retrieveToken();
    const ud = JSON.parse(localStorage.getItem('user_data'));
  
    // Append additional data
    formData.append('userLogin', ud.username);
    formData.append('jwtToken', token);
  
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {
      console.log("Sending update request to:", bp.buildPath('api/updateUser'));
      const response = await fetch(bp.buildPath('api/updateUser'), {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response body:", errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }
  
      const result = await response.json();
      console.log("API response:", result);
  
      // ... rest of the function remains the same ...
  
    } catch (error) {
      console.error('Error updating user:', error);
      setError('An error occurred while updating the profile. Please try again.');
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