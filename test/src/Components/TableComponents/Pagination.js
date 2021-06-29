import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { fetchData, fetchDataAll, setCurrentPage, setLimitPerPage } from '../../Redux/data/dataActions';

function Pagination() {
	const totalCount = useSelector((state) => state.data.totalCount);
	const limitPerPage = useSelector((state) => state.data.limitPerPage);
	const currentPage = useSelector((state) => state.data.currentPage);

	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(fetchDataAll());
		},
		[ dispatch ]
	);

	//total amount of data rows
	const count = totalCount.length;

	//change page
	function onChangePage(event, page) {
		dispatch(setCurrentPage(page));
		const offset = limitPerPage * page;
		dispatch(fetchData({ limit: limitPerPage, offset }));
	}

	function onChangeRowsPerPage(event) {
		const newLimitPerPage = event.target.value; //update reducer
		const defaultPage = 0; //start from beggining
		dispatch(setLimitPerPage(newLimitPerPage));
		dispatch(setCurrentPage(defaultPage));
		dispatch(fetchData({ limit: newLimitPerPage, offset: defaultPage }));
	}

	return (
		<TableRow>
			<TablePagination
				count={count}
				rowsPerPage={limitPerPage}
				page={currentPage}
				onChangePage={onChangePage}
				onChangeRowsPerPage={onChangeRowsPerPage}
				rowsPerPageOptions={[ 10, 20, 40 ]}
			/>
		</TableRow>
	);
}

export default Pagination;
