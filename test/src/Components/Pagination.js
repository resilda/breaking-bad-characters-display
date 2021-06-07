import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { fetchData, setAllCharactersCount, setCurrentPage, setLimitPerPage } from '../Redux/data/dataActions';

const Pagination = ({ info }) => {
	const totalCount = useSelector((state) => state.data.totalCount);
	const limitPerPage = useSelector((state) => state.data.limitPerPage);
	const currentPage = useSelector((state) => state.data.currentPage);

	const dispatch = useDispatch();

	//Pyet arditin
	const totalCountCharacters = (count) => {
		dispatch(setAllCharactersCount(totalCount))
	}

	//vjen sa vendos limitin
	const count = info.length;

	//when the page is changed
	const onChangePage = (event, page) => {
		dispatch(setCurrentPage(page));
		const offset = limitPerPage * page;
		dispatch(fetchData({ limit: limitPerPage, offset }));
	};

	const onChangeRowsPerPage = (event) => {
		const newLimitPerPage = event.target.value; //update reducer
		const defaultPage = 0; //start from beggining
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
