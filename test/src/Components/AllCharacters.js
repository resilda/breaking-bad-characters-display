import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { getCurrentCharacter } from '../Redux/data/dataActions';
import { makeStyles } from '@material-ui/core/styles';
import './style.css';

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

	const dispatch = useDispatch();

	const classes = useStyles();

	return (
		<TableRow key={detail.char_id} className={classes.row}>
			<TableCell className={classes.cell}>
				<img
					className="img"
					src={detail.img}
					alt={detail.name}
					width="60px"
					height="70px"
				/>
			</TableCell>
			<TableCell className={classes.cell} onClick={() => dispatch(getCurrentCharacter(detail))}>
				<Link to={`/main/${detail.name}/${detail.char_id}`}>
					{detail.name}
				</Link>
			</TableCell>
			<TableCell className={classes.cell}>{detail.nickname}</TableCell>
			<TableCell className={classes.cell}>{detail.category}</TableCell>
			<TableCell className={classes.cell}>{detail.birthday}</TableCell>
			<TableCell className={classes.cell}>{detail.status}</TableCell>
		</TableRow>
	);
};

export default AllCharacters;

//'/main/${character.name}/${character.char_id}'
