import React, { Component } from 'react'
import './App.css'

import Countdown from './Countdown.jsx'
import EditEvent from './EditEvent'
import uniqid from 'uniqid'

import axios from 'axios';
// import { Button, Input, Label } from 'reactstrap';
import CategoryItem from './components/categories/CategoryItem';
import Plant from './components/plants/Plant';

const CATEGORIES_FETCH_DELAY = 50;
const PLANTS_FETCH_DELAY = 50;

class App extends Component {
    // Funkcja ktora zawsze wywolyje sie automatycznie z clasa app
    constructor() {
        super();
        this.state = {
            // events sluzy do przechowywania roslin, ktore posiadamy.
            events: [
                {
                    id: 0,
                    plantName: 'Eszeweria',
                    plantCategory: 'succulent',
                    plantRoom: 'bedroom',
                    wateringInterval: '11',
                    fertilizingInterval: '22',
                    requiredExposure: '33',
                    requiredTemperature: '44',
                    requiredHumidity: '77',
                    plantBlooming: true,
                    plantDifficulty: 'beginner',
                    isPalidrome: false,
                },
                {
                    id: 1,
                    plantName: 'Rhipsalis',
                    plantCategory: 'succulent',
                    plantRoom: 'kitchen',
                    wateringInterval: '22',
                    fertilizingInterval: '33',
                    requiredExposure: '44',
                    requiredTemperature: '55',
                    requiredHumidity: '66',
                    plantBlooming: true,
                    plantDifficulty: 'medium-low',
                    isPalidrome: false,
                },
                {
                    id: 2,
                    plantName: 'Lophophora williamsii',
                    plantCategory: 'cacti',
                    plantRoom: 'kitchen',
                    wateringInterval: '100',
                    fertilizingInterval: '100',
                    requiredExposure: '90',
                    requiredTemperature: '30',
                    requiredHumidity: '40',
                    plantBlooming: true,
                    plantDifficulty: 'medium',
                    isPalidrome: false,
                },
            ],
            // editedEvent jest jakby szablonem kazdej rosliny z wartosciami poczatkowymi
            editedEvent: {
                id: uniqid(),
                plantName: '',
                plantCategory: '',
                plantRoom: '',
                wateringInterval: '',
                fertilizingInterval: '',
                requiredExposure: '',
                requiredTemperature: '',
                requiredHumidity: '',
                plantBlooming: '',
                plantDifficulty: '',
                isPalidrome: false,
            },

            categories: [],
            // plants: [],
            successCategories: undefined,
            successPlants: undefined,
            inProgress: true,
            // value: '',
        }
        // przerobic, bind jest przestarzaly
        this.handleEditEvent = this.handleEditEvent.bind(this)
        this.handleSaveEvent = this.handleSaveEvent.bind(this)
        this.handleRemoveEvent = this.handleRemoveEvent.bind(this)
        this.handleEditInit = this.handleEditInit.bind(this)
    }

    // --------------------------------------------------------------------------------------------
    // Fukcje wykorzystywane przez formularz ------------------------------------------------------
    handleEditEvent(val) {
        console.log(val)
        // this.setState({ editedEvents: val })    // nadpisuje zmiany, tracimy poprzednie dane
        this.setState(prevState => {
            return {
                editedEvent: Object.assign(prevState.editedEvent, val)
            }
        })
    }

    handleSaveEvent() {
        this.setState(prevState => {
            const editedEventExists = prevState.events.find(
                el => el.id === prevState.editedEvent.id
            )

            let updatedEvents;
            if (editedEventExists) {
                updatedEvents = prevState.events.map(el => {
                    if (el.id === prevState.editedEvent.id)
                        return prevState.editedEvent
                    else
                        return el;
                })
            } else {
                updatedEvents = [...prevState.events, prevState.editedEvent]
            }

            return {
                events: updatedEvents,
                editedEvent: {
                    id: uniqid(),
                    name: '',
                    hour: '',
                    minute: ''
                },
            }
        })

        // alert('bumszakalaka!')
        // this.setState(prevState => ({
        //     events: [...prevState.events, prevState.editedEvent],
        //     // editedEvent musimy ustawic tak, zeby dane z formularza nie zostawaly w pamieci
        //     editedEvent: {
        //         id: uniqid(),
        //         name: '',
        //         hour: '',
        //         minute: ''
        //     },
        // }))
    }

    handleRemoveEvent(id) {
        this.setState(prevState => ({
            events: prevState.events.filter(el => el.id !== id)
        }))
    }

