import React, { useEffect, useContext } from 'react';
import firebase from '../Config/Firebase';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchData } from '../Redux/data/dataActions';
import { AuthContext } from '../Auth/AuthService';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableHead from '@material-ui/core/TableHead';
import TableHeader from './TableHeader';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import AllCharacters from './AllCharacters';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from './Pagination';
import FilterName from './FilterName';
import FilterNameCategory from './FilterNameCategory';

const useStyles = makeStyles((theme) => ({
	root: {
		width: 1350,
		marginBottom: 70
	}
}));

const Characters = () => {
	const loading = useSelector((state) => state.data.loading);
	const error = useSelector((state) => state.data.error);
	const info = useSelector((state) => state.data.info);

	const limitPerPage = useSelector((state) => state.data.limitPerPage);

	const dispatch = useDispatch();

	const history = useHistory();

	//use the context created in "AuthService.js" file, to remove the token in case of logOut
	const context = useContext(AuthContext);

	const classes = useStyles();

	useEffect(
		() => {
			dispatch(fetchData({ limit: limitPerPage, offset: 0 }));
		},
		[ dispatch, limitPerPage ]
	);

	const handleLogOut = () => {
		firebase.auth().signOut().then(() => {
			context.logOut();
			history.push('/login');
		});
	};

	return (
		<div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'flex-start',
					margin: '30px'
				}}
			>
				<h1
					style={{
						color: 'rebeccapurple',
						fontSize: '28px',
						//marginLeft: '190px'
						marginLeft: '15px'
					}}
				>
					BREAKING BAD
				</h1>
				<Button
					onClick={handleLogOut}
					variant="contained"
					color="secondary"
					style={{
						marginRight: '19px'
					}}
				>
					Log out
				</Button>
			</div>
			<div>
				<FilterName />
				<FilterNameCategory />
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-around',
					alignItems: 'center'
				}}
			>
				<Paper
					className={classes.root}
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-around',
						alignItems: 'center'
					}}
				>
					{loading && <CircularProgress />}

					{error && <div>{error} </div>}

					<Table className={classes.table}>
						<TableHead>
							<TableHeader />
						</TableHead>
						{info.map((detail) => (
							<TableBody key={detail.char_id}>
								<AllCharacters detail={detail} />
							</TableBody>
						))}
						<TableFooter>
							<Pagination info={info} />
						</TableFooter>
					</Table>
				</Paper>
			</div>
		</div>
	);
};

export default Characters;
