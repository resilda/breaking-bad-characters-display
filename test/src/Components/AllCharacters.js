import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	row: {
		//width: 1000
	},
	cell: {
		fontSize: '15px',
		width: 300
	}
}));

const AllCharacters = ({ detail }) => {
	const classes = useStyles();

	return (
		<TableRow key={detail.char_id} className={classes.row}>
			<TableCell className={classes.cell}>
				<img
					src={detail.img}
					alt={detail.name}
					width="60px"
					height="70px"
					style={{ border: '1px solid rebeccapurple', borderRadius: '20px' }}
				/>
			</TableCell>
			<TableCell className={classes.cell}>{detail.name}</TableCell>
			<TableCell className={classes.cell}>{detail.nickname}</TableCell>
			<TableCell className={classes.cell}>{detail.category}</TableCell>
			<TableCell className={classes.cell}>{detail.birthday}</TableCell>
			<TableCell className={classes.cell}>{detail.status}</TableCell>
		</TableRow>
	);
};

export default AllCharacters;
