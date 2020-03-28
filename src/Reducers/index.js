import { combineReducers } from "redux";

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, ...action.payload };
    case "SIGN_OUT":
      return { ...state, username: null };
    default:
      return state;
  }
};

const locationReducer = (
  state = { latitude: null, longitude: null },
  action
) => {
  switch (action.type) {
    case "UPDATE_LOCATION":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  profileReducer,
  locationReducer
});
