import React, { useContext } from 'react';
import firebase from '../../Config/Firebase';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthService';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import '../style.css';

const useStyles = makeStyles(() => ({
	button: {
		border: 0,
		background: 'linear-gradient(45deg, #6DAAAD 20%, #74C9B2 80%)',
		borderRadius: 3,
		boxShadow: '0 2px 3px 2px #6DAAAD',
		color: 'white',
		width: '120px',
		height: '30px',
		fontSize: '14px',
		marginTop: '10px',
		marginBottom: '40px', 
	}
}));

function NavBar() {
	const history = useHistory();

	const context = useContext(AuthContext);

	function handleLogOut() {
		firebase.auth().signOut().then(() => {
			context.logOut();
			history.push('/login');
		});
	}

	const classes = useStyles();

	return (
		<div className="wrapper">
			<h1 className="title">
				BREAKING BAD
			</h1>
			<Button className={classes.button} onClick={handleLogOut}>
				Log out
			</Button>
		</div>
	);
}

export default NavBar;
