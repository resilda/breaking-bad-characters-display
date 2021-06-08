import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	cell: {
		fontSize: '15px',
		fontWeight: 'bold',
		color: 'rebeccapurple',
		width: 300
	}
}));

const TableHeader = () => {
	const classes = useStyles();

	return (
		<TableRow>
			<TableCell className={classes.cell}>Character</TableCell>
			<TableCell className={classes.cell}>Name</TableCell>
			<TableCell className={classes.cell}>Nickname</TableCell>
			<TableCell className={classes.cell}>Category</TableCell>
			<TableCell className={classes.cell}>Birthday</TableCell>
			<TableCell className={classes.cell}>Status</TableCell>
		</TableRow>
	);
};

export default TableHeader;
