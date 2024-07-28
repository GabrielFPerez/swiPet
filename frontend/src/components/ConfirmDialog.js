import React from 'react';
import { Button } from '../components/Button';
import '../styles/ConfirmDialog.css';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="confirm-dialog-actions">
          <button className='cancel-but' onClick={onClose} variant="outline">No</button>
          <button className='del-but' onClick={onConfirm} variant="default">Yes</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;