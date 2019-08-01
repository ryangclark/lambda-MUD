import axios from 'axios';
import { addRoom, updateExits } from '../Map/MapActions';

//
export const ADD_PLAYER_FAILURE = 'ADD_PLAYER_FAILURE';
export const ADD_PLAYER_START = 'ADD_PLAYER_START';
export const ADD_PLAYER_SUCCESS = 'ADD_PLAYER_SUCCESS';

export const addPlayer = token => dispatch => {
	console.log('addPlayer');
	dispatch({ type: ADD_PLAYER_START });

	let tokens = localStorage.getItem('playerTokens').split(',');

	if (tokens.includes(token)) {
		dispatch({
			payload: 'Token already stored!',
			token,
			type: ADD_PLAYER_FAILURE
		})
		return;
	}

	tokens[0] ? tokens.push(token) : tokens[0] = token;

	Promise.resolve()
		.then(() => dispatch(getPlayerRoom(token)))
		.then(cooldown => new Promise(resolve => 
			setTimeout(resolve, cooldown * 1000)
		))
		.then(() => dispatch(getPlayerStatus(token)))
		.then(() => dispatch(setActivePlayer(token)))
		.then(() => localStorage.setItem('playerTokens', tokens.toString()))
		.then(() => dispatch({ type: ADD_PLAYER_SUCCESS }))
		.catch(error => {
			dispatch({
				payload: 'Unable to validate token', 
				token,
				type: ADD_PLAYER_FAILURE
			})
			console.error(error)
		})
}

// convert `res.data.exits` to the object we need
function convertExits(exitsString) {
	let exits = {}
	for (let direction of exitsString) {
		exits[direction] = '?'
	}
	return exits
}

//
export const GET_PLAYER_ROOM_FAILURE = 'GET_PLAYER_ROOM_FAILURE';
export const GET_PLAYER_ROOM_START = 'GET_PLAYER_ROOM_START';
export const GET_PLAYER_ROOM_SUCCESS = 'GET_PLAYER_ROOM_SUCCESS';

export function getPlayerRoom(token) {return dispatch => {
	// console.log('getPlayerRoom', token);

	dispatch({ type: GET_PLAYER_ROOM_START });
	return axios.get(
		'https://lambda-treasure-hunt.herokuapp.com/api/adv/init/',
		{headers: {'Authorization': `Token ${token}`}}
	).then(res => {
		// console.log('getPlayerRoom response:', res);

		if (res.status === 200) {
			dispatch({
				token,
				payload: {...res.data, exits: convertExits(res.data.exits)},
				type: GET_PLAYER_ROOM_SUCCESS
			});
			return {
				cooldown: res.data.cooldown,
				roomData: {...res.data, exits: convertExits(res.data.exits)}
			}
		}
	}).catch(error => {
		dispatch({
			token,
			payload: error.response && error.response.status === 401 ? 
				'Invalid Token' : 'Problem',
			type: GET_PLAYER_ROOM_FAILURE
		});
		throw Error(error)
	})
}}

//
export const GET_PLAYER_STATUS_FAILURE = 'GET_PLAYER_STATUS_FAILURE';
export const GET_PLAYER_STATUS_START = 'GET_PLAYER_STATUS_START';
export const GET_PLAYER_STATUS_SUCCESS = 'GET_PLAYER_STATUS_SUCCESS';

export const getPlayerStatus = token => dispatch => {
	// console.log('getPlayerStatus', token);

	dispatch({ type: GET_PLAYER_STATUS_START });
	return axios.post(
		'https://lambda-treasure-hunt.herokuapp.com/api/adv/status/',
		null,
		{headers: {'Authorization': `Token ${token}`}}
	).then(res => {
		// console.log('successful', res.data.name)
		dispatch({
			token,
			payload: res.data,
			type: GET_PLAYER_STATUS_SUCCESS
		})
		return res.data.name
	}).catch(error => {
		dispatch({
			token,
			payload: error.response && error.response.status === 401 ? 
				'Invalid Token' : 'Problem', 
			type: GET_PLAYER_STATUS_FAILURE
		})
		throw Error(error)
	})
}


