import * as actionTypes from './dataTypes';

const initialState = {
	loading: false,
	info: [],
	error: '',
	currentCharacter: null,
	totalCount: [],
	currentPage: 0,
	limitPerPage: 10,
	nameInput: '',
	name: '', //Filter name and category
	category: ''
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
		case actionTypes.GET_CURRENT_CHARACTER:
			return {
				...state, 
				currentCharacter: action.payload
			}
		case actionTypes.SET_ALL_CHARACTERS_COUNT:
			return {
				...state,
				totalCount: action.payload
			}
		case actionTypes.SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.payload
			};
		case actionTypes.SET_LIMIT_PER_PAGE:
			return {
				...state,
				limitPerPage: action.payload, 
			};
		case actionTypes.SET_NAME:
			return {
				...state,
				nameInput: action.payload
			};
		case actionTypes.SET_NAME_CATEORY:
			return {
				...state,
				name: action.payload.name,
				category: action.payload.category
			};
		default:
			return state;
	}
};

export default dataReducer;
