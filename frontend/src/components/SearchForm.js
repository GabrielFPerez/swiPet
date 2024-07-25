import React, { useState } from 'react';
import '../styles/SearchForm.css';

const SearchForm = ({ onSearch, onClose }) => {
    const [searchCriteria, setSearchCriteria] = useState({
        type: '',
        petAge: '',
        petGender: '',
        colors: [],
        breed: '',
        petSize: '',
        location: ''
    });

    const allowedColors = ["Brown", "Black", "White", "Gold", "Gray", "Red", "Yellow", "Blue", "Orange", "Purple", "Green"];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearchCriteria(prevCriteria => ({
            ...prevCriteria,
            [name]: value
        }));
    };

    const handleColorChange = (color) => {
        setSearchCriteria(prevCriteria => ({
            ...prevCriteria,
            colors: prevCriteria.colors.includes(color)
                ? prevCriteria.colors.filter(c => c !== color)
                : [...prevCriteria.colors, color]
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchCriteria);
        onClose();
    };

    return (
        <div className="search-form-overlay">
            <div className="search-form-container">
            <h1 className='title' >Select your Preferences!</h1>
            <div className='search-fields'>
                <form onSubmit={handleSubmit}>
                <div className='toprow'>
                    <input 
                        type="text"
                        name="type"
                        placeholder="Type"
                        value={searchCriteria.type}
                        onChange={handleChange}
                    />
                    <input 
                        type="text"
                        name="petAge"
                        placeholder="Age"
                        value={searchCriteria.petAge}
                        onChange={handleChange}
                    />
                    <select 
                        type="text"
                        id="gender"
                        name="petGender"
                        value={searchCriteria.petGender}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select a Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    </div>
                    
                    <div className='bottomrow'>
                        <input 
                            type="text"
                            name="breed"
                            placeholder="Breed"
                            value={searchCriteria.breed}
                            onChange={handleChange}
                        />
                        <select
                            type="text"
                            id="petSize"
                            name="petSize"
                            value={searchCriteria.petSize}
                            onChange={handleChange}
                            
                        >
                            <option value="" disabled>Choose a size</option>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                        </select>
                        <input 
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={searchCriteria.location}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="color-select">
                        <label>Colors:</label>
                        {allowedColors.map(color => (
                            <div key={color} className="color-option">
                                <input
                                    type="checkbox"
                                    id={color}
                                    name="colors"
                                    value={color}
                                    checked={searchCriteria.colors.includes(color)}
                                    onChange={() => handleColorChange(color)}
                                />
                                <label htmlFor={color}>{color}</label>
                            </div>
                        ))}
                    </div>

                    <button type="submit">Search</button>
                    <button type="button" onClick={onClose}>Close</button>
                </form>
                </div>
            </div>
        </div>
    );
};

export default SearchForm;