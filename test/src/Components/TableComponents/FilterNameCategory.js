import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, setNameCategory } from '../../Redux/data/dataActions';
import '../style.css';

const FilterNameCategory = () => {
	const name = useSelector((state) => state.data.name);
	const category = useSelector((state) => state.data.category);

	const dispatch = useDispatch();

	const handleChange = (event) => {
		dispatch(setNameCategory(event.target.value));
		dispatch(fetchData({ name, category: event.target.value }));
	};

	return (
		<div>
			<label>
				<input
					className="input"
					value={category}
					onChange={(event) => handleChange(event, category)}
					placeholder={'Search category'}
				/>
			</label>
		</div>
	);
};

export default FilterNameCategory;
