import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LogoutWindow from './LogoutWindow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	menuIcon: {
		vertical: 'bottom', 
		horizontal: 'center',
		margin: '10px'
	},
	item: {
		width: '150px',
		height: '70px',
		textAlign: 'center',
		color: 'black',
		background: '#F0F0F0',
		fontSize: '17px', 
	}, 
	text: {
		color: '#AC3834',
		fontSize: '15px', 
		fontWeight: 'bold',
	}
}));

function MenuComponent() {
	const [ menuToggle, setMenuToggle ] = useState(null);
	const [ windowToggle, setWindowToggle ] = useState(false)
	
	function openMenu(event) {
		setMenuToggle(event.currentTarget);
	}

	function closeMenu(event) {
		setMenuToggle(null);
	}

	function handleWindowToggle() {
		setWindowToggle(!windowToggle)
	}

	const classes = useStyles();

	return (
		<div className="wrapper">
			<Button aria-controls="simple-menu" aria-haspopup="true" className={classes.menuIcon} onClick={openMenu}>
				<MenuIcon />
			</Button>
			<Menu
				anchorEl={menuToggle}
				keepMounted
				open={Boolean(menuToggle)}
				onClose={closeMenu}
			>
				<MenuItem className={classes.item} onClick={handleWindowToggle}>
					<p className={classes.text}>LOG OUT</p>
					{windowToggle ? <LogoutWindow /> : null}
				</MenuItem>
			</Menu>
		</div>
    )
}

export default MenuComponent;