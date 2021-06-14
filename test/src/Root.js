import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from './Auth/AuthService';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Characters from './Components/Layout/Characters';
import Details from './Components/Details/Details';

function PrivateRoute({ children, refreshToken, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				refreshToken ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location }
						}}
					/>
				)}
		/>
	);
}

function PublicRoute({ children, refreshToken, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				!refreshToken ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/main',
							state: { from: location }
						}}
					/>
				)}
		/>
	);
}

function Root() {
	const context = useContext(AuthContext);
	return (
		<BrowserRouter>
			<Switch>
				<PublicRoute exact path="/" refreshToken={context.refreshToken}>
					<Register />
				</PublicRoute>

				<PublicRoute exact path="/login" refreshToken={context.refreshToken}>
					<Login />
				</PublicRoute>

				<PrivateRoute exact path="/main" refreshToken={context.refreshToken}>
					<Characters />
				</PrivateRoute>

				<Route>
					<Details exact path="/main/character" />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default Root;
