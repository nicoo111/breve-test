import React from "react";
import AddToCartBtn from "./AddToCartBtn";
import "./Items.css";

const Items = () => {
  const menuItems = [
    {
      id: 1,
      category: "Frappe",
      name: "Oreo Frappé",
      description:
        "Double shot of espresso, steamed whole milk with a thin layer of milk foam and bits of Oreo.",
      price: 100.0,
      eta: "5-7 minutes",
      image: "/5.png",
    },
    {
      id: 2,
      category: "Core",
      name: "Spanish Latte",
      description: "Espresso + Milk + Syrup.",
      price: 89.0,
      eta: "3-5 minutes",
      image: "/14.png",
    },
  ];

  return (
    <div className="container">
      {menuItems.map((item) => (
        <div key={item.id} className="item-card">
          <h3 className="category">{item.category}</h3>
          <div className="item-details">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="text-content">
              <h2 className="item-name">{item.name}</h2>
              <p className="eta">{item.eta}</p>
              <p className="description">{item.description}</p>
              <div className="bottom-row">
                <p className="price">Php {item.price.toFixed(2)}</p>
                <AddToCartBtn />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;
