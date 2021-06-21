import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function DatesRange() {
	const [ selectDate, setSelectDate ] = useState([
		{
			startDate: new Date(),
			endDate: null,
			key: 'selection'
		}
	]);
	return (
		<div>
			<DateRange
				editableDateInputs={true}
				onChange={(item) => setSelectDate([ item.selection ])}
				moveRangeOnFirstSelection={false}
				ranges={selectDate}
				startDate={selectDate.startDate}
				endDate={selectDate.endDate}
			/>
			<p>
				{selectDate.startDate}
				{selectDate.endDate}
			</p>
		</div>
	);
}
export default DatesRange;
