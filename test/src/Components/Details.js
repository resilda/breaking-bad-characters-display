import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchCharactersID } from '../Redux/data/dataActions';
import Comments from './Comments';
import './style.css';

const Details = () => {
	const loadingCharacter = useSelector((state) => state.data.loadingCharacter);
	const currentCharacter = useSelector((state) => state.data.currentCharacter);
	const errorCharacter = useSelector((state) => state.data.errorCharacter);

	console.log('currentCharacter', currentCharacter);

	const dispatch = useDispatch();
	const location = useLocation();

	const id = location.search.split('?id=')[1];

	useEffect(
		() => {
			dispatch(fetchCharactersID(id));
		},
		[ dispatch, id ]
	);

	console.log('currentCharacter.char_id');

	return loadingCharacter ? (
		<h4>Loading...</h4>
	) : errorCharacter ? (
		{ errorCharacter }
	) : currentCharacter ? (
		<div key={currentCharacter.char_id}>
			<div className="wrapper-details">
				<img
					className="img-details"
					src={currentCharacter.img}
					alt={currentCharacter.name}
					width="350px"
					height="430px"
				/>
				<section className="section-details">
					<h1 className="name-details">{currentCharacter.name}</h1>
					<h3 className="nickname-details">"{currentCharacter.nickname}"</h3>
					<section className="section-components">
						<h3 className="details-component">Birthday: {currentCharacter.birthday}</h3>
						<h3 className="details-component">Status: {currentCharacter.status}</h3>
						<h3 className="details-component">Occupation: {currentCharacter.occupation}</h3>
						<h3 className="details-component">Portrayed: {currentCharacter.portrayed}</h3>
					</section>
				</section>
			</div>
			<section className="comments-section">
				<Comments characterID={currentCharacter.char_id} nickname={currentCharacter.nickname} />
			</section>
		</div>
	) : (
		<h2>Loading...</h2>
	);
};

export default Details;
