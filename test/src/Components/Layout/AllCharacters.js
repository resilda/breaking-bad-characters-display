import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import GeneratePdf from '../GeneratePDF/GeneratePdf';
import DownloadPdf from '../GeneratePDF/DownloadPdf';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import '../style.css';

const useStyles = makeStyles((theme) => ({
	cell: {
		fontSize: '15px',
		width: 300
	},
	avatar: {
		width: theme.spacing(8),
		height: theme.spacing(10)
	}
}));

function AllCharacters({ detail }) {
	const [ backgroundColor ] = useState('white');
	const [ isHighlighted, setIsHighlighted ] = useState(false);
	const [ showButton, setShowButton ] = useState(false);

	const history = useHistory();
	const classes = useStyles();

	function onClick() {
		setShowButton(!showButton);
		setIsHighlighted(!isHighlighted);
	}

	function onNavigate(id) {
		history.push(`/main/character?id=${id}`);
	}

	return (
		<TableRow
			className="click"
			key={detail.char_id}
			value={backgroundColor}
			onClick={() => onClick()}
			onDoubleClick={() => onNavigate(detail.char_id)}
			style={isHighlighted ? { backgroundColor: '#ffffed' } : {}}
		>
			<TableCell className={classes.cell}>
				<Avatar className={classes.avatar} src={detail.img} alt={detail.name} />
			</TableCell>
			<TableCell className={classes.cell}>{detail.name}</TableCell>
			<TableCell className={classes.cell}>{detail.nickname}</TableCell>
			<TableCell className={classes.cell}>{detail.category}</TableCell>
			<TableCell className={classes.cell}>{detail.birthday}</TableCell>
			<TableCell className={classes.cell}>{detail.status}</TableCell>
			<TableCell>
				{showButton ? (
					<Button
						onClick={(event) => event.target.value}
						variant="contained"
						color="default"
						style={{
							margin: '19px 20px',
							width: '90px',
							height: '30px',
							fontSize: '10px',
							color: 'white'
						}}
					>
						<DownloadPdf detail={detail} renderComponent={<GeneratePdf detail={detail} />} />
					</Button>
				) : null}
			</TableCell>
		</TableRow>
	);
}

export default AllCharacters;
