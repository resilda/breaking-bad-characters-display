import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../../Redux/data/dataActions';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import NavBar from './Navbar';
import HeaderCharacters from './HeaderCharacters';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import AllCharacters from './AllCharacters';
import Pagination from '../TableComponents/Pagination';
import FilterName from '../TableComponents/FilterName';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import '../style.css';

const useStyles = makeStyles(() => ({
	root: {
		width: 1350,
		marginBottom: 70,
		boxShadow: '7px 9px #f7efef',
		color: 'rgba(247, 240, 240, 0.925)',
		borderRadius: '7px'
	}
}));

function Characters() {
	const loading = useSelector((state) => state.data.loading);
	const error = useSelector((state) => state.data.error);
	const info = useSelector((state) => state.data.info);

	const limitPerPage = useSelector((state) => state.data.limitPerPage);

	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(fetchData({ limit: limitPerPage, offset: 0 }));
		},
		[ dispatch, limitPerPage ]
	);

	const classes = useStyles();

	return (
		<div>
			<NavBar />
			<div>
				<FilterName />
			</div>
			<div className="table-wrapper">
				{loading && <CircularProgress />}

				{error && <div>{error} </div>}

				<Paper
					className={classes.root}
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-around',
						alignItems: 'center'
					}}
				>
					<Table className={classes.table}>
						<TableHead>
							<HeaderCharacters />
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
}

export default Characters;
