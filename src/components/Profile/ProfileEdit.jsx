import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaPhone, FaMapMarkerAlt, FaLock } from 'react-icons/fa';
import { MdEdit, MdSave } from 'react-icons/md';
import './Profile.css';

const ProfileEdit = ({ profile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [showPhone, setShowPhone] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setIsEditing(false);
  };

  const formatPhone = (phone) => {
    return showPhone ? phone : `${phone.slice(0, 3)}•••${phone.slice(-2)}`;
  };

  return (
    <motion.div
      className="profile-edit-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-header">
          <motion.div
            className="profile-image-container"
            whileHover={{ scale: isEditing ? 1.05 : 1 }}
          >
            <img
              src={formData.imageUrl || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="profile-image"
            />
            {isEditing && (
              <div className="image-overlay">
                <span>Change Photo</span>
              </div>
            )}
          </motion.div>
          
          <button
            type="button"
            className="edit-toggle-btn"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <MdSave /> : <MdEdit />}
            <span>{isEditing ? 'Save' : 'Edit'}</span>
          </button>
        </div>

        <div className="form-fields">
          <div className="form-group">
            <FaUser className="field-icon" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <FaPhone className="field-icon" />
            <div className="phone-container">
              <input
                type="text"
                name="phone"
                value={formatPhone(formData.phone)}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Phone"
                className="form-input"
              />
              <button
                type="button"
                className="toggle-phone-btn"
                onClick={() => setShowPhone(!showPhone)}
              >
                <FaLock />
              </button>
            </div>
          </div>

          <div className="form-group">
            <FaMapMarkerAlt className="field-icon" />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Location"
              className="form-input"
            />
          </div>

          {isEditing && (
            <motion.button
              type="submit"
              className="save-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Changes
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default ProfileEdit;