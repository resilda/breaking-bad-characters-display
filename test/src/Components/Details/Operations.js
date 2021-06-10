import React, { useState, useEffect } from 'react';
import firebase from '../../Config/Firebase';

function Operations({ characterID }) {
	//save the character ID

	//get the user's name
	// const user = firebase.auth().currentUser;
	// const currentUser = user.displayName;

	// console.log('user', user);
	// console.log('currentUser', currentUser);

	const [ comment, setComment ] = useState('');

	const [ comments, setComments ] = useState([]);

	function handleChange(event) {
		setComment(event.target.value);
	}

	//get data from the firebase
	async function getData() {
		const characterCollection = await firebase
			.firestore()
			.collection('Characters')
			.doc(`${characterID}`)
			.collection('Comments')
			.get();
		//const commentsList = [];

		// characterCollection.forEach((doc) => {
		// 	// console.log(doc.id, ' => ', doc.data());
		// 	commentsList.push(doc.data());
		// });

		//characterCollection.docs.map((doc) => commentsList.push(doc.data()));

		await firebase
			.firestore()
			.collection('Characters')
			.doc(`${characterID}`)
			.collection('Comments')
			.onSnapshot((doc) => {
				console.log('doc', doc.docs);
				const commentsList = doc.docs.map((item) => ({
					...item.data()
				}));
				setComments(commentsList.reverse());
				console.log('commentsList', commentsList);
			});

		// console.log('commentsList', commentsList);
		// setComments(commentsList);
	}

	useEffect(() => {
		getData();
	});

	//create new comments
	async function createComment() {
		const newComment = {
			body: comment,
			user: {
				displayName: 'resilda',
				id: 'u9MacrOOe1c4gfYpF7GcbdLFiw72'
			}
		};
		console.log('newComment', newComment);

		firebase.firestore().collection('Characters').doc(`${characterID}`).collection('Comments').add(newComment);
	}

	// function deleteComment(event) {
	// 	event.preventDefault();
	// 	firebase.firestore().collection('Comments').doc().delete();
	// }

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

			{comments.map((comment) => (
				<ol key={comment.id}>
					<li>{comment.characterID}</li>
					<li>{comment.user.displayName}</li>
					<li>{comment.body}</li>
					{/* <button onClick={deleteComment}>Delete</button> */}
				</ol>
			))}
		</div>
	);
}

export default Operations;
