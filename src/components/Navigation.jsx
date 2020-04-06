import React from 'react'
import './Navigation.css'
import './../../node_modules/semantic-ui-css/semantic.css'
import Logo from '../img/plant-icon.png'


const Navigation = props => {
    return (
        <div className='navigation'>
            <div className='nav-logo'>
                <img className="logo-img" src={Logo} />myPlant
            </div>
            {/* <div className='menu-list'>
                <ul>
                    <li><i className='icon add circle' /></li>
                </ul>
            </div> */}
        </div>
    )
}

export default Navigation