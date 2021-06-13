import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import '../style.css';

const useStyles = makeStyles((theme) => ({
	cell: {
		fontSize: '15px',
		width: 300
	},
	avatar: {
		width: theme.spacing(8),
    	height: theme.spacing(10),
	}
}));

function AllCharacters({ detail }) {
	const [ backgroundColor, setBackgoundColor ] = useState('yellow');
	const [ isHighlighted, setIsHighlighted ] = useState(false);

	console.log('backgroundColor', backgroundColor);

	function onChange() {
		setIsHighlighted(!isHighlighted);
	}

	function changeColor() {
		if(onChange) {
			setBackgoundColor(backgroundColor)
		}
		return backgroundColor;
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
			onClick={() => onChange()}
			onDoubleClick={() => onNavigate(detail.char_id)}
		>
			<TableCell className={classes.cell}>
				<Avatar className={classes.avatar} src={detail.img} alt={detail.name} />
			</TableCell>
			<TableCell className={classes.cell} 
				// style={{ onChange ? setBackgoundColor(backgroundColor) : backgroundColor}}
				style={{ changeColor }}
			>
				{detail.name}
			</TableCell>
			<TableCell className={classes.cell} style={{ changeColor }}>{detail.nickname}</TableCell>
			<TableCell className={classes.cell}>{detail.category}</TableCell>
			<TableCell className={classes.cell}>{detail.birthday}</TableCell>
			<TableCell className={classes.cell}>{detail.status}</TableCell>
		</TableRow>
	);
}

export default AllCharacters;
