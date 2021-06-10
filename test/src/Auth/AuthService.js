import React, { useState, createContext } from 'react';

//'store' to save the user's refreshToken
const AuthContext = createContext();

const REFRESH_TOKEN = 'refreshToken';
const USER = 'user';

const getInitialState = () => {
	const refreshToken = localStorage.getItem(REFRESH_TOKEN);
	const user = localStorage.getItem(USER);

	return { refreshToken, user };
};

function AuthProvider({ children }) {
	const initialState = getInitialState();
	const [ refreshToken, setRefreshToken ] = useState(initialState.refreshToken);
	const [ user, setUser ] = useState(initialState.user);

	//save token, update it to local storage
	function logIn(token, userData) {
		setRefreshToken(token);
		setUser(userData);
		localStorage.setItem(REFRESH_TOKEN, token);
		localStorage.setItem(USER, userData);
	}

	//remove token after logOut
	function logOut() {
		setRefreshToken(null);
		setUser(null);
		localStorage.removeItem(REFRESH_TOKEN);
		localStorage.removeItem(USER);
	}

	return (
		<AuthContext.Provider
			value={{
				refreshToken,
				user,
				logIn,
				logOut
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext, AuthProvider };
