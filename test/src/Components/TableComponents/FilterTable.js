import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, setName } from '../../Redux/data/dataActions';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SearchIcon from '@material-ui/icons/Search';
import { DateRange } from 'react-date-range';
import { makeStyles } from '@material-ui/core/styles';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../style.css';

const useStyles = makeStyles(() => ({
	filter: {
		display: 'flex',
		flexDirection: 'row',
		padding: '5px'
	},
	input: {
		width: '200px',
		height: '30px',
		margin: '5px'
	},
	searchIcon: {
		color: '#377867',
		width: '100px',
		height: '30px',
		marginTop: '5px',
		marginBottom: '5px',
		cursor: 'pointer'
	}, 
}));

function FilterTable({ setFilterCategory, selectDate, setSelectDate }) {
	const nameInput = useSelector((state) => state.data.nameInput);

	const [ inputName, setInputName ] = useState(nameInput);
	const [ inputCategory, setInputCategory ] = useState('');
	
	const dispatch = useDispatch();

	function handleSubmit(event) {
		dispatch(setName(inputName)); //update Reducer, name of the character
		dispatch(fetchData({ name: inputName }));
		setFilterCategory(inputCategory); //category input
		//setSelectDate(selectDate);
	}

	const classes = useStyles();

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
				<SearchIcon className={classes.searchIcon} onClick={(event) => handleSubmit(event)} />
			</section>
			<DateRange
				editableDateInputs={true}
				onChange={(item) => setSelectDate([ item.selection ])}
				moveRangeOnFirstSelection={false}
				ranges={selectDate}
				// startDate={selectDate.startDate}
				// endDate={selectDate.endDate}
			/>
		</div>
	);
}

export default FilterTable;
