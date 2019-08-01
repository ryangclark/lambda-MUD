import React from 'react';
import './App.css';

import MapContainer from './components/Map/MapContainer';
import PlayersContainer from './components/Players/PlayersContainer';

function App() {
  return (
    <div className="app-container">
      <header className="App-header grid-all">
        Header
      </header>

      <PlayersContainer />
      <MapContainer />
    </div>
  );
}

export default App;
