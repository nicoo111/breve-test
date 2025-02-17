import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Items from "./Items";
import './Styles/App.css';

//baka mawala image pre yun filenamekasi dalawa yung period

const App = () => {
  const [isItemOpen, setIsItemOpen] = useState(false);

  const handleOpenItem = () => {
    setIsItemOpen(true); 
  };

  const handleCloseItem = () => {
    setIsItemOpen(false); 
  };

  return (
    <div>
      <div className="logo">
        <h1>BrevéLine</h1>
      </div>

      <div>
        <Items onOpenItem={handleOpenItem} onCloseItem={handleCloseItem} />
      </div>

      {!isItemOpen && (
        <button className="floating-cart">
          <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
        </button>
      )}
    </div>
  );
};

export default App;