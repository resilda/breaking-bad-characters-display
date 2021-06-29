import React, { useState, useEffect } from 'react';
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
import { filterAll } from '../../Utils/helpers';
import CircularProgress from '@material-ui/core/CircularProgress';
import { sortTableByOrder } from '../../Utils/helpers';
import { makeStyles } from '@material-ui/core/styles';
import '../style.css';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: 1200,
		marginBottom: 70,
		boxShadow: '7px 9px #f7efef',
		color: 'rgba(247, 240, 240, 0.925)',
		borderRadius: '7px'
	}
}));

function Characters() {
	const loading = useSelector((state) => state.data.loading); //fetching data
	const error = useSelector((state) => state.data.error);
	const info = useSelector((state) => state.data.info);

	const limitPerPage = useSelector((state) => state.data.limitPerPage); //character limit per page

	const characterName = useSelector((state) => state.data.filters.characterName); //filter components
	const category = useSelector((state) => state.data.filters.category);
	const startDate = useSelector((state) => state.data.filters.startDate);
	const endDate = useSelector((state) => state.data.filters.endDate);

	const [ selectedRow, setSelectedRow ] = useState(null);
	const [ order, setOrder ] = useState('desc'); //sorting hooks
	const [ orderBy, setOrderBy ] = useState('name');
	const [ selectedRangeFilter, setSelectedRangeFilter ] = useState(null); //filter hooks
	const [ selectDate, setSelectDate ] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection'
		}
	]);

	const dispatch = useDispatch();
	const classes = useStyles();

	useEffect(
		() => {
			dispatch(fetchData({ limit: limitPerPage, offset: 0 }));
		},
		[ dispatch, limitPerPage ]
	);

	const filteredCharacters = filterAll(info, { startDate, endDate }, category);
	const tableList = sortTableByOrder(filteredCharacters, order, orderBy);

	return (
		<div className="main-wrapper">
			<NavBar
				filteredItems={filteredCharacters}
				characterName={characterName}
				category={category}
				selectDate={selectDate}
				selectedRangeFilter={selectedRangeFilter}
				setSelectDate={(newSelectedDate) => {
					setSelectDate(newSelectedDate);
					setSelectedRangeFilter(newSelectedDate);
				}}
			/>
			<h1 className="title">Breaking Bad</h1>
			<div className="table-wrapper">
				{loading && <CircularProgress />}
				{error && <div>{error} </div>}
				<Paper className={classes.root}>
					<Table className={classes.table}>
						<TableHead>
							<HeaderCharacters
								order={order}
								orderBy={orderBy}
								setOrder={setOrder}
								setOrderBy={setOrderBy}
							/>
						</TableHead>
						{tableList.map((detail) => (
							<TableBody key={detail.char_id}>
								<AllCharacters
									detail={detail}
									selectedRow={selectedRow}
									setSelectedRow={setSelectedRow}
								/>
							</TableBody>
						))}
						<TableFooter>
							<Pagination />
						</TableFooter>
					</Table>
				</Paper>
			</div>
		</div>
	);
}

export default Characters;
