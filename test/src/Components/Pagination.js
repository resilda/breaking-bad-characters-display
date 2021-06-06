import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { fetchData, setCurrentPage, setLimitPerPage } from '../Redux/data/dataActions';

const Pagination = ({ info }) => {
	const limitPerPage = useSelector((state) => state.data.limitPerPage);
	const currentPage = useSelector((state) => state.data.currentPage);

	const dispatch = useDispatch();

	//vjen sa vendosim limitin
	const count = info.length;

	//when the page is changed
	const onChangePage = (event, page) => {
		dispatch(setCurrentPage(page));
		const offset = limitPerPage * page;
		dispatch(fetchData({ limit: limitPerPage, offset }));
	};

	const onChangeRowsPerPage = (event) => {
		//update reducer
		const newLimitPerPage = event.target.value;
		//start from beggining
		const defaultPage = 0;
		dispatch(setLimitPerPage(newLimitPerPage));
		dispatch(setCurrentPage(defaultPage));
		dispatch(fetchData({ limit: newLimitPerPage, offset: defaultPage }));
	};

	return (
		<TableRow>
			<TablePagination
				count={62}
				rowsPerPage={limitPerPage}
				page={currentPage}
				onChangePage={onChangePage}
				onChangeRowsPerPage={onChangeRowsPerPage}
				rowsPerPageOptions={[ 10, 20, 40 ]}
			/>
		</TableRow>
	);
};

export default Pagination;
