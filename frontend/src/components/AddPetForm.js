import React, { useState } from 'react';
import '../styles/AddPetForm.css';

const AddPetForm = ({ onSubmit, onCancel }) => {
  const [petData, setPetData] = useState({
    petName: '',
    type: '',
    petAge: '',
    petGender: '',
    colors: [],
    breed: '',
    petSize: '',
    bio: '',
    prompt1: '',
    prompt2: '',
    contactEmail: '',
    location: '',
    adoptionFee: ''
  });

  const [files, setFiles] = useState([]);

  const allowedColors = ["Brown", "Black", "White", "Gold", "Gray", "Red", "Yellow", "Blue", "Orange", "Purple", "Green"];

  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleColorChange = (color) => {
    setPetData(prevData => ({
      ...prevData,
      colors: prevData.colors.includes(color)
        ? prevData.colors.filter(c => c !== color)
        : [...prevData.colors, color]
    }));
  };

  const handleImageUpload = (e) => {
    const petImages = Array.from(e.target.files);
    if (petImages.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }
    setFiles(petImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all pet data to formData
    Object.keys(petData).forEach(key => {
      if (key === 'colors') {
        petData[key].forEach(color => formData.append('colors', color));
      } else {
        formData.append(key, petData[key]);
      }
    });

    // Append files to formData
    files.forEach((file, index) => {
      formData.append(`petImages`, file);
    });

    onSubmit(formData);
  };


  const renderPage1 = () => (
    <>
      
      <div className="oneline">

        <div className="input-group">
          <label htmlFor="petName">Pet Name:</label>
          <input
            type="text"
            id="petName"
            name="petName"
            value={petData.petName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={petData.type}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="breed">Breed:</label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={petData.breed}
            onChange={handleChange}
            required
          />
        </div>

      </div>

      <div className="oneline">

        <div className="input-group">
          <label htmlFor="adoptionFee">Adoption Fee:</label>
          <input
            type="number"
            id="adoptionFee"
            name="adoptionFee"
            value={petData.adoptionFee}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="petSize">Size:</label>
          <select
            id="petSize"
            name="petSize"
            value={petData.petSize}
            onChange={handleChange}
            required
          >
            <option value="">Select Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="petAge">Age:</label>
          <input
            type="text"
            id="petAge"
            name="petAge"
            value={petData.petAge}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="petGender">Gender:</label>
          <select
            id="petGender"
            name="petGender"
            value={petData.petGender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

      </div>


      <div className="input-group">
        <label>Color(s):</label>
        <div className="color-checkboxes">
          {allowedColors.map(color => (
            <label key={color}>
              <input
                type="checkbox"
                checked={petData.colors.includes(color)}
                onChange={() => handleColorChange(color)}
              />
              {color}
            </label>
          ))}
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="contactEmail">Contact Email:</label>
        <input
          type="email"
          id="contactEmail"
          name="contactEmail"
          value={petData.contactEmail}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          name="location"
          value={petData.location}
          onChange={handleChange}
          //required
        />
      </div>

      <div className="input-group">
        <label className="custom-file-upload" htmlFor="images">Upload Images (up to 3):</label>
        <input
          type="file"
          id="images"
          name="images"
          onChange={handleImageUpload}
          multiple
          accept="image/*"
          className="file-input"
        />
      </div>
    </>
  );

  const renderPage2 = () => (
    <>
      <div className="input-group">
        <label htmlFor="bio">Biography:</label>
        <textarea
          id="bio"
          name="bio"
          value={petData.bio}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="bio">Why should you adopt me?</label>
        <textarea
          id="prompt1"
          name="prompt1"
          value={petData.prompt1}
          onChange={handleChange}
          //required
        />
      </div>

      <div className="input-group">
        <label htmlFor="bio">My favorite things to do are:</label>
        <textarea
          id="prompt2"
          name="prompt2"
          value={petData.prompt2}
          onChange={handleChange}
          //required
        />
      </div>
    </>
  );

  return (
    <div className="add-pet-form">
      <h2>Add A New Pet</h2>
      <form onSubmit={handleSubmit}>
        {currentPage === 1 ? renderPage1() : renderPage2()}

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
          {currentPage === 1 ? (
            <button className="mov-button" type="button" onClick={() => setCurrentPage(2)}>Next</button>
          ) : (
            <>
              <button className="mov-button" type="button" onClick={() => setCurrentPage(1)}>Previous</button>
              <button type="submit" className="submit-btn" onClick={handleSubmit} >Add Pet</button>
            </>
          )}
        </div>



      </form>
    </div>
  );
};

export default AddPetForm;


        