import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PetCard from './PetCard';
import '../styles/CardContainer.css';
import { ReactComponent as Undo } from '../icons/undo.svg';
import { jwtDecode } from "jwt-decode";
import { retrieveToken, storeToken } from '../tokenStorage.js';

const CardContainer = () => {
    const [pets, setPets] = useState([]);
    const [history, setHistory] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState('');
    const navigate = useNavigate();
    let search;

    var bp = require('./Path.js');
    
    useEffect(() => {
        const token = retrieveToken();
        console.log("Token in CardContainer useEffect:", token);
        
        if (!token) {
            console.error('No token found in storage');
            navigate('/login');
            return;
        }

        fetchPets();
    }, [navigate]);

    const fetchPets = async () => {
        let token = retrieveToken();
        console.log("Token in fetchPets:", token);
        
        if (!token) {
            console.error('No token found in storage');
            navigate('/login');
            return;
        }

        let _ud = localStorage.getItem('user_data');
        let ud = JSON.parse(_ud);

        let username = ud.username;

        let obj = {
            userLogin: username, 
            type: null, 
            petAge: null, 
            petGender: null, 
            colors: null, 
            breed: null, 
            petSize: null, 
            location: null, 
            jwtToken: token
        }
        
        let js = JSON.stringify(obj);
    
        try {
            console.log('Sending request to:', bp.buildPath('api/searchpet'));
            console.log('Request payload:', js);
    
            const response = await fetch(bp.buildPath('api/searchpet'), {
                method: 'POST',
                body: js,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
    
            const data = await response.json();
    
            if (data.jwtToken) {
                console.log("Received new token:", data.jwtToken);
                storeToken(data.jwtToken);
            }

            if (data.error === "Token has expired") {
                console.log('JWT has expired. Redirecting to login...');
                localStorage.removeItem('token_data');
                navigate('/login');
                return;
            }
    
            if (Array.isArray(data.pets)) {
                setPets(data.pets);
                console.log('Received pets data:', data.pets);
            } else {
                console.log('No pets data received:', data);
                setPets([]);
            }
    
            if (data.message) {
                console.log('Server message:', data.message);
            }
        } catch (error) {
            console.error('Error fetching pets:', error.message);
            setPets([]);
        }
    };

    const handleFavorite = async (petId) => {
        try {
            const userLogin = localStorage.getItem('user_login');
            const jwtToken = localStorage.getItem('jwtToken');

            if (!userLogin || !jwtToken) {
                console.error('User login or JWT token not found');
                return;
            }

            const response = await fetch(bp.buildPath('/api/addfavorite'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({ userLogin, petId })
            });

            const data = await response.json();

            if (data.message === 'The JWT is no longer valid') {
                console.log('JWT is no longer valid. Redirecting to login...');
                localStorage.removeItem('jwtToken');
                window.location.href = '/login';
                return;
            }

            if (data.jwtToken) {
                localStorage.setItem('jwtToken', data.jwtToken);
            }

            setHistory((prevHistory) => [...prevHistory, { action: 'favorite', pet: pets[0] }]);
            setPets((prevPets) => prevPets.slice(1));
            console.log('Pet favorited successfully');
        } catch (error) {
            console.error('Error favoriting pet:', error);
        }
    };

    const handleDiscard = (petId) => {
        setHistory((prevHistory) => [...prevHistory, { action: 'discard', pet: pets[0] }]);
        setPets((prevPets) => prevPets.slice(1));
    };

    const handleUndo = async () => {
        if (history.length > 0) {
            const lastAction = history[history.length - 1];
            
            if (lastAction.action === 'favorite') {
                try {
                    const userLogin = localStorage.getItem('user_login');
                    const jwtToken = localStorage.getItem('jwtToken');

                    if (!userLogin || !jwtToken) {
                        console.error('User login or JWT token not found');
                        return;
                    }

                    const response = await fetch(bp.buildPath('/api/unfavorite'), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwtToken}`
                        },
                        body: JSON.stringify({ userLogin, petId: lastAction.pet._id })
                    });

                    const data = await response.json();

                    if (data.message === 'The JWT is no longer valid') {
                        console.log('JWT is no longer valid. Redirecting to login...');
                        localStorage.removeItem('jwtToken');
                        window.location.href = '/login';
                        return;
                    }

                    if (data.jwtToken) {
                        localStorage.setItem('jwtToken', data.jwtToken);
                    }

                    setHistory((prevHistory) => prevHistory.slice(0, -1));
                    setPets((prevPets) => [lastAction.pet, ...prevPets]);

                    console.log(data.message);
                } catch (error) {
                    console.error('Error unfavoriting pet:', error);
                }
            } else {
                setHistory((prevHistory) => prevHistory.slice(0, -1));
                setPets((prevPets) => [lastAction.pet, ...prevPets]);
            }
        }
    };

    const handleSearch = (event) => {
        setSearchCriteria(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetchPets();
    };

    return (
        <div className="card-container-wrapper">
            <form className="search-form" onSubmit={handleSearchSubmit}>
                <input 
                    type="text"
                    placeholder="Search for pets..."
                    value={search}
                    onChange={handleSearch}
                />
                <button type="submit">Search</button>
            </form>
            <div className="card-container">
                {pets.length > 0 ? (
                    <PetCard
                        pet={pets[0]}
                        onFavorite={() => handleFavorite(pets[0]._id)}
                        onDiscard={() => handleDiscard(pets[0]._id)}
                    />
                ) : (
                    <p>No more pets</p>
                )}
            </div>
            <div className="undo-button-container">
                <button onClick={handleUndo} disabled={history.length === 0}>
                    <Undo style={{ width: '50px', height: '50px' }} />
                </button>
            </div>
        </div>
    );
};

export default CardContainer;