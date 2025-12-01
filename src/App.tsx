import React, { useState, useEffect } from 'react';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import { localStorageService } from './utils/localStorage';
import type { User } from './types/auth';
import './App.css';

export default function App() {
  const [currentForm, setCurrentForm] = useState<'register' | 'login'>('register');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorageService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
    }
  }, []);

  const handleRegisterSuccess = () => {
    console.log('Registration successful!');
    alert('Registration successful! Please login.');
    setCurrentForm('login');
  };

  const handleLoginSuccess = () => {
    const user = localStorageService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorageService.logout();
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentForm('login');
  };

  if (isLoggedIn && currentUser) {
    return (
      <div className="app-container">
        <Profile user={currentUser} onLogout={handleLogout} />
      </div>
    );
  }

  return (
    <div className="app-container">
      {currentForm === 'register' ? (
        <RegisterForm 
          onSwitchToLogin={() => setCurrentForm('login')}
          onRegisterSuccess={handleRegisterSuccess} 
        />
      ) : (
        <LoginForm 
          onSwitchToRegister={() => setCurrentForm('register')}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}