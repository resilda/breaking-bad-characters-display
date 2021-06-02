import React from 'react';

const OneCharacter = ({detail}) => {
    return (
        <div>
            <h1>One unique character</h1>
            <div key={detail.id}>
                 <h2>{detail.name}</h2>
            </div>
        </div>
    )
}

export default OneCharacter;