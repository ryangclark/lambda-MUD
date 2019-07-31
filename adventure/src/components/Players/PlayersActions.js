import axios from 'axios';

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
		.catch(error => {
			dispatch({
				payload: 'Unable to validate token', 
				token,
				type: ADD_PLAYER_FAILURE
			})
			console.error(error)
		})
}

// function getPlayerToken(index) {
// 	return localStorage.getItem('playerTokens')[index]
// }

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
				payload: res.data,
				type: GET_PLAYER_ROOM_SUCCESS
			});
			return res.data.cooldown
		} else {
			dispatch({
				token,
				payload: res.data,
				type: GET_PLAYER_ROOM_FAILURE
			});
			return res.data.cooldown
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
	const tokens = localStorage.getItem('playerTokens').split(',');

	if (!tokens || !tokens[0]) {
		console.log('no tokens:', tokens)
		localStorage.setItem('playerTokens', '')
		return dispatch({
			type: INIT_PLAYERS_EMPTY
		})
	}

	let promises = tokens.map(token =>
		Promise.resolve()
		.then(() => dispatch(getPlayerRoom(token)))
		.then(cooldown => new Promise(resolve => 
			setTimeout(resolve, cooldown * 1000)
		))
		.then(() => dispatch(getPlayerStatus(token)))
		.catch(error => console.error(error))
	);

	Promise.all(promises)
	.then(() => dispatch(setActivePlayer(tokens[0])))
	.then(() => dispatch({ type: INIT_PLAYERS_SUCCESS }))
	.catch(error => console.error(error))
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
