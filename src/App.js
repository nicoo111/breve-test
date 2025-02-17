import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import Items from "./Items";
import './Styles/App.css';

//baka mawala image pre yun filenamekasi dalawa yung period

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
