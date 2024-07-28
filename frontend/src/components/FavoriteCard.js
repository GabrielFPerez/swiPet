import React, { useState } from 'react';
import { Button } from '../components/Button';
import '../styles/FavoriteCard.css';
import ConfirmDialog from '../components/ConfirmDialog';
import { ReactComponent as Inquire } from '../icons/inquire.svg';
import { ReactComponent as Remove } from '../icons/remove.svg';

const FavoriteCard = ({ pet, onRemoveFavorite, onSendInquiry, onViewOriginal }) => {
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [showInquireDialog, setShowInquireDialog] = useState(false);
  const fallbackImage = 'http://localhost:3001/uploads/nopic.jpg';

  const handleRemove = () => {
    setShowRemoveDialog(true);
  };

  const handleInquire = () => {
    setShowInquireDialog(true);
  };

  const confirmRemove = () => {
    onRemoveFavorite(pet._id);
    setShowRemoveDialog(false);
  };

  const confirmInquire = () => {
    onSendInquiry(pet._id);
    setShowInquireDialog(false);
  };

  const images = pet.Images.slice(0, 3);

  return (
    <>
      <div className="favorite-card" onClick={() => onViewOriginal(pet)}>
        <img src={`http://localhost:3001/${images[0]}`} 
                onError={(e) => e.target.src = fallbackImage} alt={pet.Pet_Name} className="pet-image" />
        
        
        
          <div className="favorite-card-actions">

            <Button onClick={(e) => {
              e.stopPropagation();
              handleRemove();
            }} variant="default" className="remove-button">
              <Remove />
            </Button>
            
            <Button onClick={(e) => {
              e.stopPropagation();
              handleInquire();
            }} variant="default" className="inquire-button">
              <Inquire />
            </Button>
          
          </div>
          
          <div className="pet-info">
            <h3 className="pet-name">{pet.Pet_Name}</h3>
            <p className="pet-details">{pet.Location} • {pet.Age} yrs • {pet.Gender}</p>
          </div>
          
      </div>

      <ConfirmDialog
        isOpen={showRemoveDialog}
        onClose={() => setShowRemoveDialog(false)}
        onConfirm={confirmRemove}
        title="Remove Favorite"
        message="Would you like to remove this pet from your favorites?"
      />

      <ConfirmDialog
        isOpen={showInquireDialog}
        onClose={() => setShowInquireDialog(false)}
        onConfirm={confirmInquire}
        title="Send Inquiry"
        message="Would you like to inquire about this pet?"
      />
    </>
  );
};

export default FavoriteCard;