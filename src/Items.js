import React, { useEffect, useState } from "react";
import "./Items.css";
import ProductDetailsModal from "./ProductDetailsModal";
import fetchMenuData from "./fetchMenuData";


const Items = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const getMenuData = async () => {
      const data = await fetchMenuData();
      setMenuItems(data);
      const uniqueCategories = [...new Set(data.map((item) => item.item_category))];
      setCategories(uniqueCategories);
    };

    getMenuData();
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="container">
      {categories.map((category, index) => (
        <div key={index} className="category-container">
          <h3 className="category">{category}</h3>
          <div className="items-group">
            {menuItems
              .filter((item) => item.item_category === category)
              .map((item) => (
                <div key={item.item_id} className="item-card">
                  <div className="item-details">
                    <img src={`images/${item.item_id}.png`} alt={item.item_name} className="item-image" />
                    <div className="text-content">
                      <h2 className="item-name">{item.item_name}</h2>
                      <p className="eta">{item.item_preptime_min}-{item.item_preptime_max} minutes</p>
                      <p className="description">{item.item_description}</p>
                      <div className="bottom-row">
                        <p className="price">Php {item.item_price.toFixed(2)}</p>
                        <button className="add-to-cart-button" onClick={() => openModal(item)}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <hr />
        </div>
      ))}

      <ProductDetailsModal isOpen={isModalOpen} closeModal={closeModal} selectedItem={selectedItem} />
    </div>
  );
};

export default Items;
