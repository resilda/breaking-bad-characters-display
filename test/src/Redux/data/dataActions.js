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

//PAGINATION

export function setAllCharactersRequest() {
	return {
		type: actionTypes.SET_ALL_CHARACTERS_REQUEST
	};
}

export function setAllCharactersCount(totalCount) {
	return {
		type: actionTypes.SET_ALL_CHARACTERS_COUNT,
		payload: totalCount
	};
}

export function setAllCharactersFailure(error) {
	return {
		type: actionTypes.SET_ALL_CHARACTER_FAILURE,
		payload: error
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

//FILTERS

export function setCharacterName(characterName) {
	return {
		type: actionTypes.SET_CHARACTER_NAME,
		payload: characterName
	};
}

export function setCategory(category) {
	return {
		type: actionTypes.SET_CATEGORY,
		payload: category
	};
}

export function setRangeDate({ startDate, endDate }) {
	return {
		type: actionTypes.SET_RANGE_DATE,
		payload: {
			rangeDates: {
				startDate: startDate,
				endDate: endDate
			}
		}
	};
}

export function setFilters(filteredCharacters) {
	return {
		type: actionTypes.SET_FILTERS,
		payload: filteredCharacters
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
		dispatch(setAllCharactersRequest());
		try {
			let responseAll = await axios.get(`${CHARACTERS_API}/characters`);
			dispatch(setAllCharactersCount(responseAll.data));
		} catch (error) {
			const message = error.message;
			dispatch(setAllCharactersFailure(message));
		}
	};
}

//GET A CHARACTER TO RENDER FOR DETAILS PAGE

export function fetchCharactersID(id) {
	return async function(dispatch) {
		dispatch(currentCharacterRequest());
		try {
			let responseID = await axios.get(`${CHARACTERS_API}/characters/${id}`);
			dispatch(currentCharacterSuccess(responseID.data));
		} catch (error) {
			const message = error.message;
			dispatch(currentCharacterFailure(message));
		}
	};
}
