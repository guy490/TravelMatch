export const signIn = (userDetails) => {
  console.log(userDetails);
  return {
    type: "SIGN_IN",
    payload: userDetails,
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
