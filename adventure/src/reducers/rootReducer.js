import { combineReducers } from 'redux';

import mapReducer from '../components/Map/MapReducer';
import playersReducer from '../components/Players/PlayersReducer';

export default combineReducers({
	map: mapReducer,
	players: playersReducer,
})