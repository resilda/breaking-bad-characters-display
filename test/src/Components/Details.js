import React from 'react';
import { useSelector  } from 'react-redux';
import './style.css';

const Details = () => {

    const currentCharacter = useSelector((state) => state.data.currentCharacter);

    return (
        <div key={currentCharacter.char_id} className="wrapper-details">
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
    )
}

export default Details
