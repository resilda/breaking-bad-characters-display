import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, setNameCategory } from '../../Redux/data/dataActions';
import { TextField, Button } from '@material-ui/core';
import '../style.css';

function FilterNameCategory() {
	// const name = useSelector((state) => state.data.name);
	const nameInput = useSelector((state) => state.data.nameInput);
	const category = useSelector((state) => state.data.category);

	const [searchName, setSearchName] = useState(nameInput);
	const [searchCategory, setSearchCategory] = useState(category)
	const dispatch = useDispatch();

	function handleChange(event) {
		setSearchCategory(event.target.value);
		setSearchName(event.target.value);
	}

	function handleSubmit(event) {
		dispatch(setNameCategory(searchName, searchCategory));
		dispatch(fetchData({name: searchName, category: searchCategory}))
	}

	return (
		<div>
			<label>
				<TextField
					className="input"
					value={searchCategory}
					onChange={handleChange}
					placeholder={'Search category'}
				/>
				<Button onClick={(event) => handleSubmit(event)}>Search</Button>
			</label>
		</div>
	);
}

export default FilterNameCategory;
