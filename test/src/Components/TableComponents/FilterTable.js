import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	fetchData,
	setCategory,
	setCharacterName,
	setRangeDate,
	resetFilterValues
} from '../../Redux/data/dataActions';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
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
	iconsMenu: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'space-between'
	},
	calendarIcon: {
		color: '#377867',
		width: '30px',
		height: '25px',
		marginTop: '3px',
		marginBottom: '5px',
		marginRight: '8px',
		marginLeft: '5px'
	},
	resetIcon: {
		color: '#377867',
		width: '30px',
		height: '28px',
		marginTop: '3px',
		marginBottom: '5px',
		marginRight: '5px',
		cursor: 'pointer'
	},
	searchIcon: {
		color: '#377867',
		width: '40px',
		height: '30px',
		marginTop: '3px',
		marginBottom: '5px',
		marginRight: '2px',
		cursor: 'pointer'
	}
}));

function FilterTable({ characterName, selectDate, setSelectDate, selectedRangeFilter }) {
	const [ inputName, setInputName ] = useState(characterName);
	const [ inputCategory, setInputCategory ] = useState('');
	const [ anchorEl, setAnchorEl ] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const classes = useStyles();
	const dispatch = useDispatch();

	function handleSubmit() {
		dispatch(setCharacterName(inputName)); //update Reducer
		dispatch(fetchData({ name: inputName }));
		dispatch(setCategory(inputCategory));
		selectedRangeFilter && dispatch(setRangeDate(selectedRangeFilter[0]));
	}

	function resetValues() {
		dispatch(resetFilterValues());
		dispatch(fetchData({ name: '' }));
		dispatch(setCategory(''));
		dispatch(setRangeDate({}));
		setInputName('');
		setInputCategory('');
		setSelectDate([
			{
				startDate: new Date(),
				endDate: new Date(),
				key: 'selection'
			}
		]);
	}

	return (
		<div>
			<section className={classes.filter}>
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
				<div className={classes.iconsMenu}>
					<div aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
						<DateRangeIcon className={classes.calendarIcon} />
					</div>
					<Menu
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem>
							<DateRange
								editableDateInputs={true}
								onChange={(item) => setSelectDate([ item.selection ])}
								moveRangeOnFirstSelection={false}
								ranges={selectDate}
							/>
						</MenuItem>
					</Menu>
					<RefreshIcon className={classes.resetIcon} onClick={() => resetValues()} />
					<SearchIcon className={classes.searchIcon} onClick={() => handleSubmit()} />
				</div>
			</section>
		</div>
	);
}

export default FilterTable;
