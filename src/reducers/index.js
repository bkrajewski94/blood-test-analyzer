import { combineReducers } from "redux";

const authStatus = (isAuthenticated = false, action) => {
  switch (action.type) {
    case "SIGN_IN": {
      return true;
    }
    case "SIGN_OUT": {
      return false;
    }
    default:  //to turn off console warning
  }
  return isAuthenticated
};

export default combineReducers({authStatus: authStatus});