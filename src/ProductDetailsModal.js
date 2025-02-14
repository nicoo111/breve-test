import React, { useState, useEffect } from "react";
import "./ProductDetailsModal.css";

const ProductDetailsModal = ({ isOpen, closeModal, selectedItem }) => {

  //const initialPrice = selectedItem?.sizes?.length > 0 ? selectedItem.sizes[0].price : 0.00;
  const [selectedPrice, setSelectedPrice] = useState(0.00);
  const [quantity, setQuantity] = useState(0);

  const qtyIncrement = () => setQuantity(quantity + 1);
  const qtyDecrement = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

  useEffect(() => {
    if (selectedItem?.sizes?.length > 0) {
      setSelectedPrice(selectedItem.sizes[0].price);
      setQuantity(0);
    } else {
      setSelectedPrice(0.00);
    }
  }, [selectedItem]);

  if (!isOpen || !selectedItem) return null;

  return (
    <div className="module-overlay">
      <div className="module-container">
        <button onClick={closeModal} className="close-button">✕</button>

        <h2 className="module-title">{selectedItem.item_name}</h2>
        <div className="module-content">
          <div className="module-image-container">
            <img 
              src={`/images/${selectedItem.item_id}..png`} alt={selectedItem.item_name} className="module-image"
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
          <div className="option">
            <label>Select Serving Size</label>
            <div className="size-buttons">
              {selectedItem.sizes?.length > 0 ? (
                selectedItem.sizes.map((size, index) => (
                  <button key={index} className="size-button" 
                    onClick={() => setSelectedPrice(size.price)} 
                  >
                    {size.size}
                  </button>
                ))
              ) : (
                <p className="no-sizes">No sizes available</p>
              )}
            </div>
          </div>
          <div className="option">
            <label>Order Quantity:</label>
            <div className="quantity-controls">
              <button className="quantity-button" onClick={qtyDecrement} >-</button>
              <span className="quantity-display">{quantity}</span>
              <button className="quantity-button" onClick={qtyIncrement} >+</button>
            </div>
          </div>
          <div className="option">
            <label>Select Add-ons</label>
            {selectedItem.addons?.length > 0 ? (
              selectedItem.addons.map((addon, index) => (
                <div key={index} className="addon-container"> 
                  <span className="addon-label">{addon.addon_name} (+₱{addon.addon_price})</span>
                  <div className="addon-controls">
                    <button className="addon-button">-</button>
                    <span className="addon-display">0</span>
                    <button className="addon-button">+</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-sizes">No add-ons available</p>
            )}
          </div>
        </div>

        <hr className="module-divider" />

        <input type="text" placeholder="Special Instructions (e.g., 50% sugar)" />

        <div className="price-confirm">
        <h2 className="module-price">Php {selectedPrice.toFixed(2)}</h2>

          <button className="confirm-button">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
