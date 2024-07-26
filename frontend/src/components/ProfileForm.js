import React, { useState, useEffect } from 'react';

const ProfileForm = ({ initialData, onSubmit }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    userLogin: ''
  });
  const [file, setFile] = useState(null); // Change to null for a single file

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

    const fieldsToInclude = ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'userLogin'];

    // Append only the specified fields to formData
    fieldsToInclude.forEach(field => {
      if (userData[field]) { // Check if the field exists and is not empty
        formData.append(field, userData[field]);
      }
    });

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
      <div className="current-profile">
        <h2>Current Profile</h2>
        <img 
                src={`http://localhost:3001/${userData.userImage}`}  
              />
        <p>First Name: {initialData.firstName}</p>
        <p>Last Name: {initialData.lastName}</p>
        <p>Email: {initialData.email}</p>
        <p>Phone Number: {initialData.phoneNumber}</p>
        <p>Location: {initialData.address}</p>
        <p>Username: {initialData.username}</p>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        <h2>Edit Profile</h2>

        <div className="form-group">
          <label htmlFor="images">Upload Image</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageUpload}
            accept="image/*"
          />
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
            type="email"
            id="email"
            name="email"
            value={userData.email || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
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
            id="location"
            name="location"
            value={userData.address || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username || ''}
            readOnly
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;
