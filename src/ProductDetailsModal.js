

//pre pre testing palang toh pang guide lang ntin

import React from "react";
import "./ProductDetailsModal.css";

const ProductDetailsModal = ({ isOpen, closeModal, selectedItem }) => {
  if (!isOpen || !selectedItem) return null; // Don't render if modal is closed or no item is selected

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Close Button */}
        <button onClick={closeModal} className="close-button">✕</button>

        {/* Modal Content */}
        <h2 className="modal-title">{selectedItem.item_name}</h2>
        <p className="modal-subtitle">{selectedItem.item_preptime_min} - {selectedItem.item_preptime_max} minutes</p>
        <img src={`images/${selectedItem.item_id}.png`} alt={selectedItem.item_name} className="modal-image" />

<<<<<<< Updated upstream
        <p className="modal-description">{selectedItem.item_description}</p>
        <hr className="modal-divider" />
=======
        <div className="module-image-container">
          <img 
            src={`/images/${selectedItem.item_id}.png`} 
            alt={selectedItem.item_name} 
            className="module-image"
            onError={(e) => { console.error('Image not found:', e.target.src); }}
          />
        </div>

          <div className="module-info">
            <p className="module-subtitle">
              {selectedItem.item_preptime_min} - {selectedItem.item_preptime_max} minutes
            </p>
            <p className="module-description">{selectedItem.item_description}</p>
          </div>
        </div>

        <hr className="module-divider" />

        <div className="module-options">
>>>>>>> Stashed changes

        {/* Options Section */}
        <div className="modal-options">
          <div className="option">
            <label>Select serving size:</label>
            <div className="buttons">
              <button className="option-button">16 oz</button>
              <button className="option-button">22 oz</button>
              <button className="option-button">32 oz</button>
            </div>
          </div>

          {/* Quantity Option */}
          <div className="option">
            <label>Order Quantity:</label>
            <div className="quantity-controls">
              <button className="quantity-button">-</button>
              <span className="quantity-display">1</span>
              <button className="quantity-button">+</button>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button className="confirm-button">Confirm</button>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
