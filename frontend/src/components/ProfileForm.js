import React, { useState, useEffect } from 'react';
import '../styles/ProfileForm.css';

const ProfileForm = ({ initialData, onSubmit, onDeleteAccount }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    userLogin: ''
  });
  const [file, setFile] = useState(null); // Change to null for a single file

  const fallbackImage = 'https://swipet-becad9ab7362.herokuapp.com/uploads/nopic.jpg';

  useEffect(() => {
    // Set initial user data
    setUserData(initialData);
    console.log("Initial user data:", initialData);
  }, [initialData]);

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0]; // Get the first file from the input
    if (e.target.files.length > 1) {
      alert("You can only upload one image.");
      return;
    }
    setFile(selectedFile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => {
      const newData = { ...prevData, [name]: value };
      console.log("Updated user data:", newData);
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    const fieldsToInclude = ['firstName', 'lastName', 'email', 'phoneNumber', 'userLogin'];

    // Append only the specified fields to formData
    fieldsToInclude.forEach(field => {
      if (userData[field]) { // Check if the field exists and is not empty
        formData.append(field, userData[field]);
      }
    });

    if (userData.address) { // Check if the field exists and is not empty
      formData.append('location', userData.address);
    }

    // Append file to formData
    if (file) {
      formData.append('userImage', file);

      // Check if the file was appended correctly
      console.log("FormData image file:", formData.get("userImage").name);

      // Additional details about the file
      
    } else {
      console.log("No file selected");
    }

    // Submit the form data
    onSubmit(formData);
  };

  return (
    <div className="profile-container">

        <h1>{initialData.username}'s Profile</h1>

      <form onSubmit={handleSubmit} className="profile-form">

        <div className='top-bar'>
        
          <div className="current-profile">
            <div className='circular-container'> <img src={`https://swipet-becad9ab7362.herokuapp.com/${userData.userImage}`} 
                onError={(e) => e.target.src = fallbackImage}/> </div>
            <div className='profile-names'>
              <p>{initialData.firstName} {initialData.lastName}</p>
            </div>
          </div>

          
          <div className="form-group">
            <label htmlFor="images" className="custom-file-upload"
              > Upload New Photo 
            </label>

            <input
              type="file"
              id="images"
              name="images"
              onChange={handleImageUpload}
              accept="image/*"
              className="file-input"
            />
          </div>

        </div>

        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userData.firstName || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userData.lastName || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={userData.email || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={userData.phoneNumber || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={userData.address || ''}
            onChange={handleChange}
          />
        </div>
        <div className="button-container">
          <button type="button" className="delete-account-btn" onClick={onDeleteAccount}>Delete Account</button>
          <button className='submit-button' type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
