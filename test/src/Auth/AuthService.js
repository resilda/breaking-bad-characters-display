import React, { useState, createContext } from "react";

//kinda like a store to save the token of the user and provide it into different screens
const AuthContext = createContext();

const REFRESH_TOKEN = "refreshToken";

//create an initialState to get the users's token
const getInitialState = () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  //return it as an 'object' in case we need to store more data of the user
  return { refreshToken };
};

const AuthProvider = ({ children }) => {
  const initialState = getInitialState();
  const [refreshToken, setRefreshToken] = useState(initialState.refreshToken);

  //save the token, update it to local storage
  const logIn = (token) => {
    setRefreshToken(token);
    localStorage.setItem(REFRESH_TOKEN, token);
  };

  //remove token after logOut
  const logOut = () => {
    setRefreshToken(null);
    localStorage.removeItem(REFRESH_TOKEN);
  };

  //the values we need to pass to the "children" from this "parent" component
  return (
    <AuthContext.Provider
      value={{
        refreshToken,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
