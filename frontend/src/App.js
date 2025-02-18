import React from 'react';
import './styles/App.css';
import './styles/styleguide.css'

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { BrowserRouter, Route, Switch, Routes} from 'react-router-dom';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import SwipingPage from './pages/SwipingPage';
import FavoritesPage from './pages/YourFavoritesPage';
import ListingsPage from './pages/YourListingsPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() 
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/swipe" element={<SwipingPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/listings" element={<ListingsPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
