import React from 'react'
// import PropTypes from 'prop-types'
import './Countdown.css'

import './../node_modules/semantic-ui-css/semantic.css'

const Countdown = props => (
    <div className='countdown'>
        <div className='main-line'>
            <strong>{props.plantName}</strong>
            <div className='countdown__icons'>
                <i className='icon edit' onClick={() => props.onEditInit(props.id)} />
                <i className='icon times' onClick={() => props.onRemove(props.id)} />
            </div>
        </div>
        <div className='details ui form'>
            <div className='fields'>
                <p className='six wide field'>Category: {props.plantCategory}</p>
                <p className='six wide field'>Experience: {props.plantDifficulty}</p>
                <p className='eight wide field'>Optimal temperature: {props.requiredTemperature}</p>
            </div>
        </div>


    </div>
)

// Countdown.propTypes = {
//     name: PropTypes.string,
//     hour: PropTypes.string,
//     minute: PropTypes.string,
// }

export default Countdown

