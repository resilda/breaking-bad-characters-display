import * as actionTypes from "./dataTypes";

//GETTING DATA FROM API

const CHARACTERS_API = "https://breakingbadapi.com/api/characters";

export const fetchRequest = (infoID) => {
  return {
    type: actionTypes.FETCH_DATA_REQUEST,
    payload: infoID,
  };
};

export const fetchSuccess = (info, limit, offset) => {
  return {
    type: actionTypes.FETCH_DATA_SUCCESS,
    payload: {
      info: info,
      limit: limit,
      offset: offset,
    },
  };
};

export const fetchFailure = (error) => {
  return {
    type: actionTypes.FETCH_DATA_FAILURE,
    payload: error,
  };
};

export function fetchData(infoID) {
  return async function (dispatch) {
    dispatch(fetchRequest(infoID));
    try {
      let response = await fetch(CHARACTERS_API);
      let info = await response.json();
      dispatch(fetchSuccess(info));
    } catch (error) {
      const message = error.message;
      dispatch(fetchFailure(message));
    }
  };
}

//HANDLE PAGINATION ACTIONS

// export const currentPage = (currentPage) => (dispatch) =>
//   dispatch({
//     type: actionTypes.SET_CURRENT_PAGE,
//     payload: currentPage,
//   });

// export const setPageLimit = (charactersLimit) => (dispatch) => {
//   dispatch({
//     type: actionTypes.SET_PAGE_LIMIT,
//     payload: charactersLimit,
//   });
// };

// export const offset = (offset) => (dispatch) => {
//   dispatch({
//     type: actionTypes.SET_OFFSET,
//     payload: offset,
//   });
// };
