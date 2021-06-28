import React, { useState, useEffect, useContext, useRef } from 'react';
import firebase from '../../Config/Firebase';
import { AuthContext } from '../../Auth/AuthService';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '1700px',
		height: '400px',
		margin: '35px',
		overflow: 'scroll'
	},
	commentsPargraph: {
		fontSize: '20px',
		fontWeight: 'bold',
		margin: '35px'
	},
	commentsWrapper: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-end',
		width: '500px',
		height: '150px',
		margin: '10px',
		paddingRight: '10px',
		background: '#F0F0F0',
		boxShadow: '3px 3px #888888'
		// borderRadius: '15px'
	},
	nameComment: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	title: {
		fontSize: '14px',
		fontWeight: 'bold',
		fontStyle: 'italic',
		color: '#354065',
		paddingRight: '10px'
	},
	comment: {
		fontSize: '20px',
		paddingRight: '7px'
	},
	dateDetails: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		paddingRight: '16px',
		fontSize: '12px'
	},
	dateTime: {
		fontSize: '10px',
		paddingRight: '7px',
		color: 'gray'
	},
	button: {
		color: '#B30047',
		cursor: 'pointer',
		margin: '12px'
	},
	commentText: {
		width: '500px',
		height: '150px',
		marginTop: '40px'
	},
	buttonComment: {
		margin: '40px 20px',
		width: '90px',
		height: '30px',
		background: '#465484',
		color: 'white'
	}
});

function Operations({ characterID }) {
	const [ comment, setComment ] = useState('');
	const [ commentsList, setCommentsList ] = useState([]);

	const database = firebase.firestore().collection('Characters').doc(`${characterID}`).collection('Comments');

	function handleChange(event) {
		setComment(event.target.value);
	}

	//get user's data
	const context = useContext(AuthContext);
	const user = context.user;
	const username = user.displayName;
	const userID = user.uid;

	//get data from the firebase
	async function getData() {
		await database.orderBy('createdAt', 'asc').onSnapshot((doc) => {
			console.log('doc', doc.docs);
			const commentsList = doc.docs.map((item) => ({
				id: item.id,
				...item.data()
			}));
			setCommentsList(commentsList);
		});
	}

	useEffect(() => {
		getData();
	}, []);

	//create new comments
	async function createComment() {
		const createdAt = new Date().getTime();
		console.log('createdAt', createdAt);
		const newComment = {
			createdAt,
			body: comment,
			user: {
				displayName: username,
				id: userID
			}
		};

		//add comment to firestore
		database.add(newComment);
		setComment('');
	}

	//delete comments
	async function deleteComment(id) {
		await database.doc(`${id}`).delete();
	}

	const classes = useStyles();

	return (
		<div>
			<Typography className={classes.commentsPargraph}>Share your comments in the section below</Typography>
			<Card className={classes.root}>
				{commentsList.map((comment) => {
					const postDate = new Date(comment.createdAt);
					return (
						<CardContent key={comment.id} className={classes.commentsWrapper}>
							<div className={classes.nameComment}>
								<Typography className={classes.title}>
									{comment.user.displayName}:{''}
								</Typography>
								<Typography className={classes.comment}>{comment.body}</Typography>
							</div>
							<CardActions className={classes.button}>
								<DeleteIcon
									className="delete-comment"
									onClick={() => {
										deleteComment(comment.id);
									}}
								/>
							</CardActions>
							<div className={classes.dateDetails}>
								<Typography className={classes.dateTime}>
									{postDate.getMonth() + 1 + '.' + postDate.getDate() + '.' + postDate.getFullYear()}
								</Typography>
								<Typography className={classes.dateTime}>
									{postDate.getHours() + ':' + postDate.getMinutes() + ':' + postDate.getSeconds()}
								</Typography>
							</div>
						</CardContent>
					);
				})}
			</Card>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					createComment();
				}}
			>
				<TextField
					value={comment}
					type="text"
					placeholder="Share your thoughts"
					onChange={handleChange}
					className={classes.commentText}
				/>
				<Button type="submit" className={classes.buttonComment}>
					Share
				</Button>
			</form>
		</div>
	);
}

export default Operations;
