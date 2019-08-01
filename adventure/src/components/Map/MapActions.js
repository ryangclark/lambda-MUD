// import axios from 'axios';

//
export const ADD_ROOM = 'ADD_ROOM';

export const addRoom = roomData => dispatch => {
	const stringCoordinates = roomData.coordinates.match(/\d+/g)
	
	// let exits = {}
	// for (let direction of roomData.exits) {
	// 	exits[direction] = '?'
	// }

	let payload = {
		coordinates: {
			x: parseInt(stringCoordinates[0]),
			y: parseInt(stringCoordinates[1])
		},
		description: roomData.description,
		elevation: roomData.elevation,
		exits: roomData.exits,
		room_id: roomData.room_id,
		terrain: roomData.terrain,
		title: roomData.title
	}
	dispatch({
		id: roomData.room_id,
		payload: payload,
		type: ADD_ROOM
	})
}

//
export const GET_MAP_DATA_FAILURE = 'GET_MAP_DATA_FAILURE';
export const GET_MAP_DATA_START = 'GET_MAP_DATA_START';
export const GET_MAP_DATA_SUCCESS = 'GET_MAP_DATA_SUCCESS';

export const getMapData = () => dispatch => {
	dispatch({ type: GET_MAP_DATA_START })

}

//
export const INIT_MAP_FAILURE = 'INIT_MAP_FAILURE';
export const INIT_MAP_START = 'INIT_MAP_START'; 
export const INIT_MAP_SUCCESS = 'INIT_MAP_SUCCESS';

export const initMap = () => (dispatch, getState) => {
	dispatch({ type: INIT_MAP_START })


}

// 
export const UPDATE_EXITS = 'UPDATE_EXITS';

export const updateExits = (roomId, exits) => dispatch => {
	dispatch({
		id: roomId,
		payload: exits,
		type: UPDATE_EXITS
	})
}
