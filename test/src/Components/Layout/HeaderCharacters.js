import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
//import SortName from '../TableComponents/SortName';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	cell: {
		fontSize: '16px',
		fontWeight: 'bold',
		color: 'rebeccapurple',
		width: 300
	}
}));

function HeaderCharacters({ info }) {
	const classes = useStyles();

	return (
		<TableRow>
			<TableCell className={classes.cell}>Character</TableCell>
			<TableCell className={classes.cell}>
				Name
				{/* <SortName info={info}/> */}
			</TableCell>
			<TableCell className={classes.cell}>Nickname</TableCell>
			<TableCell className={classes.cell}>Category</TableCell>
			<TableCell className={classes.cell}>Birthday</TableCell>
			<TableCell className={classes.cell}>Status</TableCell>
			<TableCell></TableCell>
		</TableRow>
	);
}

export default HeaderCharacters;
