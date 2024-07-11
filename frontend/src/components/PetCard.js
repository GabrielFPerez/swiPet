import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Button } from '../components/Button';
import { ReactComponent as X } from '../icons/cross.svg';
import { ReactComponent as Heart } from '../icons/heart.svg';


const PetCard = ({ pet, onFavorite, onDiscard, showButtons = true }) => {
  return (
    <Card className="w-full max-w-md m-2 overflow-hidden">
      <div className="relative">
        <img src={pet["Pet Images"][0] || '/api/placeholder/400/300'} alt={pet["Pet Name"]} className="w-full h-64 object-cover" />
        <CardHeader className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white">
          <CardTitle className="text-2xl">{pet["Pet Name"]}</CardTitle>
          <p>{pet.Location} miles away</p>
        </CardHeader>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2">Animal's Story</h3>
        <p className="mb-4">{pet.Bio}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-semibold">Age</p>
            <p>{pet["Pet Age"]} years</p>
          </div>
          <div>
            <p className="font-semibold">Breed</p>
            <p>{pet.Breed}</p>
          </div>
          <div>
            <p className="font-semibold">Current Owner</p>
            <p>{pet.Login}</p>
          </div>
          <div>
            <p className="font-semibold">Adoption Fee</p>
            <p>${pet.AdoptionFee || 'N/A'}</p>
          </div>
        </div>
        {showButtons && (
          <div className="flex justify-between">
            <Button onClick={onDiscard} variant="outline" className="flex-1 mr-2">
              <X className="mr-2 h-4 w-4" /> Discard
            </Button>
            <Button onClick={onFavorite} variant="default" className="flex-1 ml-2">
              <Heart className="mr-2 h-4 w-4" /> Favorite
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PetCard;
