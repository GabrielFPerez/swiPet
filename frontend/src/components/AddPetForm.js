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
    adoptionFee: '',
  });

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
    const files = Array.from(e.target.files);
    Promise.all(files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }))
    .then(images => {
      setPetData({ ...petData, images: [...petData.images, ...images] });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data being submitted:', petData); // Debugging log
    onSubmit(petData);
  };

  const renderPage1 = () => (
    <>
      <div className="form-group">
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

      <div className="form-group">
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

      <div className="form-group">
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

      <div className="form-group">
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

      <div className="form-group">
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

      <div className="form-group">
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

      <div className="form-group">
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

      <div className="form-group">
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

      <div className="form-group">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={petData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
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

      <div className="form-group">
          <label htmlFor="images">Upload Images:</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageUpload}
            multiple
            accept="image/*"
          />
        </div>

        <div className="form-actions">
        <button type="submit" className="submit-btn">Add Pet</button>
        
      </div>
    </>
  );

  const renderPage2 = () => (
    <>
      <div className="form-group">
        <label htmlFor="bio">Biography:</label>
        <textarea
          id="bio"
          name="bio"
          value={petData.bio}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="bio">Why should you adopt me?</label>
        <textarea
          id="prompt1"
          name="prompt1"
          value={petData.prompt1}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="bio">My favorite things to do are:</label>
        <textarea
          id="prompt2"
          name="prompt2"
          value={petData.prompt2}
          onChange={handleChange}
          required
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
          {currentPage === 1 ? (
            <button type="button" onClick={() => setCurrentPage(2)}>Next</button>
          ) : (
            <>
              <button type="button" onClick={() => setCurrentPage(1)}>Previous</button>
              <button type="submit" className="submit-btn" onClick={handleSubmit} >Add Pet</button>
            </>
          )}
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddPetForm;
