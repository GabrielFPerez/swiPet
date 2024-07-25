import React, { useState } from 'react';
import { Button } from '../components/Button';
import '../styles/ListingCard.css';
import ConfirmDialog from './ConfirmDialog';

const ListingCard = ({ pet, onRemoveListing, onEditClick, onViewOriginal }) => {
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [showInquireDialog, setShowInquireDialog] = useState(false);

  const handleRemove = () => {
    setShowRemoveDialog(true);
  };

  const handleEdit = () => {
    onEditClick(pet);
  }

  const confirmRemove = () => {
    onRemoveListing(pet._id);
    setShowRemoveDialog(false);
  };


  return (
    <>
      <div className="listing-card" onClick={() => onViewOriginal(pet)}>
        <img src={pet.Images[0]} alt={pet.Pet_Name} className="pet-image" />
        <div className="pet-info">
          <h3 className="pet-name">{pet.Pet_Name}</h3>
          <p className="pet-details">{pet.Location} | {pet.Age} | {pet.Gender}</p>
        </div>
        <div className="listing-card-actions">
          <Button onClick={(e) => {
            e.stopPropagation();
            handleRemove();
          }} variant="outline" className="remove-button">
            Remove
          </Button>
          
          
          <Button onClick={(e) => {
            e.stopPropagation();
            handleEdit();
          }} variant="outline" className="edit-button">
            Edit
          </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showRemoveDialog}
        onClose={() => setShowRemoveDialog(false)}
        onConfirm={confirmRemove}
        title="Remove Listing"
        message="Would you like to remove this pet from your listings?"
      />
    </>
  );
};

export default ListingCard;