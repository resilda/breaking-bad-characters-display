import * as actionTypes from "./dataTypes";

const initialState = {
  loading: false,
  info: [],
  error: "",
  charactersLimit: 10,
  offset: 0,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_DATA_SUCCESS:
      //const infoPagination = state.charactersLimit;
      return {
        ...state,
        loading: false,
        info: action.payload.info,
        charactersLimit: action.payload.limit,
        offset: action.payload.offset,
        error: "",
      };
    case actionTypes.FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        info: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
