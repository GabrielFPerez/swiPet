import React, { useState } from 'react';
import '../styles/SearchForm.css'; // Create and import this CSS file for styling

const SearchForm = ({ onSearch, onClose }) => {
    const [searchCriteria, setSearchCriteria] = useState({
        type: '',
        petAge: '',
        petGender: '',
        colors: '',
        breed: '',
        petSize: '',
        location: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearchCriteria(prevCriteria => ({
            ...prevCriteria,
            [name]: value
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
                <form onSubmit={handleSubmit}>
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
                    <input 
                        type="text"
                        name="petGender"
                        placeholder="Gender"
                        value={searchCriteria.petGender}
                        onChange={handleChange}
                    />
                    <input 
                        type="text"
                        name="colors"
                        placeholder="Colors"
                        value={searchCriteria.colors}
                        onChange={handleChange}
                    />
                    <input 
                        type="text"
                        name="breed"
                        placeholder="Breed"
                        value={searchCriteria.breed}
                        onChange={handleChange}
                    />
                    <input 
                        type="text"
                        name="petSize"
                        placeholder="Size"
                        value={searchCriteria.petSize}
                        onChange={handleChange}
                    />
                    <input 
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={searchCriteria.location}
                        onChange={handleChange}
                    />
                    <button type="submit">Search</button>
                    <button type="button" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
};

export default SearchForm;
