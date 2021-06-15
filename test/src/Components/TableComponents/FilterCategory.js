import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataAll } from '../../Redux/data/dataActions';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

function FilterCategory() {

    const totalCount = useSelector((state) => state.data.totalCount);

    const [ inputCategory, setInputCategory ] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDataAll())
    }, [dispatch])

    function getInput(event) {
        setInputCategory(event.target.value);
    }

    const category = totalCount.map((element) => {
        return element.category;
    })

    function handleSubmitCategoy(inputCategory) {
        return category.filter(item => item === inputCategory)
    }

    console.log('filter', handleSubmitCategoy);
    
    return (
        <div>
            <section className="filter">
				<TextField
					className="input"
					value={inputCategory}
					onChange={getInput}
					placeholder={'Search name'}
					variant="outlined"
				/>
				<SearchIcon 
					className="buttons"
					onClick={(inputCategory) => handleSubmitCategoy(inputCategory)}
					variant="contained"
					color="primary"
					style={{
						margin: '12px',
						width: '50px',
						height: '30px',
					}}
				/>
			</section>
        </div>
    )
}

export default FilterCategory;