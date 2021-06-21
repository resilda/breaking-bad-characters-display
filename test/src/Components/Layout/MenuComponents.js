import React, { useContext } from 'react';
import firebase from '../../Config/Firebase';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthService';
import { Button } from '@material-ui/core';

function MenuComponents() {
    const history = useHistory();

	const context = useContext(AuthContext);

	function handleLogOut() {
		firebase.auth().signOut().then(() => {
			context.logOut();
			history.push('/login');
		});
	}

	return (
		<div className="wrapper">
			<Button
				className="button-log-out"
				onClick={handleLogOut}
				variant="contained"
				color="secondary"
				style={{
					margin: '19px 19px',
					width: '30px',
					height: '35px',
				}}
			>
				Log out
			</Button>
		</div>
    )
}

export default MenuComponents;