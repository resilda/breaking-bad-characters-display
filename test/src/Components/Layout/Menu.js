import React, { useState } from 'react';
import MenuComponents from './MenuComponents';
import '../style.css';

function Menu() {
    
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);

    function handleClickMenu() {
        setIsMenuOpen(!isMenuOpen);
    }
    
    return (
        <div>
            <h1>Menu</h1>
            <button
                onClick={() => handleClickMenu()}
                // className="side-menu"
                style={isMenuOpen ? 
                    { height: '100%',
                    width: '0',
                    position: 'fixed',
                    zIndex: '1',
                    top: '0',
                    left: '0',
                    backgroundColor: '#111',
                    overflowX: 'hidden',
                    transition: '0.5s',
                    paddingTop: '60px',} : {}}
            >
                {isMenuOpen ? <MenuComponents /> : ''}
            </button>
        </div>
    )
}

export default Menu;