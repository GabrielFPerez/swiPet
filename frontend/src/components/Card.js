import React from 'react';
import '../styles/Card.css'; // Assuming you have CSS for styling

export const Card = ({ children, className }) => (
  <div className={`card ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div className="card-content">
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="card-header">
    {children}
  </div>
);

export const CardTitle = ({ children }) => (
  <h2 className="card-title">
    {children}
  </h2>
);
