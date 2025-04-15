import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaDirections } from 'react-icons/fa';
import './Location.css';

const LocationMap = ({ location }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // Initialize map
    if (window.google && mapRef.current && !mapInstance.current) {
      const { lat, lng } = location.coordinates;
      
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 14,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ],
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: false
      });

      // Add marker with custom icon
      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map: mapInstance.current,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#4A90E2",
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 2
        }
      });

      // Add circle for approximate area
      new window.google.maps.Circle({
        map: mapInstance.current,
        center: { lat, lng },
        radius: 300,
        fillColor: "#4A90E2",
        fillOpacity: 0.1,
        strokeColor: "#4A90E2",
        strokeOpacity: 0.3,
        strokeWeight: 2
      });
    }
  }, [location]);

  const handleGetDirections = () => {
    const { lat, lng } = location.coordinates;
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      '_blank'
    );
  };

  return (
    <motion.div 
      className="location-map-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="map-header">
        <h3>Location</h3>
        <motion.button
          className="directions-button"
          onClick={handleGetDirections}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDirections /> Get Directions
        </motion.button>
      </div>

      <div className="map-wrapper">
        <div ref={mapRef} className="map-container" />
      </div>

      <div className="location-details">
        <div className="location-address">
          <FaMapMarkerAlt className="icon" />
          <span>{location.address}</span>
        </div>
        <div className="location-info">
          <span className="info-label">Approximate Area</span>
          <span className="info-value">{location.area}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationMap;