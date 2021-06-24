import React, { useState, useContext } from 'react';
import firebase from '../Config/Firebase';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from './AuthService';
import Button from '@material-ui/core/Button';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import './styleAuth.css';

const useStyles = makeStyles({
	section: {
		height: '500px',
		width: '500px',
		backgroundColor: 'white',
		boxShadow: '2px 2px 2px 0.5px #F9ECCF'
	},
	title: {
		color: '#4A364B',
		marginTop: '43px',
		fontSize: '28px',
		fontWeight: 'bold'
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	input: {
		width: '230px',
		height: '52px',
		fontSize: '16px',
		margin: '15px'
	},
	error: {
		color: 'red'
	},
	firstButton: {
		border: 0,
		background: 'linear-gradient(45deg, #5C888B 20%, #71A8A1 80%)',
		borderRadius: 3,
		boxShadow: '0 1px 1px 1px #8ABAAC',
		color: 'white',
		width: '230px',
		height: '40px',
		fontSize: '14px',
		marginTop: '10px',
		marginBottom: '40px'
	},
	secondButton: {
		border: 0,
		background: 'linear-gradient(45deg, #5C888B 20%, #71A8A1 80%)',
		borderRadius: 3,
		boxShadow: '0 2px 3px 2px #8ABAAC',
		width: '120px',
		height: '31px',
		fontSize: '14px',
		margin: '25px'
	},
	link: {
		color: 'white',
		textDecoration: 'none'
	}
});

function Login() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ showPassword, setShowPassword ] = useState(false);
	const [ error, setError ] = useState(null);

	const context = useContext(AuthContext);

	const history = useHistory();

	function handleShowPassword() {
		setShowPassword(!showPassword);
	}

	function handleMouseDownPassword(event) {
		event.preventDefault();
	}

	function handleSubmit(event) {
		event.preventDefault();
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(({ user }) => {
				context.logIn(user.refreshToken, user);
				history.push('/main');
			})
			.catch((error) => {
				setError(error);
			});
	}

	const classes = useStyles();

	return (
		<div className="login-wrapper">
			<header className="header">Movie Box Edition</header>
			<section className={classes.section}>
				<h1 className={classes.title}>Login</h1>
				{error && <p className={classes.error}>{error.message}</p>}
				<form onSubmit={handleSubmit} className={classes.form}>
					<FilledInput
						id="email"
						label="Email"
						defaultValue="Email"
						value={email}
						placeholder="Email"
						type="text"
						required
						onChange={(event) => setEmail(event.target.value)}
						className={classes.input}
					/>
					<FilledInput
						id="password"
						label="Password"
						defaultValue="Password"
						value={password}
						placeholder="Password"
						required
						onChange={(event) => setPassword(event.target.value)}
						type={showPassword ? 'text' : 'password'}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleShowPassword}
									onMouseDown={handleMouseDownPassword}
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
						className={classes.input}
					/>
					<Button type="submit" className={classes.firstButton}>
						Login
					</Button>
				</form>
				<div>
					Don't have an account? {''}
					<Button className={classes.secondButton}>
						<Link to="/" className={classes.link}>
							Register
						</Link>
					</Button>
				</div>
			</section>
			<footer className="footer">
				<p>We care about your opinion, so we would like your contribution to our platform.</p>
				<h4>Contact us: movie_box@yahoo.com</h4>
			</footer>
		</div>
	);
}

export default Login;
