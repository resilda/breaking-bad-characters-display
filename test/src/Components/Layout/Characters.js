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
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import '../style.css';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: 1500,
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

	const characterName = useSelector((state) => state.data.filters.characterName);
	const category = useSelector((state) => state.data.filters.category);
	const startDate = useSelector((state) => state.data.filters.startDate);
	const endDate = useSelector((state) => state.data.filters.endDate);
	const filteredCharacters = useSelector((state) => state.data.filteredCharacters);

	const [ selectedRow, setSelectedRow ] = useState(null);
	const [ order, setOrder ] = useState('desc');
	const [ orderBy, setOrderBy ] = useState('name');
	const [ filterCategory, setFilterCategory ] = useState(category);
	//const [ selectedRangeFilter, setSelectedRangeFilter ] = useState(null);

	//*****i bera te ndara kto te selectDate, SORT BIRTHDAY, BUTONI DOWNLOAD, PDF, LOG OUT TEK DETAILS, DHE DESIGN I COM TEK DETAILS, AUTHS NE REDUX
	const [ selectStartDate, setSelectStartDate ] = useState(null);
	const [ selectEndDate, setSelectEndDate ] = useState(null)
	const [ selectDate, setSelectDate ] = useState([
		{
			startDate: startDate,
			endDate: endDate,
			key: 'selection'
		}
	]);

	//is from redux
	const [ filteredTable, setFilteredTable ] = useState(filteredCharacters);

	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(fetchData({ limit: limitPerPage, offset: 0 }));
		},
		[ dispatch, limitPerPage ]
	);

	//SORT TABLE

	function ascendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return 1;
		}
		if (b[orderBy] > a[orderBy]) {
			return -1;
		}
		return 0;
	}

	function descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (b[orderBy] > a[orderBy]) {
			return 1;
		}
		return 0;
	}

	function sortTableByOrder(list) {
		const newTableList = [ ...list ];
		newTableList.sort((a, b) => {
			if (order === 'asc') {
				return ascendingComparator(a, b, orderBy);
			}
			return descendingComparator(a, b, orderBy);
		});
		return newTableList;
	}
 
	//FILTER TABLE

	function filterTableByCategory(filteredList) {
		if (!filterCategory) {
			return filteredList;
		}
		const filteredTable = [ ...filteredList ].filter((item) => {
			return item.category.toLowerCase().includes(filterCategory.toLowerCase());
		});
		return filteredTable;
	}

	function filterSelectedBirthday() {
		if (!selectStartDate && !selectEndDate) {
			return info;
		}
		const minimumDate = selectDate[0].startDate;
		const maximumDate = selectDate[0].endDate;

		const filteredTable = [ ...info ].filter((item) => {
			const birthdayDate = new Date(item.birthday);
			const isValidDate = isNaN(birthdayDate.getTime());
			if (isValidDate) {
				return false;
			}
			return birthdayDate.getTime() > minimumDate.getTime() && birthdayDate.getTime() < maximumDate.getTime();
		});
		return filteredTable;
	}

	const filteredBirthday = filterSelectedBirthday();
	const generalFilter = filterTableByCategory(filteredBirthday);
	const tableList = sortTableByOrder(generalFilter);

	const classes = useStyles();

	return (
		<div className="main-wrapper">
			<NavBar
				characterName={characterName}
				setFilterCategory={setFilterCategory}
				selectDate={selectDate}
				setSelectDate={(selectStart, selectEnd ) => {
					setSelectDate(selectStart, selectEnd);
					setSelectStartDate(selectStart);
					setSelectEndDate(selectEnd)
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
								<AllCharacters detail={detail} selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
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
