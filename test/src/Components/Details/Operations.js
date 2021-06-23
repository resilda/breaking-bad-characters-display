import React, { useState, useEffect, useContext } from 'react';
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
	commentsPargraph: {
		fontSize: '20px'
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
						<CardContent key={comment.id} className="comments-wrapper">
							<Typography className={classes.title}>{comment.user.displayName}:</Typography>
							<Typography className="comment">{comment.body}</Typography>
							<CardContent className="date-details">
								<Typography className="date-time">
									{postDate.getMonth() + 1 + '.' + postDate.getDate() + '.' + postDate.getFullYear()}
								</Typography>
								<Typography className="date-time">
									{postDate.getHours() + ':' + postDate.getMinutes() + ':' + postDate.getSeconds()}
								</Typography>
							</CardContent>
							<CardActions>
								<DeleteIcon
									className="buttons"
									variant="outlined"
									color="secondary"
									onClick={() => {
										deleteComment(comment.id);
									}}
								/>
							</CardActions>
						</CardContent>
					);
				})}
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
						style={{
							width: '500px',
							height: '150px',
							marginTop: '20px'
						}}
					/>
					<Button
						className="buttons"
						type="submit"
						variant="contained"
						color="primary"
						style={{
							margin: '19px 20px',
							width: '90px',
							height: '30px'
						}}
					>
						Share
					</Button>
				</form>
			</Card>
		</div>
	);
}

export default Operations;
