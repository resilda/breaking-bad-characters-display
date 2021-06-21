import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, setName } from '../../Redux/data/dataActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DatesRange from './DatesRange';
import { makeStyles } from '@material-ui/core/styles';
import '../style.css';

const useStyles = makeStyles(() => ({
	filter: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '20px'
	},
	input: {
		width: '350px',
		padding: '10px'
	},
	button: {
		border: 0,
		background: 'linear-gradient(45deg, #6DAAAD 20%, #74C9B2 80%)',
		borderRadius: 3,
		boxShadow: '0 2px 3px 2px #6DAAAD',
		color: 'white',
		width: '120px',
		height: '30px',
		fontSize: '14px',
		marginTop: '10px',
		marginBottom: '40px'
	}
}));

function FilterTable({ setFilterCategory }) {
	const nameInput = useSelector((state) => state.data.nameInput);

	const [ inputName, setInputName ] = useState(nameInput);
	const [ inputCategory, setInputCategory ] = useState('');
	const [ inputStartDate, setInputStartDate ] = useState('');
	const [ inputEndDate, setInputEndDate ] = useState('');

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
				<TextField
					className={classes.input}
					value={inputName}
					onChange={(event) => setInputName(event.target.value)}
					placeholder={'Search name'}
					variant="standard"
				/>
				<TextField
					className={classes.input}
					value={inputCategory}
					onChange={(event) => setInputCategory(event.target.value)}
					placeholder={'Search category'}
					variant="standard"
				/>
				<Button className={classes.button} onClick={(event) => handleSubmit(event)}>
					Search
				</Button>
			</section>
			<DatesRange />
		</div>
	);
}

export default FilterTable;
