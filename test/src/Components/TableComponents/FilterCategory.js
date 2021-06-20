import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	root: {
		width: 1350,
		marginBottom: 70,
		boxShadow: '7px 9px #f7efef',
		color: 'rgba(247, 240, 240, 0.925)',
		borderRadius: '7px'
	}
}));

function FilterCategory({ setFilterCategory }) {
	const [ inputCategory, setInputCategory ] = useState('');

	function getInput(event) {
		setInputCategory(event.target.value);
	}

	const classes = useStyles();

	return (
		<div className="filter-wrapper">
			<section className="filter">
				<TextField
					className="input"
					value={inputCategory}
					onChange={getInput}
					placeholder={'Search name'}
					variant="outlined"
				/>
				<SearchIcon
					className="buttons"
					onClick={() => setFilterCategory(inputCategory)}
					variant="contained"
					color="primary"
					style={{
						margin: '12px',
						width: '50px',
						height: '30px'
					}}
				/>
			</section>
		</div>
	);
}

export default FilterCategory;
