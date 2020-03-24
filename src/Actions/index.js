export const signIn = userDetails => {
  return {
    type: "SIGN_IN",
    payload: userDetails// { "username": null }
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT"
  };
};
