import * as actionTypes from './dataTypes';

const initialState = {
	loading: false,
	info: [],
	error: '',
	loadingCharacter: false,
	currentCharacter: [],
	errorCharacter: '',
	totalCount: [],
	currentPage: 0,
	limitPerPage: 10,
	nameInput: '', //Filter name
	filters: {
		characterName: '',
		category: '',
		startDate: new Date(), 
		endDate: new Date(), 
	}, 
	filteredCharacters: []
};

function dataReducer(state = initialState, action) {
	switch (action.type) {
		//FETCH DATA
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
		//FETCH DATA FOR CURRENT CHARACTER
		case actionTypes.CURRENT_CHARACTER_REQUEST:
			return {
				...state,
				loadingCharacter: true
			};
		case actionTypes.CURRENT_CHARACTER_SUCCESS:
			return {
				...state,
				loadingCharacter: false,
				currentCharacter: action.payload,
				errorCharacter: ''
			};
		case actionTypes.CURRENT_CHARACTER_FAILURE:
			return {
				...state,
				loadingCharacter: false,
				currentCharacter: [],
				errorCharacter: action.payload
			};
		//GET TOTAL CHARACTERS
		case actionTypes.SET_ALL_CHARACTERS_COUNT:
			return {
				...state,
				loadingCount: false,
				totalCount: action.payload
			};
		//PAGINATION
		case actionTypes.SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.payload
			};
		case actionTypes.SET_LIMIT_PER_PAGE:
			return {
				...state,
				limitPerPage: action.payload
			};
		//FILTER NAME
		case actionTypes.SET_NAME:
			return {
				...state,
				nameInput: action.payload
			};
		//FILTERS
		case actionTypes.SET_NAME_CHARACTER: 
			return {
				...state, 
			}
		default:
			return state;
	}
}

export default dataReducer;
