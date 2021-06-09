import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, setName } from '../../Redux/data/dataActions';
import '../style.css';

const FilterName = () => {
	const nameInput = useSelector((state) => state.data.nameInput);

	const dispatch = useDispatch();

	const handleChange = (event, nameInput) => {
		dispatch(setName(event.target.value));
		dispatch(fetchData({ name: event.target.value }));
	};

	return (
		<div>
			<label>
				<input
					className="input"
					value={nameInput}
					onChange={(event) => handleChange(event, nameInput)}
					placeholder={'Search name'}
				/>
			</label>
		</div>
	);
};

export default FilterName;
