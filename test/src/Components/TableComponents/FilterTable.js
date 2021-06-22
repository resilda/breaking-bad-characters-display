import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, setName } from '../../Redux/data/dataActions';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SearchIcon from '@material-ui/icons/Search';
//import DatesRange from './DatesRange';
import { makeStyles } from '@material-ui/core/styles';
import '../style.css';

const useStyles = makeStyles(() => ({
	filter: {
		display: 'flex',
		flexDirection: 'row',
		padding: '15px',
	},
	input: {
		width: '230px',
		height: '33px',
		margin: '10px'
	},
	searchIcon: {
		color: '#377867',
		width: '120px',
		height: '33px',
		marginTop: '10px',
		marginBottom: '10px'
	}
}));

function FilterTable({ setFilterCategory }) {
	const nameInput = useSelector((state) => state.data.nameInput);

	const [ inputName, setInputName ] = useState(nameInput);
	const [ inputCategory, setInputCategory ] = useState('');
	
	const dispatch = useDispatch();

	function handleSubmit(event) {
		dispatch(setName(inputName)); //update Reducer, name of the character
		dispatch(fetchData({ name: inputName }));
		setFilterCategory(inputCategory); //category input
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
			{/* <DatesRange /> */}
		</div>
	);
}

export default FilterTable;
