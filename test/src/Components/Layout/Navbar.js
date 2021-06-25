import React, { useState } from 'react';
import FilterTable from '../TableComponents/FilterTable';
import LogoutWindow from './LogoutWindow';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import '../style.css';

const useStyles = makeStyles(() => ({
	icon: {
		vertical: 'bottom',
		horizontal: 'center',
		margin: '10px',
		cursor: 'pointer'
	},
	item: {
		width: '130px',
		height: '60px',
		textAlign: 'justify',
		color: 'black',
		fontSize: '16px',
		fontFamily: 'Times New Roman'
	}
}));

function NavBar({ 
	setFilterCategory, 
	selectDate, 
	setSelectDate,
}) {
	const [ windowToggle, setWindowToggle ] = useState(false);

	function handleWindowToggle() {
		setWindowToggle(!windowToggle);
	}

	const classes = useStyles();

	return (
		<div className="wrapper">
			<div onClick={handleWindowToggle} className={classes.item}>
				<ExitToAppIcon className={classes.icon} />
				{windowToggle ? <LogoutWindow /> : null}
			</div>
			<FilterTable 
				setFilterCategory={setFilterCategory} 
				selectDate={selectDate} 
				setSelectDate={setSelectDate}
			/>
		</div>
	);
}

export default NavBar;
