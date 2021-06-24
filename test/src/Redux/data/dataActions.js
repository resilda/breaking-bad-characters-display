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

//FILTERS

export function setNameCharacter(nameCharacter) {
	return {
		type: actionTypes.SET_NAME_CHARACTER, 
		payload: nameCharacter
	}
}

export function setCategory(category) {
	return {
		type: actionTypes.SET_CATEGORY, 
		payload: category
	}
}

export function setStartDate(startDate) {
	return {
		type: actionTypes.SET_START_DATE,
		payload: startDate
	}
}

export function setEndDate(endDate) {
	return {
		type: actionTypes.SET_END_DATE, 
		payload: endDate
	}
}

export function filters() {
	return function(dispatch, nameCharacter, category, startDate, endDate) {
		dispatch(setNameCharacter(nameCharacter));
		dispatch(setCategory(category));
		dispatch(setStartDate(startDate));
		dispatch(setEndDate(endDate));
	}
}

export function doFilters(filterTable) {
	return {
		type: actionTypes.DO_FILTERS,
		payload: filterTable
	}
}

//FETCH ALL DATA

export function fetchData(params = {}) {
	return async function(dispatch) {
		dispatch(fetchRequest());
		try {
			let response = await axios.get(`${CHARACTERS_API}/characters`, { params });
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
			dispatch(currentCharacterSuccess(responseID.data));
		} catch (error) {
			const message = error.message;
			dispatch(currentCharacterFailure(message));
		}
	};
}
