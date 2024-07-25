import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PetCard from './PetCard';
import SearchForm from './SearchForm';
import '../styles/CardContainer.css';
import { ReactComponent as Undo } from '../icons/undo.svg';
import { retrieveToken, storeToken } from '../tokenStorage.js';
import { ReactComponent as Search } from '../icons/search.svg';
 

const CardContainer = () => {
    const [pets, setPets] = useState([]);
    const [history, setHistory] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({
        type: '',
        petAge: '',
        petGender: '',
        colors: '',
        breed: '',
        petSize: '',
        location: ''
    });
    const [showSearchPopup, setShowSearchPopup] = useState(false);
    const navigate = useNavigate();
    var bp = require('./Path.js');
    
    useEffect(() => {
        const token = retrieveToken();
        console.log("Token in CardContainer useEffect:", token);
        
        if (!token) {
            console.error('No token found in storage');
            navigate('/login');
            return;
        }

        fetchPets(searchCriteria);
    }, [navigate]);

    const fetchPets = async (criteria) => {
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
            ...criteria,  
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

    const handleSearch = (criteria) => {
        setSearchCriteria(criteria);
        fetchPets(criteria);  // Use the new criteria immediately
        setShowSearchPopup(false);
    };

    const handleFavorite = async (petId) => {
        try {
            let token = retrieveToken();

            console.log("Token in handleFavorite:", token);

            if (!token) {
                console.error('No token found in storage');
                navigate('/login');
                return;
            }

            let _ud = localStorage.getItem('user_data');
            let ud = JSON.parse(_ud);

            let username = ud.username;

            console.log("current user is: ", username);


            if (!username || !token) {
                console.error('User login or JWT token not found');
                return;
            }

            const response = await fetch(bp.buildPath('api/addfavorite'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userLogin: username, petId, jwtToken: token })
            });

            const data = await response.json();

            if (data.message === 'The JWT is no longer valid') {
                console.log('JWT is no longer valid. Redirecting to login...');
                localStorage.removeItem('token');
                //window.location.href = '/login';
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

                    let token = retrieveToken();
                    console.log("Token in undoFavorite:", token);

                    let _ud = localStorage.getItem('user_data');
                    let ud = JSON.parse(_ud);

                    let username = ud.username;

                    console.log("current user is: ", username);

                    if (!username || !token) {
                        console.error('User login or JWT token not found');
                        return;
                    }

                    const response = await fetch(bp.buildPath('api/unfavorite'), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ userLogin: username, petId: lastAction.pet._id, jwtToken: token})
                    });

                    const data = await response.json();

                    if (data.message === 'The JWT is no longer valid') {
                        console.log('JWT is no longer valid. Redirecting to login...');
                        localStorage.removeItem('jwtToken');
                        window.location.href = '/login';
                        return;
                    }

                    if (data.token) {
                        localStorage.setItem('jwtToken', data.token);
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



    return (
        <div className="card-container-wrapper">
            
            <button className='search-button' onClick={() => setShowSearchPopup(true)}><Search /></button>
            {showSearchPopup && (
                <SearchForm 
                    onSearch={handleSearch}
                    onClose={() => setShowSearchPopup(false)}
                />
            )}

            <div className="search-criteria-display">
                <div className="entry-container">
                    {Object.entries(searchCriteria).map(([key, value]) => (
                    value && (
                        Array.isArray(value) ? (
                        value.map((item, index) => (
                            <div className="search-entries" key={`${key}-${index}`}>{item}</div>
                        ))
                        ) : (
                        <div className="search-entries" key={key}>{value}</div>
                        )
                    )
                    ))}
                </div>

                <div className='line'></div>
            </div>


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
                <button onClick={handleUndo} disabled={history.length === 0}
                style={{
                    width: '90px', /* Set width */
                    height: '70px' /* Set height */
                }}>
                    <Undo style={{ width: '50px', height: '50px' }} />
                </button>
            </div>
        </div>
    );
};

export default CardContainer;