//
export const INIT_PLAYERS_EMPTY = 'INIT_PLAYERS_EMPTY';
export const INIT_PLAYERS_FAILURE = 'INIT_PLAYERS_FAILURE';
export const INIT_PLAYERS_START = 'INIT_PLAYERS_START';
export const INIT_PLAYERS_SUCCESS = 'INIT_PLAYERS_SUCCESS';

export const initPlayers = () => dispatch => {
	dispatch({ type: INIT_PLAYERS_START })
	let tokens = localStorage.getItem('playerTokens');

	if (!tokens || !tokens.length) {
		console.log('no tokens:', tokens)
		localStorage.setItem('playerTokens', '')
		return dispatch({
			type: INIT_PLAYERS_EMPTY
		})
	}

	tokens = tokens.split(',')

	let promises = tokens.map(token =>
		Promise.resolve()
		.then(() => dispatch(getPlayerRoom(token)))
		.then(res => {
			dispatch(addRoom(res.roomData))
			return new Promise(resolve => 
					setTimeout(resolve, res.cooldown * 1000)
				)
		})
		.then(() => dispatch(getPlayerStatus(token)))
		.catch(error => console.error(error))
	);

	Promise.all(promises)
	.then(() => dispatch(setActivePlayer(tokens[0])))
	.then(() => dispatch({ type: INIT_PLAYERS_SUCCESS }))
	// .then(() => dispatch(initMap(tokens[0])))
	.catch(error => console.error(error))
}

//
export const MOVE_PLAYER_FAILURE = 'MOVE_PLAYER_FAILURE';
export const MOVE_PLAYER_START = 'MOVE_PLAYER_START';
export const MOVE_PLAYER_SUCCESS = 'MOVE_PLAYER_SUCCESS';

export const movePlayer = (direction, currentRoom, token) => dispatch => {
	// console.log('move token:', token)
	dispatch({ type: MOVE_PLAYER_START })

	let inverseExits = {n: 's', s: 'n', w: 'e', e: 'w'}

	let knownExit = currentRoom.exits[direction] === '?' ? false : currentRoom.exits[direction]
	console.log('knownExit:', currentRoom.room_id, knownExit)

	let reqBody = knownExit ?  
		{direction: direction, next_room_id: currentRoom.exits[direction].toString()} : 
		{direction: direction}
		
	axios.post(
		'https://lambda-treasure-hunt.herokuapp.com/api/adv/move/',
		reqBody,
		{headers: {'Authorization': `Token ${token}`}}
	)
	.then(res => {
		// console.log('move res.data:', res.data)
		if (res.status !== 200) {
			return dispatch({
				payload: res.data,
				token,
				type: MOVE_PLAYER_FAILURE
			})
		}
		let newExits = {
			...convertExits(res.data.exits),
			[inverseExits[direction]]: currentRoom.room_id
		}

		if (!knownExit) {
			dispatch(updateExits(
				currentRoom.room_id,
				{...currentRoom.exits, [direction]: res.data.room_id}
			))
			
			dispatch(addRoom({...res.data, exits: newExits}))
		}

		dispatch({
			payload: {...res.data, exits: newExits},
			token,
			type: MOVE_PLAYER_SUCCESS
		})
	})
	.catch(error => {
		dispatch({
			payload: error,
			token,
			type: MOVE_PLAYER_FAILURE
		})
		console.log(error)
	})
}

//
export const CLOSE_ADD_PLAYER_FORM = 'CLOSE_ADD_PLAYER_FORM';
export const OPEN_ADD_PLAYER_FORM = 'OPEN_ADD_PLAYER_FORM';

export const toggleAddPlayerForm = (current, previous) => dispatch => {
	if (current === 'form') {
		dispatch({
			payload: previous,
			type: CLOSE_ADD_PLAYER_FORM
		})
	} else {
		dispatch({
			payload: current,
			type: OPEN_ADD_PLAYER_FORM
		})
	}
}

//
export const SET_ACTIVE_PLAYER = 'SET_ACTIVE_PLAYER';

export const setActivePlayer = token => dispatch => {
	dispatch({
		payload: token,
		type: SET_ACTIVE_PLAYER
	})
}
