import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, setName } from '../../Redux/data/dataActions';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import FilterCategory from './FilterCategory';
import '../style.css';

function FilterName() {
	const nameInput = useSelector((state) => state.data.nameInput);

	const dispatch = useDispatch();

	const [searchName, setSearchName] = useState(nameInput);

	function handleChangeName(event) {
		setSearchName(event.target.value);
	}

	function handleSubmitName(event) {
		dispatch(setName(searchName));
		dispatch(fetchData({name: searchName}))
	}

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
				<SearchIcon 
					className="buttons"
					onClick={(event) => handleSubmitName(event)}
					variant="contained"
					color="primary"
					style={{
						margin: '12px',
						width: '50px',
						height: '30px',
					}}
				/>
			</section>
			<FilterCategory />
		</div>
	);
}

export default FilterName;
