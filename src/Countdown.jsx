import React from 'react'
import PropTypes from 'prop-types'
import './Countdown.css'
import {
    hourMinuteToSeconds,
    secondsToHourMinuteSecond,

} from './utils'

import './../node_modules/semantic-ui-css/semantic.css'

const Countdown = props => {
    // console.log(hourMinuteToSeconds(props.hour, props.minute))
    // console.log(hourMinuteToSeconds(props.timeNow.hour, props.timeNow.minute))
    const eventInSeconds = hourMinuteToSeconds(props.hour, props.minute)
    const nowInSeconds = hourMinuteToSeconds(
        props.timeNow.hour,
        props.timeNow.minute
    ) + props.timeNow.seconds

    const diff = eventInSeconds - nowInSeconds;

    // const diffText = diff > 0 ? diff : 'tomorrow'    //wyswietli calkowita liczbe sekund, niezbyt ladnie
    const diffText = diff > 0 ? secondsToHourMinuteSecond(diff) : 'tomorrow'

    return (
        <div className='plant-container'>
            <div className='countdown'>
                <div className='main-line'>
                    <strong>{props.plantName}</strong>
                    <div className='countdown__icons'>
                        <i className='icon edit' onClick={() => props.onEditInit(props.id)} />
                        <i className='icon times' onClick={() => props.onRemove(props.id)} />
                    </div>
                </div>
                <div className='details'>
                    <div className='col'>
                        {/* <p className='element'><i class="calendar alternate outline icon"></i>water me in: {props.wateringInterval}minutes</p> */}
                        {/* <p className='element'><i class="calendar alternate outline icon"></i>watering time: {props.hour}:{props.minute}</p> */}
                        <p className='element'><i class="calendar alternate outline icon"></i>watering time in: {diffText}</p>

                        <p className='element'><i class="leaf icon"></i> {props.plantCategory}</p>
                        <p className='element'><i class="map pin icon"></i> {props.plantRoom}</p>
                        <p className='element'><i class="info icon"></i> {props.fertilizingInterval} times/year</p>
                        <p className='element'><i class="sun icon"></i> {props.requiredExposure} hours/day</p>
                        <p className='element'><i class="thermometer half icon"></i>{props.requiredTemperature}&#8451;</p>
                        <p className='element'><i class="cloud icon"></i> {props.requiredHumidity}%</p>
                        <p className='element'>Blooming: {props.plantBlooming}</p>
                        <p className='element'><i class="rocket icon"></i> {props.plantDifficulty}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

Countdown.propTypes = {
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
    timeNow: PropTypes.shape({
        hour: PropTypes.number,
        minute: PropTypes.number,
        seconds: PropTypes.number
    }),
    onEditInit: PropTypes.func,
    onRemove: PropTypes.func

}

export default Countdown

