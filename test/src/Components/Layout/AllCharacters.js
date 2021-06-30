import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CreatePdf from '../GeneratePDF/CreatePdf';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import '../style.css';

const useStyles = makeStyles(() => ({
	row: {
		cursor: 'pointer'
	},
	cell: {
		fontSize: '14.5px',
	},
	image: {
		width: '45px',
		height: '55px',
		border: '1px solid #377867'
	},
}));

function AllCharacters({ detail, selectedRow, setSelectedRow }) {
	const [ backgroundColor ] = useState('white');
	const [ isHighlighted, setIsHighlighted ] = useState(false);
	const [ showButton, setShowButton ] = useState(false);

	const history = useHistory();
	const classes = useStyles();

	function onClick() {
		setShowButton(!showButton);
		setIsHighlighted(!isHighlighted);
		setSelectedRow(detail.char_id);
	}

	function onNavigate(id) {
		history.push(`/main/character?id=${id}`);
	}

	return (
		<TableRow
			className={classes.row}
			key={detail.char_id}
			value={backgroundColor}
			onClick={() => onClick()}
			onDoubleClick={() => onNavigate(detail.char_id)}
			style={selectedRow === detail.char_id && isHighlighted ? { backgroundColor: '#ffffed' } : {}}
		>
			<TableCell className={classes.cell}>
				<img className={classes.image} src={detail.img} alt={detail.name} />
			</TableCell>
			<TableCell className={classes.cell}>{detail.name}</TableCell>
			<TableCell className={classes.cell}>{detail.nickname}</TableCell>
			<TableCell className={classes.cell}>{detail.category}</TableCell>
			<TableCell className={classes.cell}>{detail.birthday}</TableCell>
			<TableCell
				className={classes.cell}
				style={
					detail.status === 'Alive' ? (
						{ color: '#507B58', fontWeight: 'bolder' }
					) : detail.status === 'Deceased' ? (
						{ color: '#AC3834', fontWeight: 'bolder' }
					) : (
						{ color: '#635495', fontWeight: 'bolder' }
					)
				}
			>
				{detail.status}
			</TableCell>
			<TableCell>
				{showButton && selectedRow === detail.char_id ? (
					<div onClick={(event) => event.target.value}>
						<Button>
							<CreatePdf detail={detail} />
						</Button>
					</div>
				) : null}
			</TableCell>
		</TableRow>
	);
}

export default AllCharacters;
