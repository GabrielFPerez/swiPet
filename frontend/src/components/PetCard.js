import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Button } from '../components/Button';

const PetCard = ({ pet, onFavorite, onDiscard, showButtons = true }) => {
  return (
    <Card className="w-full max-w-sm m-2">
      <CardHeader>
        <CardTitle>{pet["Pet Name"]}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={pet["Pet Images"][0] || '/api/placeholder/300/200'} alt={pet["Pet Name"]} className="w-full h-48 object-cover mb-4" />
        <p><strong>Type:</strong> {pet["Animal Type"]}</p>
        <p><strong>Age:</strong> {pet["Pet Age"]}</p>
        <p><strong>Gender:</strong> {pet.Gender}</p>
        <p><strong>Breed:</strong> {pet.Breed}</p>
        <p><strong>Size:</strong> {pet["Pet Size"]}</p>
        <p><strong>Location:</strong> {pet.Location}</p>
        <p className="mt-2">{pet.Bio}</p>
        {showButtons && (
          <div className="mt-4">
            <Button onClick={() => onFavorite(pet._id)} className="mr-2">Favorite</Button>
            <Button onClick={() => onDiscard(pet._id)} variant="outline">Discard</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PetCard;
