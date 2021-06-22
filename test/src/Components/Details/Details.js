import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchCharactersID } from '../../Redux/data/dataActions';
import Comments from './Comments';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import '../style.css';

const useStyles = makeStyles({
	wrapperDetails: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	avatar: {
		border: '1px solid #377867',
		width: '280px', 
		height: '380px'
	},
	wrapperSection: {
		display: 'flex',
		flexDirection: 'column',
		// justifyContent: 'space-between'
	},
	firstSectionDetails: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '700px',
		marginTop: '5px',
		marginLeft: '10px',
		backgroundColor: '#F0F0F0',
		boxShadow: '7px 9px #E0E0E0',
	},
	secondSectionDetails: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '700px',
		marginTop: '20px',
		marginLeft: '50px',
		backgroundColor: '#F0F0F0',
		boxShadow: '9px 7px #E0E0E0',
	}, 
	thirdSectionDetails: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '700px',
		marginTop: '20px',
		marginLeft: '10px',
		backgroundColor: '#F0F0F0',
		boxShadow: '7px 9px #E0E0E0',
	}, 
	nameDetails: {
		fontFamily: 'Limelight, cursive',
		fontSize: '25px',
		color: '#5F1F04',
		fontWeight: 'bold'
	},
	nicknameDetails: {
		fontFamily: 'Lobster, cursive',    
    	fontSize: '20px',
    	fontWeight: 'bold',
	},
	detailsComponent: {
		fontSize: '16px',
    	fontWeight: 'bold',
    	fontStyle: 'italic',
    	padding: '5px 10px',
	},
	commentSection: {
		display: 'flex',
    	flexDirection: 'column',
    	alignItems: 'center',
	}
});

function Details() {
	const loadingCharacter = useSelector((state) => state.data.loadingCharacter);
	const currentCharacter = useSelector((state) => state.data.currentCharacter);
	const errorCharacter = useSelector((state) => state.data.errorCharacter);

	const dispatch = useDispatch();
	const location = useLocation();

	const id = location.search.split('?id=')[1];

	useEffect(
		() => {
			dispatch(fetchCharactersID(id));
		},
		[ dispatch, id ]
	);

	const classes = useStyles();

	return (
		<div>
			<h1>Comments Section</h1>
		{loadingCharacter ? (
		<h4>Loading...</h4>
	) : errorCharacter ? (
		{ errorCharacter }
	) : (
		currentCharacter.map((data) => (
			<Card key={id}>
				<CardContent className={classes.wrapperDetails}>
					<img className={classes.avatar} src={data.img} alt={data.name}/>
					<div className={classes.wrapperSection}>
						<CardContent className={classes.firstSectionDetails}>
							<Typography className={classes.nameDetails}>{data.name}</Typography>
							<Typography className={classes.nicknameDetails}>"{data.nickname}"</Typography>
						</CardContent>
						<CardContent className={classes.secondSectionDetails}>
							<Typography className={classes.detailsComponent}>Birthday: {data.birthday}</Typography>
							<Typography className={classes.detailsComponent}>Status: {data.status}</Typography>
						</CardContent>
						<CardContent className={classes.thirdSectionDetails}>
							<Typography className={classes.detailsComponent}>Occupation: {data.occupation}</Typography>
							<Typography className={classes.detailsComponent}>Portrayed: {data.portrayed}</Typography>
						</CardContent>
					</div>
				</CardContent>
				<CardContent className={classes.commentSection}>
					<Comments id={id} nickname={data.nickname} />
				</CardContent>
			</Card>
		))
	)}</div>);
}

export default Details;
