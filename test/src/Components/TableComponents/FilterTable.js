import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData, setCategory, setCharacterName, setRangeDate, resetFilterValues } from '../../Redux/data/dataActions';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
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
	iconsMenu: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between', 
		alignItems: 'space-between'
	},
	calendar: {
		height: '10px',
		margin: '10px',
		marginRight: '0'
	},
	calendarIcon: {
		color: '#377867',
		width: '30px',
		height: '25px',
		margin: '2px',
		marginRight: '2px'
	},
	searchIcon: {
		color: '#377867',
		width: '40px',
		height: '30px',
		marginTop: '5px',
		marginBottom: '5px',
		marginRight: '2px',
		cursor: 'pointer'
	}, 
}));

function FilterTable({ characterName, category, selectDate, setSelectDate, selectedRangeFilter }) {
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
		// dispatch(setCharacterName(''));
		// dispatch(setCategory(''))
		console.log('reset', dispatch(resetFilterValues()));
		setInputName('');
		setInputCategory('');
	}

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
				{/* <button onClick={() => resetValues()}>
					Reset
				</button> */}
			</section>
		</div>
	);
}

export default FilterTable;
