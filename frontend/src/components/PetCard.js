import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Button } from '../components/Button';
import { ReactComponent as X } from '../icons/cross.svg';
import { ReactComponent as Heart } from '../icons/heart.svg';
import '../styles/PetCard.css';
import { ReactComponent as Piggy } from '../icons/piggy-bank.svg';
import { ReactComponent as Gender } from '../icons/gender.svg';
import { ReactComponent as Cake } from '../icons/cake.svg';
import { ReactComponent as Ruler } from '../icons/ruler.svg';
import { ReactComponent as Book } from '../icons/book.svg';

const PetCard = ({ pet, onFavorite, onDiscard, showButtons = true, isSample = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBioOverflowing, setIsBioOverflowing] = useState(false);
  const bioRef = useRef(null);
  const images = pet.Images.slice(0, 3);
  const defaultFallbackImage = 'https://swipet-becad9ab7362.herokuapp.com/uploads/nopic.jpg';
  const sampleFallbackImage = 'https://swipet-becad9ab7362.herokuapp.com/uploads/petImages-1722035141260-5d077a4f.jpeg';
  
  const fallbackImage = isSample ? sampleFallbackImage : defaultFallbackImage;

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    const checkBioOverflow = () => {
      if (bioRef.current) {
        setIsBioOverflowing(bioRef.current.scrollHeight > bioRef.current.clientHeight);
      }
    };

    checkBioOverflow();
    window.addEventListener('resize', checkBioOverflow);

    return () => {
      window.removeEventListener('resize', checkBioOverflow);
    };
  }, [pet.Bio, pet.Prompt1, pet.Prompt2]);

  return (
    <div className="pet-card-container">
      {showButtons && (
        <Button onClick={onDiscard} variant="outline" className="pet-card-button discard" aria-label="Discard this pet">
          <X className="icon" />
        </Button>
      )}

      <div className="card-background">
        <Card className="pet-card">
          <div className="left-container">
            <div className="pet-card-image-container">
              <img 
                src={`https://swipet-becad9ab7362.herokuapp.com/${images[currentImageIndex]}`} 
                onError={(e) => e.target.src = fallbackImage}
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
                <div className="pet-card-detail">
                  <Cake /> Age: {pet.Age} years
                </div>

                <div className="pet-card-detail" >
                  <Ruler /> Size: {pet.Size}
                </div>

                <div className="pet-card-detail">
                  <Gender />  Gender: {pet.Gender}
                </div>

                <div className="pet-card-detail">
                  <Piggy /> Adoption Fee: ${pet.AdoptionFee || 'N/A'}
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
              <div className="pet-card-bio-title"><Book />  Animal's Story</div>
              <p 
                ref={bioRef}
                className={`pet-card-bio ${isBioOverflowing ? 'scrollable' : ''}`}
              >
                {pet.Bio} <br/><br/>
                <span className='prompt-bio'>Why you should adopt me:</span><br/> {pet.Prompt1} <br/><br/>
                <span className='prompt-bio'>My favorite things to do are:</span><br/> {pet.Prompt2}

              </p>
            </div>

          </div>
        </Card>
      </div>
      
      {showButtons && (
        <Button onClick={onFavorite} variant="default" className="pet-card-button favorite" aria-label="Favorite this pet">
          <Heart className="icon" />
        </Button>
      )}
    </div>
  );
};

export default PetCard;