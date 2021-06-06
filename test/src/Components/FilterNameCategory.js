import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, setNameCategory } from '../Redux/data/dataActions';

const FilterNameCategory = () => {
	const name = useSelector((state) => state.data.name);
	const category = useSelector((state) => state.data.category);

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
					onChange={handleChange}
					placeholder={'Search name'}
					style={{
						width: '500px',
						height: '30px',
						margin: '20px 40px',
						display: 'flex',
						alignContent: 'flex-start'
					}}
				/>
			</label>
		</div>
	);
};

export default FilterNameCategory;
