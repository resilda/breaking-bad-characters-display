import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, setName } from '../Redux/data/dataActions';

const FilterName = () => {
	const nameInput = useSelector((state) => state.data.nameInput);

	const dispatch = useDispatch();

	const handleChange = (event) => {
		dispatch(setName(event.target.value));
		dispatch(fetchData({ nameInput: event.target.value }));
	};

	return (
		<div>
			<label>
				<input
					className="input"
					value={nameInput}
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

export default FilterName;
