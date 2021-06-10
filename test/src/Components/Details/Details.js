import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchCharactersID } from '../../Redux/data/dataActions';
//import NavBar from '../Layout/Navbar';
import Comments from './Comments';
import '../style.css';

function Details() {
	const loadingCharacter = useSelector((state) => state.data.loadingCharacter);
	const currentCharacter = useSelector((state) => state.data.currentCharacter);
	const errorCharacter = useSelector((state) => state.data.errorCharacter);

	const dispatch = useDispatch();
	const location = useLocation();

	const id = location.search.split('?id=')[1];

	useEffect(
		() => {
			dispatch(fetchCharactersID(id));
		},
		[ dispatch, id ]
	);

	return loadingCharacter ? (
		<h4>Loading...</h4>
	) : errorCharacter ? (
		{ errorCharacter }
	) : (
		currentCharacter.map((data) => (
			<div key={id}>
				<div className="wrapper-details">
					<img className="img-details" src={data.img} alt={data.name} width="350px" height="430px" />
					<section className="section-details">
						<h1 className="name-details">{data.name}</h1>
						<h3 className="nickname-details">"{data.nickname}"</h3>
						<section className="section-components">
							<h3 className="details-component">Birthday: {data.birthday}</h3>
							<h3 className="details-component">Status: {data.status}</h3>
							<h3 className="details-component">Occupation: {data.occupation}</h3>
							<h3 className="details-component">Portrayed: {data.portrayed}</h3>
						</section>
					</section>
				</div>
				<section className="comments-section">
					<Comments id={id} nickname={data.nickname} />
				</section>
			</div>
		))
	);
}

export default Details;
