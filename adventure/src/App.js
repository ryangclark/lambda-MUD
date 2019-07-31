import React from 'react';
import './App.css';

import PlayersContainer from './components/Players/PlayersContainer';

function App() {
  return (
    <React.Fragment>
      <header className="App-header">
        Header
      </header>

      <PlayersContainer />
    </React.Fragment>
  );
}

export default App;
