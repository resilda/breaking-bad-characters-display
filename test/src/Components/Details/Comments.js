import React from 'react';
import Operations from './Operations';

function Comments({ id, nickname }) {
	return (
		<div>
			<h1>
				Comments Section: "<i>{nickname}</i>"
			</h1>
			<Operations characterID={id} />
		</div>
	);
}

export default Comments;
