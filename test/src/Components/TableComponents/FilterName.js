import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, setName } from '../../Redux/data/dataActions';
//import FilterNameCategory from './FilterNameCategory';
import { TextField, Button } from '@material-ui/core';
import '../style.css';

function FilterName() {
	const nameInput = useSelector((state) => state.data.nameInput);

	const dispatch = useDispatch();

	const [searchName, setSearchName] = useState(nameInput);
	//const [searchCategory, setSearchCategory] = useState(category)

	function handleChangeName(event) {
		setSearchName(event.target.value);
	}

	function handleSubmitName(event) {
		dispatch(setName(searchName));
		dispatch(fetchData({name: searchName}))
	}

	//const category = useSelector((state) => state.data.category);
	//const [searchCategory, setSearchCategory] = useState(category)
	// const nameForCategory = searchName;

	// function handleChangeCategory(event) {
	// 	setSearchCategory(event.target.value);
	// }

	// function handleSubmitNameAndCategory(event) {
	// 	dispatch(setNameCategory(nameForCategory, searchCategory));
	// 	dispatch(fetchData({name: nameForCategory, category: searchCategory}))
	// }

	return (
		<div className="filter-wrapper">
			<section className="filter">
				<TextField
					className="input"
					value={searchName}
					onChange={handleChangeName}
					placeholder={'Search name'}
					variant="outlined"
				/>
				<Button 
					onClick={(event) => handleSubmitName(event)}
					variant="contained"
					color="primary"
					style={{
						margin: '19px 19px',
						width: '90px',
						height: '30px',
					}}
				>Search</Button>
				{/* <FilterNameCategory nameInput={nameInput}/> */}
			</section>
			{/* <section className="filter">
				<TextField
					className="input"
					value={searchCategory}
					onChange={handleChangeCategory}
					placeholder={'Search category'}
					variant="outlined"
				/>
				<Button 
					onClick={(event) => handleSubmitNameAndCategory(event)}
					variant="contained"
					color="primary"
					style={{
					margin: '19px 19px',
					width: '90px',
					height: '30px',
				}}
					>Search</Button>
			</section> */}
		</div>
	);
}

export default FilterName;
