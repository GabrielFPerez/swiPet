import React, { useState } from 'react';
import { Button } from '../components/Button';
import '../styles/ListingCard.css';
import ConfirmDialog from './ConfirmDialog';
import { ReactComponent as Edit } from '../icons/edit.svg';
import { ReactComponent as Remove } from '../icons/remove.svg';


const ListingCard = ({ pet, onRemoveListing, onEditClick, onViewOriginal }) => {
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [showInquireDialog, setShowInquireDialog] = useState(false);
  const fallbackImage = 'https://swipet-becad9ab7362.herokuapp.com/uploads/nopic.jpg';

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

  const images = pet.Images.slice(0, 3);


  return (
    <>
      <div className="listing-card" onClick={() => onViewOriginal(pet)}>
        <img src={`https://swipet-becad9ab7362.herokuapp.com/${images[0]}`} 
                onError={(e) => e.target.src = fallbackImage} alt={pet.Pet_Name} className="pet-image" />
        
        <div className="listing-card-actions">
          <Button onClick={(e) => {
            e.stopPropagation();
            handleRemove();
          }} variant="outline" className="remove-button">
            <Remove />
          </Button>
          
          
          <Button onClick={(e) => {
            e.stopPropagation();
            handleEdit();
          }} variant="outline" className="edit-button">
            <Edit />
          </Button>
        </div>
        
        
        <div className="pet-info">
          <h3 className="pet-name">{pet.Pet_Name}</h3>
          <p className="pet-details">{pet.Pet_Type} • {pet.Age} yrs • {pet.Gender}</p>
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