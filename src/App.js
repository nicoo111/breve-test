import React from 'react';
import './App.css';
import Items from "./Items";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  return (
    <div>
    <div className = "logo">
    <h1>BrevéLine</h1>
      </div>

      <div>
        <Items />
      </div>
      
      <div>
      <button className="floating-cart">
      <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
       </button>
      </div>
    </div>
  );
};

export default App;