    handleEditInit(id) {
        // console.log(id)
        this.setState(prevState => ({
            // editedEvent: { ...prevState.events[id] }
            editedEvent: { ...prevState.events.find(el => el.id === id) }
        }))
    }

    // --------------------------------------------------------------------------------------------
    // Fukcje wykorzystywane do wyswietlania roslin i kategorii z API -----------------------------

    componentDidMount() {
        // console.log('componentDidMount');

        const stopProgress = () => {
            console.log('stopProgress');
            this.setState({ inProgress: false });
        };

        const allPromises = Promise.allSettled([
            this.fetchCategories(),
            this.fetchPlants()
        ]).then(stopProgress);

    }

    delayFetch(ms, method) {
        return new Promise((resolve, reject) => setTimeout(() => method(resolve, reject), ms));
    }

    fetchCategories() {
        const requestUrl = 'http://gentle-tor-07382.herokuapp.com/categories/';

        return this.delayFetch(CATEGORIES_FETCH_DELAY, (resolve, reject) => {
            axios.get(requestUrl)
                .then((response) => {
                    const data = response.data;
                    const categories = data.map((item) => item.name);
                    const successCategories = true;
                    this.setState({ categories, successCategories });
                    resolve();
                })
                .catch((error) => {
                    this.setState({ successCategories: false });
                    reject();
                })
                .finally(() => {
                    console.log('Resolved');
                });
        });
    }

    fetchPlants() {
        const requestUrl = 'http://gentle-tor-07382.herokuapp.com/plants/';

        return this.delayFetch(PLANTS_FETCH_DELAY, (resolve, reject) => {
            axios.get(requestUrl)
                .then((response) => {
                    const data = response.data;
                    const plants = data.map((item) => item.name);
                    const successPlants = true;
                    this.setState({ plants, successPlants });
                    resolve();
                })
                .catch((error) => {
                    this.setState({ successPlants: false });
                    reject();
                });
        });
    }



    // --------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------
    render() {
        const events = this.state.events.map(el => {
            return <Countdown
                key={el.id}
                plantName={el.plantName}
                plantCategory={el.plantCategory}
                plantRoom={el.plantRoom}
                wateringInterval={el.wateringInterval}
                fertilizingInterval={el.fertilizingInterval}
                requiredExposure={el.requiredExposure}
                requiredTemperature={el.requiredTemperature}
                requiredHumidity={el.requiredHumidity}
                plantBlooming={el.plantBlooming}
                plantDifficulty={el.plantDifficulty}
                onRemove={id => this.handleRemoveEvent(id)}
                onEditInit={id => this.handleEditInit(id)}
            />
        })

        const {
            categories,
            plants,
            inProgress,
            successCategories,
            successPlants,
            // value,
            isPalidrome,
        } = this.state;

        return (
            <div className='app'>
                {events}
                <EditEvent
                    // ------- tutaj sprawiamy, ze nasz formularz sie czysci
                    plantName={this.state.editedEvent.plantName}
                    plantCategory={this.state.editedEvent.plantCategory}
                    plantRoom={this.state.editedEvent.plantRoom}
                    wateringInterval={this.state.editedEvent.wateringInterval}
                    fertilizingInterval={this.state.editedEvent.fertilizingInterval}
                    requiredExposure={this.state.editedEvent.requiredExposure}
                    requiredTemperature={this.state.editedEvent.requiredTemperature}
                    requiredHumidity={this.state.editedEvent.requiredHumidity}
                    plantBlooming={this.state.editedEvent.plantBlooming}
                    plantDifficulty={this.state.editedEvent.plantDifficulty}
                    // -------
                    onInputChange={val => this.handleEditEvent(val)}
                    // onSave={() => alert('bumbum!')}
                    onSave={() => this.handleSaveEvent()}
                />

                <div className="app-container">
                    {
                        inProgress && <p>Loading data...</p>
                    }
                    {
                        successCategories === false &&
                        <p>Nie udało się pobrać Kategorii</p>
                    }
                    {
                        successPlants === false &&
                        <p>Nie udało się pobrać Kwiatow</p>
                    }
                    {
                        successPlants &&
                        <div className="plants">
                            {
                                plants.map((plant, index, arr) =>
                                    <Plant
                                        name={plant}
                                        key={index}
                                    />
                                )
                            }
                        </div>
                    }
                    {
                        successCategories &&
                        <div className="categories">
                            {
                                categories.map((item, index, arr) =>
                                    <CategoryItem
                                        category={item}
                                        label='category'
                                        key={index}
                                        isLastItem={arr.length - 1 === index}
                                        index={index}
                                    />
                                )
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}

// const App = () => ();

export default App;