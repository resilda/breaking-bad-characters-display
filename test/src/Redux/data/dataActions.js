import * as actionTypes from './dataTypes';
import axios from 'axios';

//GETTING DATA FROM API

const CHARACTERS_API = process.env.REACT_APP_CHARACTERS_API;

//FETCHING DATA

export function fetchRequest() {
	return {
		type: actionTypes.FETCH_DATA_REQUEST
	};
}

export function fetchSuccess(info) {
	return {
		type: actionTypes.FETCH_DATA_SUCCESS,
		payload: info
	};
}

export function fetchFailure(error) {
	return {
		type: actionTypes.FETCH_DATA_FAILURE,
		payload: error
	};
}

//CURRENT CHARACTER

export function currentCharacterRequest() {
	return {
		type: actionTypes.CURRENT_CHARACTER_REQUEST
	};
}

export function currentCharacterSuccess(currentCharacter) {
	return {
		type: actionTypes.CURRENT_CHARACTER_SUCCESS,
		payload: currentCharacter
	};
}

export function currentCharacterFailure(error) {
	return {
		type: actionTypes.CURRENT_CHARACTER_FAILURE,
		payload: error
	};
}

//PAGINATION ACTIONS

export function setAllCharactersCount(totalCount) {
	return {
		type: actionTypes.SET_ALL_CHARACTERS_COUNT,
		payload: totalCount
	};
}

export function setCurrentPage(page) {
	return {
		type: actionTypes.SET_CURRENT_PAGE,
		payload: page
	};
}

export function setLimitPerPage(limit) {
	return {
		type: actionTypes.SET_LIMIT_PER_PAGE,
		payload: limit
	};
}

//FILTER BASED ON NAME INPUT

export function setName(nameInput) {
	return {
		type: actionTypes.SET_NAME,
		payload: nameInput
	};
}

//FILTER BASED ON NAME INPUT AND CATEGORY

export function setNameCategory(name, category) {
	return {
		type: actionTypes.SET_NAME_CATEORY,
		payload: {
			name: name,
			category: category
		}
	};
}

//FETCH ALL DATA

export function fetchData(params = {}) {
	return async function(dispatch) {
		dispatch(fetchRequest());
		try {
			let response = await axios.get(`${CHARACTERS_API}/characters`, { params });
			console.log('response', response);
			dispatch(fetchSuccess(response.data));
		} catch (error) {
			const message = error.message;
			dispatch(fetchFailure(message));
		}
	};
}

//TOTAL COUNT OF DATA

export function fetchDataAll() {
	return async function(dispatch) {
		try {
			let responseAll = await axios.get(`${CHARACTERS_API}/characters`);
			console.log('responseAll', responseAll);
			dispatch(setAllCharactersCount(responseAll.data));
		} catch (error) {
			console.log(error);
		}
	};
}

//GET A CHARACTER TO RENDER FOR DETAILS PAGE

export function fetchCharactersID(id) {
	return async function(dispatch) {
		dispatch(currentCharacterRequest());
		try {
			let responseID = await axios.get(`${CHARACTERS_API}/characters/${id}`);
			console.log('responseID.data', responseID.data);
			dispatch(currentCharacterSuccess(responseID.data));
		} catch (error) {
			const message = error.message;
			dispatch(currentCharacterFailure(message));
		}
	};
}
