import React from 'react';
import '../styles/Button.css'; // Assuming you have CSS for styling

export const Button = ({ children, onClick, className, variant }) => (
  <button
    onClick={onClick}
    className={`button ${variant ? `button-${variant}` : ''} ${className}`}
  >
    {children}
  </button>
);
