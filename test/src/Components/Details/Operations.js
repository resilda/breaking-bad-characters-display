import React, { useState, useEffect, useContext } from 'react';
import firebase from '../../Config/Firebase';
import { AuthContext } from '../../Auth/AuthService';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

	return (
		<div>
			{commentsList.map((comment) => {
				const postDate = new Date(comment.createdAt);
				return (
					<div key={comment.id} className="comments-wrapper">
						<h3 className="user">{comment.user.displayName}:</h3>
						<h2 className="comment">{comment.body}</h2>
						<div className="date-details">
							{/* <h4 className="date-time">{createdAt}</h4> */}
							<h4 className="date-time">
								{postDate.getMonth() + 1 + '.' + postDate.getDate() + '.' + postDate.getFullYear()}
							</h4>
							<h4 className="date-time">
								{postDate.getHours() + ':' + postDate.getMinutes() + ':' + postDate.getSeconds()}
							</h4>
						</div>
						<DeleteIcon
							className="buttons"
							variant="outlined"
							color="secondary"
							onClick={() => {
								deleteComment(comment.id);
							}}
						/>
					</div>
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
		</div>
	);
}

export default Operations;
