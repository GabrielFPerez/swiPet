import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Button } from '../components/Button';
import { ReactComponent as X } from '../icons/cross.svg';
import { ReactComponent as Heart } from '../icons/heart.svg';
import '../styles/PetCard.css';

const PetCard = ({ pet, onFavorite, onDiscard, showButtons = true }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = pet.Images.slice(0, 3);

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="pet-card-container">
      {showButtons && (
        <Button onClick={onDiscard} variant="outline" className="pet-card-button discard">
          <X className="icon" />
        </Button>
      )}

      <div className="card-background">
        <Card className="pet-card">
          <div className="left-container">
            <div className="pet-card-image-container">
              <img 
                src={images[currentImageIndex] || '/api/placeholder/400/300'} 
                alt={`${pet.Pet_Name} - Image ${currentImageIndex + 1}`} 
                className="pet-card-image"
              />

              <div className="pet-card-image-indicators">
                {images.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`pet-card-image-indicator ${index === currentImageIndex ? 'active' : ''}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <CardContent className="pet-card-content">
              <div className="pet-card-details">
                <div>
                  <p className="pet-card-detail"><strong>Age:</strong> {pet.Age} years</p>
                </div>

                <div>
                  <p className="pet-card-detail"><strong>Pet Size:</strong> {pet.Size}</p>
                </div>

                <div>
                  <p className="pet-card-detail"><strong>Adoption Fee:</strong> ${pet.AdoptionFee || 'N/A'}</p>
                </div>

                <div>
                  <p className="pet-card-detail"><strong>Gender:</strong> {pet.Gender}</p>
                </div>

              </div>
            </CardContent>
          </div>

          <div className="right-container">
            <CardHeader className="pet-card-header">
              <CardTitle className="pet-card-title">{pet.Pet_Name}</CardTitle>
              <p className="pet-card-location">{pet.Location}</p>
              <p className="pet-card-info">{pet.Breed} {pet.Pet_Type}</p>
            </CardHeader>

            <div className='pet-card-bio-section'>
              <h3 className="pet-card-bio-title">Animal's Story</h3>
              <p className="pet-card-bio">{pet.Bio}</p>
            </div>

          </div>
        </Card>
      </div>
      
      {showButtons && (
        <Button onClick={onFavorite} variant="default" className="pet-card-button favorite">
          <Heart className="icon" />
        </Button>
      )}
    </div>
  );
};

export default PetCard;