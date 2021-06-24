import React from 'react';
import Operations from './Operations';

function Comments({ id }) {
	return (
		<div>
			<Operations characterID={id} />
		</div>
	);
}

export default Comments;
