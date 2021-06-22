import React from 'react';
import MenuComponent from './MenuComponent';
import FilterTable from '../TableComponents/FilterTable';
import '../style.css';

function NavBar({ setFilterCategory }) {

	return (
		<div className="wrapper">
			<section classes="navbar-1">
				<MenuComponent />
			</section>
			<FilterTable setFilterCategory={setFilterCategory}/>
		</div>
	);
}

export default NavBar;
