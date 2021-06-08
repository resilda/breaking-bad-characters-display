import React, { useEffect} from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Comments from './Comments';
import { fetchCharactersID } from '../Redux/data/dataActions';
import './style.css';

const Details = () => {

    const currentCharacter = useSelector((state) => state.data.currentCharacter);
    console.log('currentCharacter', currentCharacter);
    
    const dispatch = useDispatch();
    const location = useLocation();
    console.log('location', location)

    useEffect(() => {
        dispatch(fetchCharactersID())
    }, [dispatch])

    console.log('fetchCharactersID', fetchCharactersID)

    //location.search.substr(4, 1)

    return (
        currentCharacter ?  
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
            <Comments characterID={currentCharacter.characterID} nickname={currentCharacter.nickname} />
        </section>
    </div> : <h2>Loading...</h2>   
       
    )
}

export default Details;
