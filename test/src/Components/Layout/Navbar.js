import React, { useContext } from 'react';
import firebase from '../../Config/Firebase';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthService';
import { Button } from '@material-ui/core';
import '../style.css';

function NavBar() {
	const history = useHistory();

	const context = useContext(AuthContext);

	function handleLogOut() {
		firebase.auth().signOut().then(() => {
			context.logOut();
			history.push('/login');
		});
	}

	//https://www.merchandisingplaza.co.uk/194504/3/Money-Boxes-Breaking-Bad-Breaking-Bad-Money-Bank---Bookend-BrBa-Logo-l.jpg

	return (
		<div className="wrapper">
			{/* <img
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4hN8ruOHxnJoQsrP8ucbnHHW_8f5bOnVnGIcXSS8_2TiHlqkxeuf2rLSuwTui9KuayTId5z3JEr32Gw&usqp=CAU"
				alt="logo"
				width="90px"
				height="60px"
			/> */}
			<Button
				className="button-log-out"
				onClick={handleLogOut}
				variant="contained"
				color="default"
				style={{
					margin: '19px 19px',
					width: '100px',
					height: '35px',
					color: 'brown',
					fontWeight: 'bold'
				}}
			>
				Log out
			</Button>
		</div>
	);
}

export default NavBar;
