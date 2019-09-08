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

const testResults = (results = {}, action) => {
  switch(action.type) {
    case "SAVE_TEST_RESULT": {
      return {
        ...results,
        [action.payload.id]: action.payload.data,
      };
    }

    default:
      return results;
  }
}

const previewResults = (results = {}, action) => {
  switch(action.type) {
    case "SAVE_RESULTS_PREVIEW": {
      return {
        ...results,
        [action.payload.id]: action.payload.data,
      };
    }

    default:
      return results;
  }
}

export default combineReducers({authStatus, displayMode, user, testResults, previewResults});