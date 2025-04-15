import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    id: '1',
    name: 'Jane Doe',
    phone: '555-0123',
    location: 'New York, NY',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    isPrivate: true
  });

  const updateProfile = (newProfile) => {
    setProfile(prev => ({
      ...prev,
      ...newProfile
    }));
  };

  const value = {
    profile,
    updateProfile
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;