import React from 'react';
import './App.css';

import MapContainer from './components/Map/MapContainer';
import PlayersContainer from './components/Players/PlayersContainer';

function App() {
  return (
    <React.Fragment>
      <header className="App-header">
        Header
      </header>

      <PlayersContainer />
      <MapContainer />
    </React.Fragment>
  );
}

export default App;
