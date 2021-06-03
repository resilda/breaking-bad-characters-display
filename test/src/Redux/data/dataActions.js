import * as actionTypes from "./dataTypes";

const CHARACTERS_API = "https://breakingbadapi.com/api/characters";

export const fetchRequest = (infoID) => {
  return {
    type: actionTypes.FETCH_DATA_REQUEST,
    payload: infoID,
  };
};

export const fetchSuccess = (info) => {
  return {
    type: actionTypes.FETCH_DATA_SUCCESS,
    payload: info,
  };
};

export const fetchFailure = (error) => {
  return {
    type: actionTypes.FETCH_DATA_FAILURE,
    payload: error,
  };
};

// export const fetchData = (infoID) => {
//   return (dispatch) => {
//     dispatch(fetchRequest(infoID));
//     axios
//       .get(CHARACTERS_API)
//       .then((response) => {
//         const info = response.data;
//         console.log(response);
//         dispatch(fetchSuccess(info));
//       })
//       .catch((error) => {
//         const message = error.message;
//         dispatch(fetchFailure(message));
//       });
//   };
// };

export function fetchData(infoID) {
  return async function (dispatch) {
    dispatch(fetchRequest(infoID));
    try {
      let response = await fetch(CHARACTERS_API);
      let info = await response.json();
      console.log(info);
      dispatch(fetchSuccess(info));
    } catch (error) {
      const message = error.message;
      dispatch(fetchFailure(message));
    }
  };
}
