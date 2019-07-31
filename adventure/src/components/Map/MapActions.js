// import axios from 'axios';

//
export const GET_MAP_DATA_FAILURE = 'GET_MAP_DATA_FAILURE';
export const GET_MAP_DATA_START = 'GET_MAP_DATA_START';
export const GET_MAP_DATA_SUCCESS = 'GET_MAP_DATA_SUCCESS';

export const getMapData = () => dispatch => {
	dispatch({ type: GET_MAP_DATA_START })

}