import {
	ADD_ROOM,
	GET_MAP_DATA_FAILURE,
	GET_MAP_DATA_START,
	GET_MAP_DATA_SUCCESS,
	SET_CURRENT_ROOM,
	UPDATE_EXITS,
} from './MapActions'

const initialState = {
	currentRoom: null,
	rooms: {},
	roomCount: 0,
}

// {
//   "room_id": 350,
//   "title": "A misty room",
//   "description": "You are standing on grass and surrounded by a dense mist. You can barely make out the exits in any direction.",
//   "coordinates": "(57,72)",
//   "elevation": 0,
//   "terrain": "NORMAL",
//   "players": [],
//   "items": [
//     "shiny treasure"
//   ],
//   "exits": [
//     "n",
//     "s",
//     "e"
//   ],
//   "cooldown": 1,
//   "errors": [],
//   "messages": []
// }

function mapReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_ROOM:
			return {
				...state,
				rooms: {
					...state.rooms,
					[action.id]: action.payload
				},
				roomCount: state.roomCount + 1
			}
		case GET_MAP_DATA_START:
			return state
		case GET_MAP_DATA_SUCCESS:
			return state
		case GET_MAP_DATA_FAILURE:
			return state
		case SET_CURRENT_ROOM:
			return {
				...state,
				currentRoom: action.id
			}
		case UPDATE_EXITS:
			return {
				...state,
				rooms: {
					...state.rooms,
					[action.id]: {
						...state.rooms[action.id],
						exits: action.payload
					}
				},
			}
		default:
			return state
	}
}

export default mapReducer
