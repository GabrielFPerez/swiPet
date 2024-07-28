import React, { useState, useEffect } from 'react';
import '../styles/AddPetForm.css';

const EditPetForm = ({ pet, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
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

  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const allowedColors = ["Brown", "Black", "White", "Gold", "Gray", "Red", "Yellow", "Blue", "Orange", "Purple", "Green"];
  const [files, setFiles] = useState([]);
  const [imagesChanged, setImagesChanged] = useState(false);


  useEffect(() => {
    if (pet) {
      setFormData({
        petId: pet._id,
        petName: pet.Pet_Name,
        type: pet.Pet_Type,
        petAge: pet.Age,
        petGender: pet.Gender,
        colors: pet.Color,
        breed: pet.Breed,
        petSize: pet.Size,
        bio: pet.Bio,
        prompt1: pet.Prompt1,
        prompt2: pet.Prompt2,
        contactEmail: pet.Contact_Email,
        location: pet.Location,
        images: pet.Images,
        adoptionFee: pet.AdoptionFee
      });
    }
  }, [pet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleColorChange = (color) => {
    setFormData(formData => ({
      ...formData,
      colors: formData.colors.includes(color)
        ? formData.colors.filter(c => c !== color)
        : [...formData.colors, color]
    }));
  };

  const handleImageUpload = (e) => {
    const petImages = Array.from(e.target.files);
    if (petImages.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }
    setFiles(petImages);
    setImagesChanged(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiData = new FormData();
  
    // Append all pet data to formData
    Object.keys(formData).forEach(key => {
      if (key === 'colors') {
        formData[key].forEach(color => apiData.append('colors', color));
      } else if (key !== 'images') {
        apiData.append(key, formData[key]);
      }
    });
  
    // Only append new images if they've been changed
    if (imagesChanged && files.length > 0) {
      files.forEach((file, index) => {
        apiData.append(`petImages`, file);
      });
      apiData.append('imagesChanged', 'true');
    } else {
      apiData.append('imagesChanged', 'false');
    }
  
    onSubmit(apiData);
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
            value={formData.petName}
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
            value={formData.type}
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
            value={formData.breed}
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
            value={formData.adoptionFee}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="petSize">Size:</label>
          <select
            id="petSize"
            name="petSize"
            value={formData.petSize}
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
            value={formData.petAge}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="petGender">Gender:</label>
          <select
            id="petGender"
            name="petGender"
            value={formData.petGender}
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
                checked={formData.colors.includes(color)}
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
          value={formData.contactEmail}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
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
          value={formData.bio}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="bio">Why should you adopt me?</label>
        <textarea
          id="prompt1"
          name="prompt1"
          value={formData.prompt1}
          onChange={handleChange}
          //required
        />
      </div>

      <div className="input-group">
        <label htmlFor="bio">My favorite things to do are:</label>
        <textarea
          id="prompt2"
          name="prompt2"
          value={formData.prompt2}
          onChange={handleChange}
          //required
        />
      </div>
    </>
  );

  return (
    <div className="add-pet-form">
      <h2>Edit Pet Listing</h2>
      <form onSubmit={handleSubmit}>
        {currentPage === 1 ? renderPage1() : renderPage2()}

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
          {currentPage === 1 ? (
            <button className="mov-button" type="button" onClick={() => setCurrentPage(2)}>Next</button>
          ) : (
            <>
              <button className="mov-button" type="button" onClick={() => setCurrentPage(1)}>Previous</button>
              <button type="submit" className="submit-btn" onClick={handleSubmit} >Edit Pet</button>
            </>
          )}
        </div>



      </form>
    </div>
  );
};

export default EditPetForm;





  