import axios from 'axios';
import * as actionTypes from './dataTypes';

export const fetchRequest = (infoID) => {
	return {
		type: actionTypes.FETCH_DATA_REQUEST,
		payload: infoID
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

export const fetchData = (infoID) => {
	return (dispatch) => {
		dispatch(fetchRequest(infoID));
		axios
			.get('https://breakingbadapi.com/api/characters')
			.then((response) => {
				const info = response.json;
				dispatch(fetchSuccess(info));
			})
			.catch((error) => {
				const message = error.message;
				dispatch(fetchFailure(error));
			});
	};
};
