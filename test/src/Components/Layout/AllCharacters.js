import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
//import { css } from '@emotion/css';
//import { yellow } from '@material-ui/core/colors';
import '../style.css';

const useStyles = makeStyles(() => ({
	cell: {
		fontSize: '15px',
		width: 300
	}
}));

const AllCharacters = ({ detail }) => {
	const [ backgroundColor, setBackgoundColor ] = useState('black');

	console.log('backgroundColor', backgroundColor);

	function changeColor() {
		setBackgoundColor('yellow');
	}

	const history = useHistory();

	function onNavigate(id) {
		history.push(`/main/character?id=${id}`);
	}

	const classes = useStyles();

	return (
		<TableRow
			className="click"
			key={detail.char_id}
			value={backgroundColor}
			// style={{backgroundColor: 'yellow'}}
			onClick={changeColor}
			onDoubleClick={() => onNavigate(detail.char_id)}
		>
			<TableCell className={classes.cell}>
				<img className="img" src={detail.img} alt={detail.name} width="60px" height="70px" />
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
