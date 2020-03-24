import { combineReducers } from "redux";

const profileReducer = (state = { username: null }, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, ...action.payload };
    case "SIGN_OUT":
      return { ...state, username: null };
    default:
      return state;
  }
};

export default combineReducers({
  profileReducer
});
