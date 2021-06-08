import React, { useState, useEffect } from 'react';
import firebase, { database } from '../Config/Firebase';

const Comments = ({ characterID, nickname }) => {

    const [comment, setComment] = useState('');
    

    return (
        <div>
            <h1>Comments Section: "<i>{nickname}</i>"</h1>
            <textarea className="text-area" value={comment} placeholder="Share your thoughts" onChange={(event) => setComment(event.target.value)}>
                {comment}
            </textarea>
        </div>
    )
}

export default Comments;