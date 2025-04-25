import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProfileProvider } from './components/Profile/ProfileContext';
import RegisterForm from './components/Auth/RegisterForm';
import Dashboard from './components/Admin/Dashboard';
import ProfileEdit from './components/Profile/ProfileEdit';
import SecureContact from './components/Contact/SecureContact';
import LocationMap from './components/Location/LocationMap';
import MediaGallery from './components/MediaGallery/MediaGallery';
import GetStartedComponent from './components/GetStarted/GetStarted';
import './App.css';

// Sample data
const sampleContact = {
  phone: '+1234567890',
  email: 'contact@example.com'
};

const sampleLocation = {
  address: '123 Main St, New York, NY',
  area: 'Manhattan',
  coordinates: {
    lat: 40.7128,
    lng: -74.0060
  }
};

function App() {
  return (
    <Router>
      <ProfileProvider>
        <div className="app-container">
          <GetStartedComponent />
          <Routes>
            <Route path="/" element={<Navigate to="/profile/1" replace />} />
            <Route path="/profile/:id" element={
              <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-8">
                    <ProfileEdit />
                    <SecureContact 
                      contact={sampleContact}
                      location={sampleLocation}
                    />
                  </div>
                  <div className="space-y-8">
                    <LocationMap location={sampleLocation} />
                    <div className="media-section">
                      <h2 className="text-2xl font-semibold mb-4">Media Gallery</h2>
                      <MediaGallery media={[]} />
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/register" element={
              <div className="max-w-7xl mx-auto px-4 py-8">
                <RegisterForm onRegister={console.log} />
              </div>
            } />
            <Route path="/admin" element={
              <div className="max-w-7xl mx-auto px-4 py-8">
                <Dashboard />
              </div>
            } />
          </Routes>
        </div>
      </ProfileProvider>
    </Router>
  );
}

export default App;