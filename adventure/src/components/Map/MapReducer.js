import {
	GET_MAP_DATA_FAILURE,
	GET_MAP_DATA_START,
	GET_MAP_DATA_SUCCESS,
} from './MapActions'

const initialState = {
	gridData: null,
}

function mapReducer(state = initialState, action) {
	switch (action.type) {
		case GET_MAP_DATA_START:
			return state
		case GET_MAP_DATA_SUCCESS:
			return state
		case GET_MAP_DATA_FAILURE:
			return state
		default:
			return state
	}
}

export default mapReducer