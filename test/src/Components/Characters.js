import React, { useEffect, useContext } from 'react';
import firebase from '../Config/Firebase';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchData } from '../Redux/data/dataActions';
//import OneCharacter from './OneCharacter';
import { Button } from '@material-ui/core';
import { AuthContext } from '../Auth/AuthService';

const Characters = ({ data, fetchData }) => {
	useEffect(
		() => {
			fetchData();
		},
		[ fetchData ]
	);

	const history = useHistory();

	//use the context created in "AuthService.js" file, to remove the token in case of logOut
	const context = useContext(AuthContext);

	const handleLogOut = () => {
		firebase.auth().signOut().then(() => {
			context.logOut();
			history.push('/login');
		});
	};

	return (
		<div>
			<h1 style={{ color: 'rebeccapurple' }}>CHARACTERS PAGE</h1>
			<Button onClick={handleLogOut} variant="contained" color="secondary" style={{ marginTop: '10px' }}>
				Log out
			</Button>
			{/* {data.loading ? (
                <h4>Loading...</h4>
            ) : data.error ? (
                <h4>{data.error}</h4>
            ) : (
                data.map((detail) => (
                    <div key={detail.id}> 
                        <OneCharacter detail={detail}/>
                    </div>
                ))
            )} */}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		data: state.data.data
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchData: (infoID) => dispatch(fetchData(infoID))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Characters);
