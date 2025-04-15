import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaLock, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import './Contact.css';

const SecureContact = ({ contact, location }) => {
  const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const handleRevealContact = () => {
    if (!isPhoneRevealed) {
      setShowVerification(true);
    }
  };

  const verifyAndReveal = () => {
    setIsPhoneRevealed(true);
    setShowVerification(false);
  };

  const formatPhone = (phone) => {
    if (isPhoneRevealed) return phone;
    return `${phone.slice(0, 3)}•••${phone.slice(-2)}`;
  };

  return (
    <div className="secure-contact-container">
      <motion.div 
        className="contact-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="contact-header">
          <h3>Contact Information</h3>
          <div className="security-badge">
            <FaLock /> Secure
          </div>
        </div>

        <div className="contact-content">
          <motion.button
            className="phone-reveal-button"
            onClick={handleRevealContact}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaPhone className="icon" />
            <span>{formatPhone(contact.phone)}</span>
            {!isPhoneRevealed && <FaLock className="lock-icon" />}
          </motion.button>

          {isPhoneRevealed && (
            <motion.div
              className="contact-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <a 
                href={`tel:${contact.phone}`}
                className="action-button call"
              >
                <FaPhone /> Call Now
              </a>
              <a 
                href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`}
                className="action-button whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </motion.div>
          )}

          <div className="location-info">
            <FaMapMarkerAlt className="icon" />
            <span>{location.address}</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showVerification && (
          <motion.div
            className="verification-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="verification-modal"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h4>Verify to View Contact</h4>
              <p>Click below to reveal the complete contact information</p>
              <motion.button
                className="verify-button"
                onClick={verifyAndReveal}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Show Contact
              </motion.button>
              <button
                className="close-button"
                onClick={() => setShowVerification(false)}
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecureContact;