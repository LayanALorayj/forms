import React from 'react';
import type { User } from '../types/auth';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  return (
    <div className="form">
      <h2>Profile</h2>
      
      <div className="profile-info">
        <div className="profile-field">
          <label>First Name:</label>
          <div className="profile-value">{user.firstName}</div>
        </div>
        
        <div className="profile-field">
          <label>Last Name:</label>
          <div className="profile-value">{user.lastName}</div>
        </div>
        
        <div className="profile-field">
          <label>Email:</label>
          <div className="profile-value">{user.email}</div>
        </div>
        
        <div className="profile-field">
          <label>Mobile Number:</label>
          <div className="profile-value">{user.mobileNumber}</div>
        </div>
      </div>

      <button onClick={onLogout} className="submit-button logout-button">
        Logout
      </button>
    </div>
  );
};

export default Profile;