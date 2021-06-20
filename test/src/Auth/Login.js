import React, { useState, useContext } from 'react';
import firebase from '../Config/Firebase';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from './AuthService';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		backgroundColor: '#E8E8E8'
	},
	header: {
		fontFamily: 'Verndana',
		fontSize: '50px'
	},
	section: {
		height: '500px',
		width: '650px',
		backgroundColor: 'white',
		boxShadow: '2px 3px 3px 0.5px #F9ECCE'
	},
	title: {
		color: '#5F1F03',
		marginBottom: '45px',
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
		height: '45px',
		fontSize: '12px',
		margin: '20px'
	},
	firstButton: {
		border: 0,
		background: 'linear-gradient(45deg, #6DAAAD 20%, #74C9B2 80%)',
		borderRadius: 3,
		boxShadow: '0 2px 3px 2px #6DAAAD',
		color: 'white',
		width: '230px',
		height: '40px',
		fontSize: '14px',
		marginBottom: '40px'
	},
	secondButton: {
		border: 0,
		background: 'linear-gradient(45deg, #74C9B2 20%, #6DAAAD 80%)',
		borderRadius: 3,
		boxShadow: '0 2px 3px 2px #6DAAAD',
		color: 'white',
		width: '120px',
		height: '31px',
		fontSize: '14px',
		margin: '20px'
	},
	footer: {
		color: 'gray',
		fontSize: '12px',
		fontFamily: 'Monospace',
		marginTop: '20px'
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
				console.log('user', user);
				console.log('user.refreshToken', user.refreshToken);
			})
			.catch((error) => {
				setError(error);
			});
	}

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<h1 className={classes.header}>Movie Box Edition</h1>
			<section className={classes.section}>
				<h1 className={classes.title}>LOGIN</h1>
				{error && (
					<p className="error-message" style={{ color: 'red' }}>
						{error.message}
					</p>
				)}
				<form onSubmit={handleSubmit} className={classes.form}>
					<InputLabel position="flex-start">Email</InputLabel>
					<OutlinedInput
						id="email"
						value={email}
						type="text"
						required
						variant="outlined"
						onChange={(event) => setEmail(event.target.value)}
						className={classes.input}
					/>
					<InputLabel>Password</InputLabel>
					<OutlinedInput
						id="password"
						value={password}
						required
						variant="outlined"
						onChange={(event) => setPassword(event.target.value)}
						type={showPassword ? 'password' : 'text'}
						className={classes.input}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleShowPassword}
									onMouseDown={handleMouseDownPassword}
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
					/>
					<Button type="submit" className={classes.firstButton}>
						Login
					</Button>
				</form>
				<div>
					Don't have an account? {''}
					<Button className={classes.secondButton}>
						<Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
							Register
						</Link>
					</Button>
				</div>
			</section>
			<footer className={classes.footer}>Movie Box</footer>
		</div>
	);
}

export default Login;
