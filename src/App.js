import React from 'react';
import './App.css';
import Items from "./Items";

const App = () => {
  return (
    <div>
      <header className="floating-header">
        <h1 className="logo-text">BreveLine</h1>
      </header>

      <Items />
    </div>
  );
};

export default App;
