export const signIn = (userDetails) => {
  return {
    type: "SIGN_IN",
    payload: userDetails, // { "username": null }
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const updateLocation = (location) => {
  return {
    type: "UPDATE_LOCATION",
    payload: location,
  };
};
