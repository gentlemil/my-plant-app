import React from 'react';
import './EditEvent.css'

// import { isValidNumberInput } from './utils'


const EditEvent = props => {
    return (
        <div className='edit-event ui form'>

            <div className='fields'>
                <div className='edit-event__input-group ten wide field'>
                    <label htmlFor='plantName'>Name</label>     {/* htmlFor to to samo co className  */}
                    <input
                        type='text'
                        id='plantName'
                        name='plantName'
                        value={props.plantName}
                        onChange={e =>
                            props.onInputChange({ [e.target.name]: e.target.value })
                        }
                    />
                </div>
                <div className='edit-event__input-group six wide field'>
                    <label htmlFor='hour'>Plant Category:</label>     {/* htmlFor to to samo co className  */}
                    <select

                        id='plantCategory'
                        name='plantCategory'
                        value={props.plantCategory}

                        onChange={
                            e => props.onInputChange({ [e.target.name]: [e.target.value] })
                        }

                    >
                        <option value='succulent'>succulent</option>
                        <option value='tillandsia'>tillandsia</option>
                        <option value='cacti'>cacti</option>
                        <option value='orchids'>orchids</option>
                        <option value='green-plant'>green-plant</option>
                        <option value='house-plant'>house-plant</option>
                        <option value='other'>other</option>
                    </select>
                </div>
            </div>


            <div className='fields'>
                <div className='edit-event__input-group six wide field'>
                    <label htmlFor='plantRoom'>Plant Room:</label>     {/* htmlFor to to samo co className  */}
                    <select
                        id='plantRoom'
                        name='plantRoom'
                        value={props.plantRoom}

                        onChange={
                            e => props.onInputChange({ [e.target.name]: [e.target.value] })
                        }
                    >
                        <option value='living-room'>living room</option>
                        <option value='bedroom'>bedroom</option>
                        <option value='bathroom'>bathroom</option>
                        <option value='kitchen'>kitchen</option>
                        <option value='balcony'>balcony</option>
                        <option value='sleeping-room'>sleeping room</option>
                    </select>
                </div>

                {/* ---------------------------------- */}

                <div className='edit-event__input-group five wide field'>
                    <label htmlFor='wateringInterval'>Watering Interval:</label>
                    <input
                        type='text'
                        id='wateringInterval'
                        name='wateringInterval'
                        value={props.wateringInterval}

                        onChange={
                            e => props.onInputChange({ [e.target.name]: [e.target.value] })
                        }
                    />
                </div>
                <div className='edit-event__input-group five wide field'>
                    <label htmlFor='fertilizingInterval'>Fertilizing Interval:</label>
                    <input
                        type='text'
                        id='fertilizingInterval'
                        name='fertilizingInterval'
                        value={props.fertilizingInterval}

                        onChange={
                            e => props.onInputChange({ [e.target.name]: [e.target.value] })
                        }
                    />
                </div>
            </div>


            <div className='fields'>
                <div className='edit-event__input-group six wide field'>
                    <label htmlFor='requiredExposure'>Required Exposure:</label>
                    <input
                        type='text'
                        id='requiredExposure'
                        name='requiredExposure'
                        value={props.requiredExposure}

                        onChange={
                            e => props.onInputChange({ [e.target.name]: [e.target.value] })
                        }
                    />
                </div>
                <div className='edit-event__input-group six wide field'>
                    <label className='requiredTemperature'>Required Temperature:</label>
                    <input
                        type='text'
                        id='requiredTemperature'
                        name='requiredTemperature'
                        value={props.requiredTemperature}

                        onChange={
                            e => props.onInputChange({ [e.target.name]: [e.target.value] })
                        }
                    />
                </div>
                <div className='edit-event__input-group six wide field'>
                    <label htmlFor='requiredHumidity'>Required Humidity:</label>
                    <input
                        type='text'
                        id='requiredHumidity'
                        name='requiredHumidity'
                        value={props.requiredHumidity}

                        onChange={
                            e => props.onInputChange({ [e.target.name]: [e.target.value] })
                        }
                    />
                </div>
            </div>

            <div className='fields'>
                <div className='edit-event__input-group four wide field'>
                    <label htmlFor='plantBlooming'>Blooming:</label>
                    <input
                        type='checkbox'
                        id='plantBlooming'
                        name='plantBlooming'
                        checked={props.plantBlooming}
                        value={props.plantBlooming}

                        onChange={
                            e => props.onInputChange({ [e.target.name]: [e.target.value] })
                        }
                    />
                </div>
                <div className='edit-event__input-group eight wide field'>
                    <label htmlFor='plantDifficulty'>Difficulty:</label>
                    <select

                        id='plantDifficulty'
                        name='plantDifficulty'
                        value={props.plantDifficulty}

                        onChange={
                            e => props.onInputChange({ [e.target.name]: [e.target.value] })
                        }
                    >
                        <option value='beginner'>beginner</option>
                        <option value='medium-low'>medium-low</option>
                        <option value='medium'>medium</option>
                        <option value='medium-high'>medium-high</option>
                        <option value='high'>high</option>
                    </select>
                </div>

            </div>



            {/* ---------------------------------- */}

            {/* <div className='fields'> */}
            <button className='ui primary button ' onClick={() => props.onSave()}>OK</button>
            <button className='ui button '>CANCEL</button>
            {/* </div> */}
        </div>
    );
};

export default EditEvent