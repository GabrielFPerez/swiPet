import '../styles/Sidebar.css'; // Assuming you have some basic CSS for styling
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';
import { ReactComponent as Prof } from '../icons/profile.svg';
import { ReactComponent as Fav } from '../icons/fav.svg';
import { ReactComponent as List } from '../icons/list.svg';
import { ReactComponent as Cat } from '../icons/swipecat.svg';
import { ReactComponent as Arrow } from '../icons/arrow.svg'; // Assuming you have an arrow icon
import { ReactComponent as Register } from '../icons/emergency-exit.svg';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef, toggleSidebar]);

  return (
    <div ref={sidebarRef} className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div onClick={() => navigate('/')} className='bar-title'>
        <Cat style={{ marginRight: '20px', width: '60px', height: '60px' }} /> SwiPet
      </div>
      <div className='links'>
        <div className='elements'>
            <button onClick={() => navigate('/profile')}>
            <Prof /> Profile <Arrow className="arrow-icon" />
            </button>
            <button onClick={() => navigate('/swipe')}>
            <Cat /> Swipe <Arrow className="arrow-icon" />
            </button>
            <button onClick={() => navigate('/favorites')}>
            <Fav /> Your Favorites <Arrow className="arrow-icon" />
            </button>
            <button onClick={() => navigate('/listings')}>
            <List /> Your Listings <Arrow className="arrow-icon" />
            </button>
        </div>

        <div className="logout">
                <div className="text-wrapper">Logout</div>
                <button onClick={() => navigate('/')}></button>
                <Register style={{ width: '19px', height: '19px' }} />
        </div>

      </div>
      

    </div>
  );
};

export default Sidebar;
