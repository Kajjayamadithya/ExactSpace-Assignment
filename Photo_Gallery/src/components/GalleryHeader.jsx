import React from 'react';

/**
 * GalleryHeader Component
 * Renders the centered title and subtitle for the Photo Gallery
 */
const GalleryHeader = ({ totalLoaded = 0 }) => {
  return (
    <header className="gallery-header">
      <div className="header-container">
        <h1 className="gallery-title">Photo Gallery</h1>
        <p className="gallery-subtitle">
          Endless visual inspiration powered by Picsum Photos
        </p>
        {totalLoaded > 0 && (
          <div className="stats-pill">
            <span>{totalLoaded} photos loaded</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default GalleryHeader;
