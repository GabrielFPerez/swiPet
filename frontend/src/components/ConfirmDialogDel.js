import React, { useState } from 'react';
import { Button } from '../components/Button';
import '../styles/ConfirmDialog.css';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(password);
    setPassword(''); // Reset password after confirming
  };

  const handleClose = () => {
    onClose();
    setPassword(''); // Reset password when closing
  };

  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <h2>{title}</h2>
        <p>{message}</p>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="confirm-dialog-actions">
          <button className='cancel-but' onClick={handleClose} variant="outline">No</button>
          <button className='del-but' onClick={handleConfirm} variant="default">Yes</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;