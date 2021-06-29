import * as actionTypes from './dataTypes';

const initialState = {
	loading: false,
	info: [],
	error: '',
	loadingCharacter: false,
	currentCharacter: [],
	errorCharacter: '',
	loadingAll: false,
	totalCount: [],
	errorAll: '',
	currentPage: 0,
	limitPerPage: 10,
	filters: {
		characterName: '',
		category: '',
		startDate: null,
		endDate: null
	},
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
				filteredCharacters: action.payload,
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
		case actionTypes.SET_ALL_CHARACTERS_REQUEST:
			return {
				...state,
				loadingAll: true
			};
		case actionTypes.SET_ALL_CHARACTERS_COUNT:
			return {
				...state,
				loadingAll: false,
				totalCount: action.payload
			};
		case actionTypes.SET_ALL_CHARACTER_FAILURE:
			return {
				...state,
				totalCount: [],
				errorAll: action.payload
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
		//FILTERS
		case actionTypes.SET_CHARACTER_NAME:
			return {
				...state,
				filters: {
					...state.filters,
					characterName: action.payload
				}
			};
		case actionTypes.SET_CATEGORY:
			return {
				...state,
				filters: {
					...state.filters,
					category: action.payload
				}
			};
		case actionTypes.SET_RANGE_DATE:
			return {
				...state,
				filters: {
					...state.filters,
					startDate: action.payload.rangeDates.startDate,
					endDate: action.payload.rangeDates.endDate
				}
			};
		case actionTypes.RESET_FILTER_VALUES:
			return {
				...state,
				filters: {
					characterName: '',
					category: '',
					startDate: null,
					endDate: null
				}
			}
		default:
			return state;
	}
}

export default dataReducer;
