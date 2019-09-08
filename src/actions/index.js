export const signIn = () => {
  return {
    type: "SIGN_IN"
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT"
  };
};

export const setDisplayMobile = () => {
  return {
    type: "MOBILE"
  };
};

export const setDisplayDesktop = () => {
  return {
    type: "DESKTOP"
  };
};

export const setUserInfo = data => {
  return {
    type: "SET_USER_INFO",
    data: data
  };
};

export const saveTestResult = (id, data) => ({
  type: "SAVE_TEST_RESULT",
  payload: { id, data }
});

export const saveResultsPreview = (id, data) => ({
  type: "SAVE_RESULTS_PREVIEW",
  payload: { id, data }
});
