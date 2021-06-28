import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData, setCategory, setCharacterName, setFilters, setRangeDate } from '../../Redux/data/dataActions';
import { filterTableByCategory, filterSelectedBirthday } from '../../Utils/helpers';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { makeStyles } from '@material-ui/core/styles';
import '../style.css';

const useStyles = makeStyles(() => ({
	filter: {
		display: 'flex',
		flexDirection: 'row',
		padding: '5px'
	},
	input: {
		width: '170px',
		height: '26px',
		margin: '5px'
	},
	calendar: {
		height: '10px',
		margin: '10px',
		marginRight: '0'
	},
	calendarIcon: {
		width: '30px',
		height: '20px',
		margin: '2px',
		marginRight: '2px'
	},
	searchIcon: {
		color: '#377867',
		width: '40px',
		height: '27px',
		marginTop: '5px',
		marginBottom: '5px',
		cursor: 'pointer'
	}
}));

function FilterTable({ filteredItems, characterName, category, selectDate, setSelectDate, selectedRangeFilter }) {
	const [ inputName, setInputName ] = useState(characterName);
	const [ inputCategory, setInputCategory ] = useState('');
	const [ anchorEl, setAnchorEl ] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const dispatch = useDispatch();

	function handleSubmit() {
		// let filteredList = [ ...filteredItems ];
		// if (!!selectedRangeFilter) {
		// 	console.log('selectDate', selectDate);
		// 	filteredList = filterSelectedBirthday(filteredItems, selectDate);
		// }
		// filteredList = filterTableByCategory(filteredList, inputCategory);
		dispatch(setCharacterName(inputName)); //update Reducer
		dispatch(fetchData({ name: inputName }));
		dispatch(setCategory(inputCategory));
		selectedRangeFilter && dispatch(setRangeDate(selectedRangeFilter[0]));
		//dispatch(setFilters(filteredList));
	}

	const classes = useStyles();

	return (
		<div>
			<section className={classes.filter}>
				<Button
					aria-controls="simple-menu"
					aria-haspopup="true"
					onClick={handleClick}
					className={classes.calendar}
				>
					<DateRangeIcon className={classes.calendarIcon} />
				</Button>
				<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
					<MenuItem>
						<DateRange
							editableDateInputs={true}
							onChange={(item) => setSelectDate([ item.selection ])}
							moveRangeOnFirstSelection={false}
							ranges={selectDate}
						/>
					</MenuItem>
				</Menu>
				<OutlinedInput
					className={classes.input}
					value={inputName}
					onChange={(event) => setInputName(event.target.value)}
					placeholder={'Search name'}
				/>
				<OutlinedInput
					className={classes.input}
					value={inputCategory}
					onChange={(event) => setInputCategory(event.target.value)}
					placeholder={'Search category'}
				/>
				<SearchIcon className={classes.searchIcon} onClick={() => handleSubmit()} />
			</section>
		</div>
	);
}

export default FilterTable;
