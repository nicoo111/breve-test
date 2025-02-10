

//pre pre testing palang toh pang guide lang ntin

import React, { useState } from "react";
import "./ProductDetailsModal.css";

const ProductDetailsModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* Add to Cart Button */}
      <button onClick={openModal} className="add-to-cart-button">
        + {/* Button text */}
      </button>

      {/* Modal */}
      {isModalOpen && ( // Conditionally render the modal if isModalOpen is true
        <div className="modal-overlay">
          <div className="modal-container">
            {/* Close Button */}
            <button onClick={closeModal} className="close-button">
              ✕ {/* Close icon */}
            </button>

            {/* Modal Title */}
            <h2 className="modal-title">Oreo Frappé</h2> {/* Product name */}
            <p className="modal-subtitle">3 - 5 minutes</p> {/* Preparation time */}

            {/* Product Image */}
            <img
              src="/5.png"
              alt="Oreo Frappe"
              className="modal-image"
            />

            {/* Product Description */}
            <p className="modal-description">
              Double shot of espresso, steamed whole milk, a thin layer of milk
              foam.
            </p>

            {/* Divider */}
            <hr className="modal-divider" />

            {/* Options Section */}
            <div className="modal-options">
              {/* Serving Size Option */}
              <div className="option">
                <label>Select serving size:</label> {/* Label for size options */}
                <div className="buttons">
                  {/* Buttons for different sizes */}
                  <button className="option-button">16 oz</button>
                  <button className="option-button">22 oz</button>
                  <button className="option-button">32 oz</button>
                </div>
              </div>

              {/* Quantity Option */}
              <div className="option">
                <label>Order Quantity:</label> {/* Label for quantity control */}
                <div className="quantity-controls">
                  {/* Buttons to decrease or increase quantity */}
                  <button className="quantity-button">-</button>
                  <span className="quantity-display">1</span> {/* Quantity display */}
                  <button className="quantity-button">+</button>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <button className="confirm-button">Confirm</button> {/* Submit action */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsModal; // Export the component
