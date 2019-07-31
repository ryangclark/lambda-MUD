import { combineReducers } from 'redux';

import playersReducer from '../components/Players/PlayersReducer';

export default combineReducers({
	players: playersReducer,
})

// currentRoom: {
// 		"cooldown": null,
// 		"coordinates": null,
// 		"description": '',
// 		"errors": [],
// 		"exits": [],
// 		"messages": []
// 		"room_id": null,
// 	  	"title": '',
// 	},
// 	map: null,