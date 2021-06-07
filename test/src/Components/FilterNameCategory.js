import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, setNameCategory } from '../Redux/data/dataActions';
import './style.css';

const FilterNameCategory = () => {
	const name = useSelector((state) => state.data.name);
	const category = useSelector((state) => state.data.category)

	const dispatch = useDispatch();

	const handleChange = (event, name, category) => {
		dispatch(setNameCategory(event.target.value));
		dispatch(fetchData({ name: event.target.value, category: event.target.value }));
	};

	return (
		<div>
			<label>
				<input
					className="input"
					value={name}
					onChange={(event) => handleChange(event, name, category)}
					placeholder={'Search name and category'}
				/>
			</label>
		</div>
	);
};

export default FilterNameCategory;
