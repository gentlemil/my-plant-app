import React from 'react';
import './EditPlant.css'
import PropTypes from 'prop-types'
import {
    isValidNumberInput,
    parseInputAsNumber,
    // isValidName,
    isValidHour,
    isValidMinute,

} from '../utils'


const EditPlant = props => {

    // sprawdza czy godzina i minuta zostaly poprawnie podane
    const isFormValid =
        isValidHour(props.hour) &&
        isValidMinute(props.minute)

    // sprawdza czy formularz jest pusty, aby uruchomic przycisk 'cancel'
    const isFormEmpty =
        props.plantName === '' &&
        props.plantCategory === '' &&
        props.plantRoom === '' &&
        props.hour === -1 &&
        props.minute === -1 &&
        props.fertilizingInterval === '' &&
        props.requiredExposure === '' &&
        props.requiredTemperature === '' &&
        props.requiredHumidity === '' &&
        props.plantBlooming === '' &&
        props.plantDifficulty === ''

    return (
        <div className='edit-event ui form'>
            <h1 className='section-name'>Add new plant</h1>

            <div className='fields'>
                <div className='edit-event__input-group ten wide field'>
                    <label htmlFor='plantName'>Name</label>     {/* htmlFor to to samo co className  */}
                    <input
                        type='text'
                        id='plantName'
                        name='plantName'
                        value={props.plantName}
                        placeholder='e.g Rhipsalis'
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
                        placeholder='choose one'
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
                        placeholder='choose one'
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

                {/* <div className='edit-event__input-group five wide field'>
                    <label htmlFor='wateringInterval'>Watering Interval:</label>
                    <input
                        type='text'
                        id='wateringInterval'
                        name='wateringInterval'
                        value={props.wateringInterval}
                        onKeyPress={e => isValidNumberInput(e)}
                        onChange={
                            e => props.onInputChange({ [e.target.name]: [e.target.value] })
                        }
                    />
                </div> */}

                <div className='edit-event__input-group three wide field'>
                    <label htmlFor='wateringInterval'>Watering time:</label>
                    <div className='input-together'>
                        <input
                            type='tel'
                            id='hour'
                            name='hour'
                            placeholder='hour'
                            value={props.hour === -1 ? '' : props.hour}
                            onKeyPress={e => isValidNumberInput(e)}
                            onChange={
                                e => props.onInputChange({
                                    [e.target.name]: parseInputAsNumber(e.target.value)
                                })
                            }
                        />
                        <input
                            type='tel'
                            id='minute'
                            name='minute'
                            placeholder='minute'
                            value={props.minute === -1 ? '' : props.minute}
                            onKeyPress={e => isValidNumberInput(e)}
                            onChange={
                                e => props.onInputChange({
                                    [e.target.name]: parseInputAsNumber(e.target.value)
                                })
                            }
                        />
                    </div>

                </div>
                <div className='edit-event__input-group five wide field'>
                    <label htmlFor='fertilizingInterval'>Fertilizing Interval:</label>
                    <input
                        type='text'
                        id='fertilizingInterval'
                        name='fertilizingInterval'
                        placeholder='how mamny times per year'
                        value={props.fertilizingInterval}
                        onKeyPress={e => isValidNumberInput(e)}
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
                        placeholder='type in hours'
                        value={props.requiredExposure}
                        onKeyPress={e => isValidNumberInput(e)}
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
                        placeholder='type in celsius degree'
                        value={props.requiredTemperature}
                        onKeyPress={e => isValidNumberInput(e)}
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
                        placeholder='type in percent'
                        value={props.requiredHumidity}
                        onKeyPress={e => isValidNumberInput(e)}
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
                        placeholder='choose one'
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

            {/* form ok --> isformvalid --> true
            form nie ok --> isformvalid --> false
            guzik odblokowany ---> false
            guzik zablokowany ---> true */}
            <button className='ui primary button' disabled={!isFormValid} onClick={() => props.onSave()}>OK</button>
            <button className='ui button' onClick={() => props.onCancel()} disabled={isFormEmpty} >CANCEL</button>
            {/* </div> */}
        </div>
    );
};

EditPlant.propTypes = {
    plantName: PropTypes.string,
    plantCategory: PropTypes.string,
    plantRoom: PropTypes.string,
    // wateringInterval: PropTypes.number,
    hour: PropTypes.number,
    minute: PropTypes.number,
    fertilizingInterval: PropTypes.number,
    requiredExposure: PropTypes.number,
    requiredTemperature: PropTypes.number,
    requiredHumidity: PropTypes.number,
    // plantBlooming: PropTypes.number,
    plantDifficulty: PropTypes.string,

    onInputChange: PropTypes.func,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
}

export default EditPlant