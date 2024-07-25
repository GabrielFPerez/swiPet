import React, { useState } from 'react';

const DropdownChecklist = ({ allowedColors, searchCriteria, handleColorChange }) => {
  
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="form-group">
      <label htmlFor="colors">Color(s):</label>
      <div className="dropdown">
        <button type="button" className="dropdown-toggle" onClick={toggleDropdown}>
          Select Colors
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {allowedColors.map(color => (
              <label key={color} className="dropdown-item">
                <input
                  type="checkbox"
                  checked={searchCriteria.colors.includes(color)}
                  onChange={() => handleColorChange(color)}
                />
                {color}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownChecklist;
