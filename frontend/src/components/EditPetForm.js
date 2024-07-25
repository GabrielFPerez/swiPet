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
    images: [],
    adoptionFee: '',
  });
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const allowedColors = ["Brown", "Black", "White", "Gold", "Gray", "Red", "Yellow", "Blue", "Orange", "Purple", "Green"];


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
      setFormData({ ...formData, images: [...formData.images, ...images] });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data being submitted:', formData); // Debugging log
    onSubmit(formData);
  };

  const renderPage1 = () => (
    <>
      <div className="form-group">
          <label htmlFor="petName">Name:</label>
          <input
            type="text"
            id="petName"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Pet Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
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
            value={formData.petAge}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="petGender">Gender:</label>
          <select
            id="petGender"
            name="petGender"
            value={formData.petGender}
            onChange={handleChange}
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="colors">Color(s):</label>
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

        <div className="form-group">
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

        <div className="form-group">
          <label htmlFor="petSize">Size:</label>
          <select
            type="text"
            id="petSize"
            name="petSize"
            value={formData.petSize}
            onChange={handleChange}
            required
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="contactEmail">Contact Email:</label>
          <input
            type="text"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
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
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="adoptionFee">Adoption Fee:</label>
          <input
            type="text"
            id="adoptionFee"
            name="adoptionFee"
            value={formData.adoptionFee}
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
          <button type="submit" className="submit-btn">Update Pet</button>
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
          value={formData.bio}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="prompt1">Why should you adopt me?</label>
        <textarea
          id="prompt1"
          name="prompt1"
          value={formData.prompt1}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="prompt2">My favorite things to do are:</label>
        <textarea
          id="prompt2"
          name="prompt2"
          value={formData.prompt2}
          onChange={handleChange}
          required
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
          {currentPage === 1 ? (
            <button type="button" onClick={() => setCurrentPage(2)}>Next</button>
          ) : (
            <>
              <button type="button" onClick={() => setCurrentPage(1)}>Previous</button>
              <button type="submit">Update Pet</button>
            </>
          )}
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditPetForm;





  