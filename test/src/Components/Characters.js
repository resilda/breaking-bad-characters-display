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
import Pagination from './Pagination';
import FilterName from './FilterName';
import FilterNameCategory from './FilterNameCategory';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './style.css';

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
	const nameInput = useSelector((state) => state.data.nameInput);
	const name = useSelector((state) => state.data.name);
	const category = useSelector((state) => state.data.category);

	const dispatch = useDispatch();
	const history = useHistory();

	//use the context created in "AuthService.js" file, to remove the token in case of logOut
	const context = useContext(AuthContext);

	const classes = useStyles();

	useEffect(
		() => {
			dispatch(fetchData({ limit: limitPerPage, offset: 0, nameInput, name, category }));
		},
		[ dispatch, limitPerPage, nameInput, name, category ]
	);

	const handleLogOut = () => {
		firebase.auth().signOut().then(() => {
			context.logOut();
			history.push('/login');
		});
	};

	return (
		<div>
			<div className="wrapper">
				<h1 className="title">
					BREAKING BAD
				</h1>
				<Button
					onClick={handleLogOut}
					variant="contained"
					color="secondary"
					style={{
						margin: '19px 19px',
						width: '100px',
						height: '40px'
					}}
				>
					Log out
				</Button>
			</div>
			<div>
				<FilterName />
				<FilterNameCategory />
			</div>
			<div className="table-wrapper">
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
