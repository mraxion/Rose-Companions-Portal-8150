import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsChevronLeft, BsChevronRight, BsX } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import './MediaGallery.css';

const MediaGallery = ({ media = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % media.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setSelectedIndex(null);
  };

  return (
    <div className="media-gallery">
      <div className="thumbnails-grid">
        {media.map((item, index) => (
          <motion.div
            key={item.id}
            className="thumbnail-wrapper"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleThumbnailClick(index)}
          >
            {item.type === 'video' ? (
              <div className="video-thumbnail">
                <img src={item.thumbnail} alt={item.title} />
                <div className="play-overlay">
                  <FaPlay />
                </div>
              </div>
            ) : (
              <img src={item.url} alt={item.title} />
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isFullscreen && selectedIndex !== null && (
          <motion.div
            className="fullscreen-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFullscreen}
          >
            <motion.div
              className="fullscreen-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-button" onClick={closeFullscreen}>
                <BsX />
              </button>
              
              {media[selectedIndex].type === 'video' ? (
                <video
                  controls
                  src={media[selectedIndex].url}
                  poster={media[selectedIndex].thumbnail}
                />
              ) : (
                <img src={media[selectedIndex].url} alt={media[selectedIndex].title} />
              )}

              <button className="nav-button prev" onClick={handlePrev}>
                <BsChevronLeft />
              </button>
              <button className="nav-button next" onClick={handleNext}>
                <BsChevronRight />
              </button>

              <div className="media-caption">
                <h3>{media[selectedIndex].title}</h3>
                <p>{media[selectedIndex].description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaGallery;