import React from 'react';
import './App.css';
import Items from "./Items";

const App = () => {
  return (
    <div>
      <div className="logo">
        <h1>BrevéLine</h1>
      </div>

      <div>
        <Items />
      </div>
    </div>
  );
};


export default App;
