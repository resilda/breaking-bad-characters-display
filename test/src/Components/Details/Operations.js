import React, { useState, useEffect } from 'react';
import firebase from '../../Config/Firebase';

const Operations = ({id}) => {

    //save the character ID
    const characterID = id;

    // //get the user's name
    // const user = firebase.auth().currentUser;
    // const currentUser = user.displayName;

    // console.log('user', user);
    // console.log('currentUser', currentUser)

    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    console.log('comment', comment);

    function handleChange(event) {
        setComment(event.target.value)
    }

    function submitComment(event) {
        event.preventDefault();
        firebase
        .firestore()
        .collection('Comments')
        .doc()
        .set({
            user: '',
            characterID: '',
            comment
        })
        .then(() => {
            setComment('');
            comments.push(comment);
        })
    }

    //get data from the firebase, ne console del
    function getData() {
        var docRef = firebase.firestore().collection('Comments');
        docRef
        .get()
        .then((doc) => {
            console.log('db.doc.comment', comment)
        })
    }

    //snapshots to get data from firebase, don't know if it works
    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('Comments').onSnapshot((snapshot) => {
            const newComments = snapshot.docs.map((doc) => ({
                characterID: doc.characterIDSth,
                ...doc.data
                        }))
            setComments(newComments);
        })
        return () => unsubscribe();
    }, [])

    function deleteComment(event) {
        event.preventDefault();
        firebase
        .firestore()
        .collection('Comments')
        .doc()
        .delete()
    }
 
    return (
        <div>
            <form onSubmit={submitComment}>
                <textarea 
                    className="text-area"
                    value={comment}
                    type="text"
                    onChange={handleChange} 
                />
                {comment}
                <button type="submit">Submit</button>
                {comments.map((comment) => {
                    return (
                        <div key={characterID}> 
                            <h1>{comment.characterID}</h1>
                            <h1>{comment.currentUser}</h1>
                            <h1>{comment.comments}</h1>
                            <button onClick={deleteComment}>
                                Delete
                            </button>
                        </div>
                    )
                })}
                {getData()}
            </form>
        </div>
    )
}

export default Operations;