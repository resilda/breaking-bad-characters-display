import React, { useState, useContext } from 'react';
import firebase from '../Config/Firebase';
import { useHistory, Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { AuthContext } from './AuthService';

function Login() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ error, setError ] = useState(null);

	const context = useContext(AuthContext);

	const history = useHistory();

	function handleSubmit(event) {
		event.preventDefault();
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(({ user }) => {
				context.logIn(user.refreshToken);
				context.logIn(user);
				history.push('/main');
				console.log('user', user); 
				console.log('user.refreshToken', user.refreshToken);
			})
			.catch((error) => {
				setError(error);
			});
	}

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-around',
				alignItems: 'center',
				flexDirection: 'column',
				marginTop: '200px'
			}}
		>
			<h1
				style={{
					color: 'rebeccapurple',
					marginBottom: '30px',
					fontSize: '28px'
				}}
			>
				LOGIN
			</h1>
			{error && (
				<p className="error-message" style={{ color: 'red' }}>
					{error.message}
				</p>
			)}
			<form
				onSubmit={handleSubmit}
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<TextField
					label="Email"
					variant="filled"
					id="email"
					value={email}
					type="text"
					required
					onChange={(e) => setEmail(e.target.value)}
					style={{ fontSize: '12px', marginBottom: '10px' }}
				/>
				<TextField
					label="Password"
					variant="filled"
					id="password"
					value={password}
					type="password"
					required
					onChange={(e) => setPassword(e.target.value)}
					style={{ fontSize: '12px' }}
				/>
				<Button
					type="submit"
					variant="contained"
					color="secondary"
					style={{
						width: '130px',
						height: '35px',
						fontSize: '14px',
						marginTop: '20px'
					}}
				>
					Login in
				</Button>
			</form>
			<div style={{ margin: '30px 20px' }}>
				Don't have an account? {''}
				<Button
					variant="contained"
					color="primary"
					style={{
						width: '130px',
						height: '35px',
						fontSize: '14px',
						padding: '6px'
					}}
				>
					<Link to="/" style={{ color: 'white', fontSize: '12px' }}>
						Register
					</Link>
				</Button>
			</div>
		</div>
	);
}

export default Login;
