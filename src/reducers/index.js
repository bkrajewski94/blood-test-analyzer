import { combineReducers } from "redux";
import { theme } from "../utils/theme";

const getDisplay = () => {
  if (window.innerWidth <= theme.desktopWidth) { 
    return "mobile";
  } else {
    return "desktop";
  }
}

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
  return isAuthenticated;
};

const displayMode = (currentDisplayMode = getDisplay(), action) => {
  switch (action.type) {
    case "MOBILE": {
      return "mobile";
    }
    case "DESKTOP": {
      return "desktop";
    }
    default:  //to turn off console warning
  }
  return currentDisplayMode;
}

const user = (data = {}, action) => {
  if(action.type === "SET_USER_INFO") {
    return action.data
  }
  return data
}


export default combineReducers({authStatus: authStatus, displayMode: displayMode, user: user});