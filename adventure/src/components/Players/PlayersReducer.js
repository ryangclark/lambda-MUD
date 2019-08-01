import {
	ADD_PLAYER_FAILURE,
	ADD_PLAYER_START,
	ADD_PLAYER_SUCCESS,
	GET_PLAYER_ROOM_FAILURE,
	GET_PLAYER_ROOM_START,
	GET_PLAYER_ROOM_SUCCESS,
	GET_PLAYER_STATUS_FAILURE,
	GET_PLAYER_STATUS_START,
	GET_PLAYER_STATUS_SUCCESS,
	INIT_PLAYERS_EMPTY,
	INIT_PLAYERS_FAILURE,
	INIT_PLAYERS_START,
	INIT_PLAYERS_SUCCESS,
	MOVE_PLAYER_FAILURE,
	MOVE_PLAYER_START,
	MOVE_PLAYER_SUCCESS,
	CLOSE_ADD_PLAYER_FORM,
	OPEN_ADD_PLAYER_FORM,
	SET_ACTIVE_PLAYER,
} from './PlayersActions';

const initialState = {
	// activePlayer: null,
	activeToken: '',
	error: null,
	players: {},
		// clark: {
		// 	"cooldown": null,
		// 	"encumbrance": null,  // How much are you carrying?
		//   	"errors": [],
		//   	"gold": null,
		//   	"inventory": [],
		//   	"messages": []
		//   	"name": '',
		//   	"speed": null,  // How fast do you travel?
		//   	"status": [],
		// 	"strength": null,  // How much can you carry?
		// 	"token": null,
		// }
		// {
		// 	"cooldown": 60,
		// 	"encumbrance": 10,  // How much are you carrying?
		//   	"errors": [],
		//   	"gold": 400,
		//   	"inventory": ["An Item"],
		//   	"messages": [],
		//   	"name": 'clark',
		//   	"speed": 10,  // How fast do you travel?
		//   	"status": [],
		// 	"strength": 10,  // How much can you carry?
		// 	"token": 'Token!',
		// }
	status: {
		addingPlayer: false,
		gettingData: false,
		gettingRoom: false,
		gettingStatus: false,
		header: 'empty', // 'display', 'empty', 'form', 'problem',
		previousHeader: 'empty'
	}
}


function playersReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_PLAYER_START: {
			return {
				...state,
				error: null,
				status: {
					...state.status,
					addingPlayer: true,
					gettingData: true
				}
			}
		}
		case ADD_PLAYER_SUCCESS: {
			return {
				...state,
				activePlayer: action.token,
				error: null,
				status: {
					...state.status,
					addingPlayer: false,
					gettingData: false,
					header: 'display'
				}
			}
		}
		case ADD_PLAYER_FAILURE: {
			return {
				...state,
				error: action.payload,
				status: {
					...state.status,
					addingPlayer: false,
					gettingData: false
				}
			}
		}
		case GET_PLAYER_ROOM_START:
			return {
				...state,
				error: null,
				status: {
					...state.status,
					gettingData: true,
					gettingRoom: true,
				}
			}
		case GET_PLAYER_ROOM_SUCCESS:
			return {
				...state,
				error: null,
				players: {
					...state.players,
					[action.token]: {
						...state.players[action.token],
						room: action.payload
					}
				},
				status: {
					...state.status,
					gettingData: false,
					gettingRoom: false,
				}
			}
		case GET_PLAYER_ROOM_FAILURE:
			return {
				...state,
				error: action.payload,
				status: {
					...state.status,
					gettingData: false,
					gettingRoom: false,
				}
			}
		case GET_PLAYER_STATUS_START:
			return {
				...state,
				error: null,
				status: {
					...state.status,
					gettingData: true,
					gettingStatus: true
				}
			}
		case GET_PLAYER_STATUS_SUCCESS:
			return {
				...state,
				error: null,
				players: {
					...state.players,
					[action.token]: {
						...state.players[action.token],
						status: action.payload
					}
				},
				status: {
					...state.status,
					gettingData: false,
					gettingStatus: false
				}
			}
		case GET_PLAYER_STATUS_FAILURE:
			return {
				...state,
				error: action.payload,
				status: {
					...state.status,
					gettingData: false,
					gettingStatus: false
				}
			}
		case INIT_PLAYERS_START:
			return {
				...state,
				error: null,
				status: {
					...state.status,
					gettingData: true,
					header: 'loading'
				}
			}
		case INIT_PLAYERS_EMPTY:
			return {
				...state,
				error: null,
				status: {
					...state.status,
					gettingData: false,
					header: 'empty'
				}
			}
		case INIT_PLAYERS_SUCCESS:
			return {
				...state,
				error: null,
				status: {
					...state.status,
					gettingData: false,
					header: 'display'
				}
			}
		case INIT_PLAYERS_FAILURE:
			return {
				...state,
				error: action.payload,
				status: {
					...state.status,
					gettingData: false,
					header: 'problem'
				}
			}
		case MOVE_PLAYER_START:
			return {
				...state,
				error: null,
			}
		case MOVE_PLAYER_SUCCESS:
			// console.log('MOVE_PLAYER_SUCCESS', action.payload)
			return {
				...state,
				players: {
					...state.players,
					[action.token]: {
						...state.players[action.token],
						room: action.payload
					}
				},
			}
		case MOVE_PLAYER_FAILURE:
			return {
				...state,
				error: action.payload
			}
		case CLOSE_ADD_PLAYER_FORM:
			return {
				...state,
				status: {
					...state.status,
					header: action.payload
				}
			}
		case OPEN_ADD_PLAYER_FORM:
			return {
				...state,
				status: {
					...state.status,
					header: 'form',
					previousHeader: action.payload
				}
			}
		case SET_ACTIVE_PLAYER:
			return {
				...state,
				activeToken: action.payload
			}
		default:
			return state;
	}
}

export default playersReducer