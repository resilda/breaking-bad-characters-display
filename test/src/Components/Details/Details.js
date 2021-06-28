import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchCharactersID } from '../../Redux/data/dataActions';
import Comments from './Comments';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import '../style.css';

const useStyles = makeStyles({
	wrapperDetails: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: '20px'
	},
	avatar: {
		border: '1px solid #377867',
		width: '280px',
		height: '380px'
	},
	wrapperSection: {
		display: 'flex',
		flexDirection: 'column',
		margin: '15px'
	},
	navbarDetails: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	commentsTitle: {
		fontSize: '28px',
		fontWeight: 'bold',
		margin: '35px'
	},
	item: {
		width: '130px',
		height: '60px',
		textAlign: 'justify',
		color: 'black',
		fontSize: '16px',
		fontFamily: 'Times New Roman',
		marginRight: '45px'
	},
	button: {
		width: '85px',
		height: '35px',
		vertical: 'bottom',
		horizontal: 'center',
		margin: '40px',
		background: 'linear-gradient(45deg, #5C888B 20%, #71A8A1 80%)',
		border: 0,
		borderRadius: 3,
		color: 'white',
		fontSize: '13px',
		cursor: 'pointer'
	},
	firstSectionDetails: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '450px',
		height: '75px',
		marginTop: '5px',
		marginLeft: '20px',
		backgroundColor: '#F0F0F0',
		boxShadow: '4px 5px #E0E0E0'
	},
	withinFirstSection: {
		display: 'flex',
		flexDirection: 'row',
		marginRight: '40px'
	},
	secondSectionDetails: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '430px',
		height: '90px',
		marginTop: '20px',
		marginLeft: '50px',
		backgroundColor: '#F0F0F0',
		boxShadow: '5px 4px 0px 0px #E0E0E0'
	},
	thirdSectionDetails: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		width: '450px',
		height: '90px',
		marginTop: '20px',
		marginLeft: '20px',
		backgroundColor: '#F0F0F0',
		boxShadow: '4px 5px #E0E0E0'
	},
	firstLogo: {
		width: '80px',
		height: '50px'
	},
	secondLogo: {
		width: '50px',
		height: '50px'
	},
	nameDetails: {
		fontFamily: 'Times New Roman',
		fontSize: '20px',
		margin: '5px',
		fontWeight: 'bolder',
		color: '#354065'
	},
	detailsComponent: {
		fontFamily: 'Times New Roman',
		fontSize: '14.5px',
		fontWeight: 'bolder',
		color: 'black',
		padding: '5px 5px'
	},
	commentSection: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	}
});

function Details() {
	const [ windowToggle, setWindowToggle ] = useState(false);

	const loadingCharacter = useSelector((state) => state.data.loadingCharacter);
	const currentCharacter = useSelector((state) => state.data.currentCharacter);
	const errorCharacter = useSelector((state) => state.data.errorCharacter);

	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();

	const id = location.search.split('?id=')[1];

	function handleWindowToggle() {
		setWindowToggle(!windowToggle);
	}

	function goBackToMain() {
		history.push('/main');
	}

	useEffect(
		() => {
			dispatch(fetchCharactersID(id));
		},
		[ dispatch, id ]
	);

	const classes = useStyles();

	return (
		<div>
			<div className={classes.navbarDetails}>
				<Typography className={classes.commentsTitle}>Comments Section</Typography>
				<div onClick={handleWindowToggle} className={classes.item}>
					<Button className={classes.button}>Go back</Button>
					{windowToggle ? goBackToMain() : null}
				</div>
			</div>
			{loadingCharacter ? (
				<h4>Loading...</h4>
			) : errorCharacter ? (
				{ errorCharacter }
			) : (
				currentCharacter.map((data) => (
					<Card key={id}>
						<CardContent className={classes.wrapperDetails}>
							<img className={classes.avatar} src={data.img} alt={data.name} />
							<div className={classes.wrapperSection}>
								<CardContent className={classes.firstSectionDetails}>
									{data.category === 'Breaking Bad, Better Call Saul' ? (
										<img
											src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/Better_Call_Saul_logo.svg/1200px-Better_Call_Saul_logo.svg.png"
											alt="better-call-saul"
											className={classes.firstLogo}
										/>
									) : (
										<img
											src="https://cdn.iconscout.com/icon/free/png-256/breaking-bad-2-569429.png"
											alt="breaking-bad"
											className={classes.secondLogo}
										/>
									)}
									<div className={classes.withinFirstSection}>
										<Typography className={classes.nameDetails}>{data.name},</Typography>
										<Typography className={classes.nameDetails}>{data.nickname}</Typography>
									</div>
								</CardContent>
								<CardContent className={classes.secondSectionDetails}>
									<Typography className={classes.detailsComponent}>
										Birthday: {data.birthday}
									</Typography>
									<Typography className={classes.detailsComponent}>Status: {data.status}</Typography>
								</CardContent>
								<CardContent className={classes.thirdSectionDetails}>
									<Typography className={classes.detailsComponent}>
										Occupation: {data.occupation}
									</Typography>
									<Typography className={classes.detailsComponent}>
										Portrayed: {data.portrayed}
									</Typography>
								</CardContent>
							</div>
						</CardContent>
						<CardContent className={classes.commentSection}>
							<Comments id={id} nickname={data.nickname} />
						</CardContent>
					</Card>
				))
			)}
		</div>
	);
}

export default Details;
