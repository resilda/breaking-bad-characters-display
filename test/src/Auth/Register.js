import React, { useState } from 'react';
import firebase from '../Config/Firebase';
import { useHistory, Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

function Register() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ username, setUsername ] = useState('');
	const [ error, setError ] = useState(null);

	const history = useHistory();

	function handleSubmit(event) {
		event.preventDefault();
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				const user = firebase.auth().currentUser;
				user
					.updateProfile({ displayName: username })
					.then(() => {
						history.push('/main');
					})
					.catch((error) => {
						setError(error);
					});
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
				REGISTER
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
					label="Username"
					variant="filled"
					id="username"
					value={username}
					type="text"
					required
					onChange={(e) => setUsername(e.target.value)}
					style={{ fontSize: '12px', marginBottom: '10px' }}
				/>
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
					Register
				</Button>
			</form>
			<div style={{ margin: '30px 20px', fontSize: '13px' }}>
				Already have an account? {''}
				<Button
					variant="contained"
					color="primary"
					style={{
						width: '130px',
						height: '35px',
						fontSize: '14px',
						marginTop: '10px'
					}}
				>
					<Link to="/login" style={{ color: 'white', fontSize: '12px' }}>
						Login
					</Link>
				</Button>
			</div>
		</div>
	);
}

export default Register;
