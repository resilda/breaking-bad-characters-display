import React, { useState, useEffect, useContext } from 'react';
import firebase from '../../Config/Firebase';
import { AuthContext } from '../../Auth/AuthService';

function Operations({ characterID }) {
	//save the character ID

	//get the user's name
	// const user = firebase.auth().currentUser;
	// const currentUser = user.displayName;

	// console.log('user', user);
	// console.log('currentUser', currentUser);

	const [ comment, setComment ] = useState('');
	const [ comments, setComments ] = useState([]);
	const [ timestamp ] = useState('');

	function handleChange(event) {
		setComment(event.target.value);
	}

	// const context = useContext(AuthContext);
	// const user = context.user;
	// const username = user.displayName;
	// const userID = user.userID;
	// console.log('username', username);
	// console.log('userID', userID);

	//get data from the firebase
	async function getData() {
		await firebase
			.firestore()
			.collection('Characters')
			.doc(`${characterID}`)
			.collection('Comments')
			.get();

		await firebase
			.firestore()
			.collection('Characters')
			.doc(`${characterID}`)
			.collection('Comments')
			.onSnapshot((doc) => {
				const commentsList = doc.docs.map((item) => ({
					...item.data()
				}));
				setComments(commentsList.reverse());
			});
	}

	useEffect(() => {
		getData();
	});

	//create new comments
	async function createComment() {
		const newComment = {
			body: comment,
			timestamp: timestamp, 
			user: {
				displayName: 'resilda',
				id: 'u9MacrOOe1c4gfYpF7GcbdLFiw72'
			}, 
			// user: {
			// 	displayName: `${username}`,
			// 	id: `${userID}`
			// }
		};

		firebase
		.firestore()
		.collection('Characters')
		.doc(`${characterID}`)
		.collection('Comments')
		.add(newComment);

		setComment('')
	}

	async function deleteComment() {
		// const deleteComment = await firebase.firestore()
		// .collection('Characters')
		// .doc(`${characterID}`)
		// .collection('Comments').where('body','===',comment);

		// deleteComment.delete();

		//console.log('delete', deleteComment)
	}

	return (
		<div>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					createComment();
				}}
			>
				<input className="text-area" value={comment} type="text" onChange={handleChange} />
				<button type="submit">Submit</button>
			</form>
			{comments.map((comment) => {
				const postDate = new Date();
				return (
					<ul key={comment.id}>
					<li>{comment.characterID}</li>
					<li>{comment.user.displayName}</li>
					<li>{comment.body}</li>
					<li>{(postDate.getMonth() + 1) + '.' + postDate.getDate() + '.' + postDate.getFullYear()}</li>
					<li>{postDate.getHours() + ':' + postDate.getMinutes()}</li>
					<button onClick={(event) => {event.preventDefault(); deleteComment()}}>Delete</button>
				</ul>)
			})}
		</div>
	);
}

export default Operations;
