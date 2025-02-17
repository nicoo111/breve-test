import React, { useEffect, useState } from "react";
import postCartData from "./PostCartData";
import "./Styles/ProductDetailsModal.css";

const ProductDetailsModal = ({ isOpen, closeModal, selectedItem }) => {
  const [selectedPrice, setSelectedPrice] = useState(0.0);
  const [quantity, setQuantity] = useState(1);
  const [addonQuantities, setAddonQuantities] = useState({});
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [totalPrice, setTotalPrice] = useState(0.0);

  const qtyIncrement = () => setQuantity(quantity + 1);
  const qtyDecrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const addonIncrement = (index) => {
    setAddonQuantities((prev) => ({
      ...prev,
      [index]: prev[index] === 1 ? 1 : 1,
    }));
  };
  const addonDecrement = (index) => {
    setAddonQuantities((prev) => ({
      ...prev,
      [index]: prev[index] > 0 ? prev[index] - 1 : 0,
    }));
  };

  useEffect(() => {
    if (selectedItem?.sizes?.length > 0) {
      setSelectedPrice(selectedItem.sizes[0].price);
      setQuantity(1);
      setAddonQuantities({});
      setSpecialInstructions("");
    } else {
      setSelectedPrice(0.0);
    }
  }, [selectedItem]);


  useEffect(() => {
    let addonTotal = selectedItem?.addons?.reduce((sum, addon, index) => {
      return sum + (addonQuantities[index] || 0) * addon.addon_price;
    }, 0) || 0;

    setTotalPrice(quantity * selectedPrice + addonTotal);
  }, [quantity, selectedPrice, addonQuantities, selectedItem]);

  const handleConfirm = async () => {
    if (quantity === 0) {
      alert("Please select at least one quantity.");
      return;
    }

    const selectedAddons = selectedItem?.addons?.map((addon, index) => ({
      addon_id: addon.addon_id,
      quantity: addonQuantities[index] || 0,
    })).filter(addon => addon.quantity > 0);

    await postCartData(selectedItem, quantity, specialInstructions, selectedAddons, closeModal);
  };

  const handleSizeChange = (price) => {
    setSelectedPrice(price);
    setQuantity(1); 
    setTotalPrice(1 * price + calculateAddonTotal());  
  };

  const calculateAddonTotal = () => {
    return selectedItem?.addons?.reduce((sum, addon, index) => {
      return sum + (addonQuantities[index] || 0) * addon.addon_price;
    }, 0) || 0;
  };

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
            <p className="module-subtitle">{selectedItem.item_preptime_min} - {selectedItem.item_preptime_max} minutes</p>
            <p className="module-description">{selectedItem.item_description}</p>
          </div>
        </div>
        <hr className="module-divider" />
        <div className="module-options">
          <div className="option">
            <label>Select Serving Size</label>
            <div className="size-buttons">
              {selectedItem.sizes?.map((size, index) => (
                <button
                  key={index}
                  className="size-button"
                  onClick={() => handleSizeChange(size.price)}
                >
                  {size.size}
                </button>
              ))}
            </div>
          </div>


          <div className="option">
            <label>Order Quantity:</label>
            <div className="quantity-controls">
              <button className="quantity-button" onClick={qtyDecrement}>-</button>
              <span className="quantity-display">{quantity}</span>
              <button className="quantity-button" onClick={qtyIncrement}>+</button>
            </div>
          </div>

          <div className="option">
            <label>Select Add-ons</label>
            {selectedItem?.addons && selectedItem.addons.length > 0 ? (
              selectedItem.addons.map((addon, index) => (
                <div key={index} className="addon-container"> 
                  <span className="addon-label">{addon.addon_name} (+₱{addon.addon_price})</span>
                  <div className="addon-controls">
                    <button className="addon-button" onClick={() => addonDecrement(index)}>-</button>
                    <span className="addon-display">{addonQuantities[index] || 0}</span>
                    <button className="addon-button" onClick={() => addonIncrement(index)}>+</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-sizes">No add-ons available</p>
            )}
          </div>
        </div>


        <hr className="module-divider" />

        <input type="text" placeholder="Special Instructions (e.g., 50% sugar)" value={specialInstructions} onChange={(e) => setSpecialInstructions(e.target.value)} />
        
        <div className="price-confirm">
          <h2 className="module-price">Total: Php {totalPrice.toFixed(2)}</h2>
          <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
