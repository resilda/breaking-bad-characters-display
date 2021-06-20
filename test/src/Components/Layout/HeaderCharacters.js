import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	cell: {
		fontSize: '16px',
		fontWeight: 'bold',
		color: 'rebeccapurple',
		width: 300
	}
}));

const headerCells = [
	{ id: 'character', label: 'Character', canSort: false },
	{ id: 'name', label: 'Name', canSort: true },
	{ id: 'nickname', label: 'Nickname', canSort: true },
	{ id: 'category', label: 'Category', canSort: true },
	{ id: 'birthday', label: 'Birthday', canSort: true },
	{ id: 'status', label: 'Status', canSort: true },
	{ id: 'pdf', label: '', canSort: false }
];

function HeaderCharacters({ order, orderBy, setOrder, setOrderBy }) {
	function handleRequestSort(cellID) {
		const isAsc = orderBy === cellID && order === 'asc';
		const newOrder = isAsc ? 'desc' : 'asc';
		setOrder(newOrder);
		setOrderBy(cellID); //refering the column we want the elements to be sorted
	}

	const classes = useStyles();

	return (
		<TableRow>
			{headerCells.map(
				(cell) =>
					cell.canSort ? (
						<TableCell
							key={cell.id}
							className={classes.cell}
							sortDirection={orderBy === cell.id ? order : false}
						>
							<TableSortLabel
								active={orderBy === cell.id}
								direction={orderBy === cell.id ? order : 'asc'}
								onClick={() => handleRequestSort(cell.id)}
							>
								{cell.label}
							</TableSortLabel>
						</TableCell>
					) : (
						<TableCell key={cell.id} className={classes.cell}>
							{cell.label}
						</TableCell>
					)
			)}
		</TableRow>
	);
}

export default HeaderCharacters;
