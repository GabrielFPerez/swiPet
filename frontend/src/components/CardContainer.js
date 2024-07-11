import React, { useState, useEffect } from 'react';
import PetCard from './PetCard';
import '../styles/CardContainer.css'

const CardContainer = () => {
    const app_name = 'swipet-becad9ab7362';

    function buildPath(route) {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + app_name + '.herokuapp.com' + route;
        } else {
            return 'http://localhost:3001' + route;
        }
    }


    const [pets, setPets] = useState([]);

    useEffect(() => {
        // Fetch the pets data from your API and set it to the state
        const fetchPets = async () => {
        try {
            const response = await fetch(buildPath('/api/getAllPets'));
            const data = await response.json();
            setPets(data.pets);
        } catch (error) {
            console.error('Error fetching pets:', error);
        }
        };

        fetchPets();
    }, []);

    const handleFavorite = (petId) => {
        // Implement the logic to handle the favorite action
        console.log('Favorite pet with id:', petId);
    };

    const handleDiscard = (petId) => {
        // Implement the logic to handle the discard action
        console.log('Discard pet with id:', petId);
    };

    return (
        <div className="card-container">
        {pets.map((pet) => (
            <PetCard
            key={pet._id}
            pet={pet}
            onFavorite={handleFavorite}
            onDiscard={handleDiscard}
            />
        ))}
        </div>
    );
    };

    export default CardContainer;
