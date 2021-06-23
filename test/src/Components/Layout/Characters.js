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
		width: 1200,
		marginBottom: 70,
		boxShadow: '7px 9px #f7efef',
		color: 'rgba(247, 240, 240, 0.925)',
		borderRadius: '7px'
	}
}));

function Characters() {
	const [ order, setOrder ] = useState('desc');
	const [ orderBy, setOrderBy ] = useState('name');
	const [ selected, setSelected ] = useState(null);
	const [ selectDate, setSelectDate ] = useState([
		{
			startDate: new Date(),
			endDate: null,
			key: 'selection'
		}
	]);
	const [ selectedRangeFilter, setSelectedRangeFilter ] = useState(null);

	// const [ orderByBirthday, setOrderByBirthday ] = useState('birthday');
	// const [ birthdayDate, setBirthdayDate ] = useState([]);

	const [ filterCategory, setFilterCategory ] = useState('');
	//const [ filterDate, setFilterDate ] = useState('');

	const loading = useSelector((state) => state.data.loading);
	const error = useSelector((state) => state.data.error);
	const info = useSelector((state) => state.data.info);

	const limitPerPage = useSelector((state) => state.data.limitPerPage);

	// const getBirthdayDate = info.map((el) => {
	// 	return el.birthday;
	// });

	// const sortBirthday = getBirthdayDate.sort(
	// 	(x, y) => new Date(...x.birthday.split('-').reverse()) - new Date(...y.birthday.split('-').reverse())
	// );

	//console.log('demo', getBirthdayDate);

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

	//FILTER CATEGORY

	function filterTableByCategory() {
		if (!filterCategory) {
			return info;
		}
		const newTableList = [ ...info ].filter((item) => {
			return item.category.toLowerCase().includes(filterCategory.toLowerCase());
		});
		return newTableList;
	}

	function filterSelectedBirthday(filteredList) {
		if (!selectedRangeFilter) {
			return filteredList;
		}
		const minimumDate = selectedRangeFilter[0].startDate;
		const maximumDate = selectedRangeFilter[0].endDate;

		const newTableList = [ ...filteredList ].filter((item) => {
			const birthdayDate = new Date(item.birthday);
			const isValidDate = isNaN(birthdayDate.getTime());
			if (isValidDate) {
				return false;
			}
			return birthdayDate.getTime() > minimumDate.getTime() && birthdayDate.getTime() < maximumDate.getTime();
		});
		return newTableList;
	}

	const generalFilter = filterTableByCategory();
	const filteredBirthday = filterSelectedBirthday(generalFilter);
	const tableList = sortTableByOrder(filteredBirthday);

	const classes = useStyles();

	return (
		<div className="main-wrapper">
			<NavBar
				setFilterCategory={setFilterCategory}
				selectDate={selectDate}
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
								<AllCharacters detail={detail} selected={selected} setSelected={setSelected} />
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
