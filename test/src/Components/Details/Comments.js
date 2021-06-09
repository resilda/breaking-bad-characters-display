import React from 'react';
import Operations from './Operations';

const Comments = ({ id, nickname }) => {    
    console.log('characterID', id)
    return (
        <div>
            <h1>Comments Section: "<i>{nickname}</i>"</h1>
            <Operations characterID={id}/>
        </div>
    )
}

export default Comments;