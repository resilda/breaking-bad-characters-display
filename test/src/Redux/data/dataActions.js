import * as actionTypes from './dataTypes';
import axios from 'axios';

//GETTING DATA FROM API

//const CHARACTERS_API = process.env.REACT_APP_CHARACTERS_API;

const CHARACTERS_API = 'https://www.breakingbadapi.com/api/characters';

//FETCHING DATA

export const fetchRequest = () => {
	return {
		type: actionTypes.FETCH_DATA_REQUEST
	};
};

export const fetchSuccess = (info) => {
	return {
		type: actionTypes.FETCH_DATA_SUCCESS,
		payload: info
	};
};

export const fetchFailure = (error) => {
	return {
		type: actionTypes.FETCH_DATA_FAILURE,
		payload: error
	};
};

//CURRENT CHARACTER

export const getCurrentCharacter = (currentCharacter) => {
	return {
		type: actionTypes.GET_CURRENT_CHARACTER,
		payload: currentCharacter
	};
};

//PAGINATION ACTIONS

export const setAllCharactersCount = (totalCount) => {
	return {
		type: actionTypes.SET_ALL_CHARACTERS_COUNT,
		payload: totalCount
	};
};

export const setCurrentPage = (page) => {
	return {
		type: actionTypes.SET_CURRENT_PAGE,
		payload: page
	};
};

export const setLimitPerPage = (limit) => {
	return {
		type: actionTypes.SET_LIMIT_PER_PAGE,
		payload: limit
	};
};

//FILTER BASED ON NAME INPUT

export const setName = (nameInput) => {
	return {
		type: actionTypes.SET_NAME,
		payload: nameInput
	};
};

//FILTER BASED ON NAME INPUT AND CATEGORY

export const setNameCategory = (category) => {
	return {
		type: actionTypes.SET_NAME_CATEORY,
		payload: category
	};
};

export function fetchData(params = {}) {
	return async function(dispatch) {
		dispatch(fetchRequest());
		try {
			let response = await axios.get(CHARACTERS_API, { params });
			console.log(response);
			dispatch(fetchSuccess(response.data));
		} catch (error) {
			const message = error.message;
			dispatch(fetchFailure(message));
		}
	};
}
