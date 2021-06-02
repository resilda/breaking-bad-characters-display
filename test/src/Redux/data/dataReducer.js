import * as actionTypes from './dataTypes';

const initialState = {
	loading: false,
	info: [],
	error: ''
};

const dataReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_DATA_REQUEST:
			return {
				...state,
				loading: true
			};
		case actionTypes.FETCH_DATA_SUCCESS:
			return {
				...state,
				loading: false,
				info: action.payload,
				error: ''
			};
		case actionTypes.FETCH_DATA_FAILURE:
			return {
				...state,
				loading: false,
				info: [],
				error: action.payload
			};
		default:
			return state;
	}
};

export default dataReducer;
