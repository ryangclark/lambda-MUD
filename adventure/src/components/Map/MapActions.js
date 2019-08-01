// import axios from 'axios';

//
export const ADD_ROOM = 'ADD_ROOM';

export const addRoom = roomData => dispatch => {
	
	let payload = {
		coordinates: intCoordinates(roomData.coordinates),
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

function intCoordinates(coordinates) {
	const stringCoordinates = coordinates.match(/\d+/g)
	return {
		x: parseInt(stringCoordinates[0]),
		y: parseInt(stringCoordinates[1])
	}
}

//
export const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM';

export const setCurrentRoom = (roomId) => dispatch => {
	dispatch({
		id: roomId,
		type: SET_CURRENT_ROOM
	})
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
