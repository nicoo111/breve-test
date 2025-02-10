import React, { useEffect, useState } from "react";
import AddToCartBtn from "./AddToCartBtn";
import "./Items.css";
import fetchMenuData from "./fetchMenuData";

const Items = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getMenuData = async () => {
      const data = await fetchMenuData();
      setMenuItems(data);

      const uniqueCategories = [...new Set(data.map((item) => item.item_category))];
      setCategories(uniqueCategories);
    };

    getMenuData();
  }, []);

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
                  <img src={`/5.png`} alt={item.item_name} className="item-image" />
                  {/*  <img src="./5" alt={item.item_name} className="item-image" />*/}
                    <div className="text-content">
                      <h2 className="item-name">{item.item_name}</h2>
                      <p className="eta">{item.item_preptime_min}-{item.item_preptime_max} minutes</p>
                      <p className="description">{item.item_description}</p>
                      <div className="bottom-row">
                        <p className="price">
                          Php {item.item_price.toFixed(2)}
                        </p> 
                        
                        <AddToCartBtn />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Items;
