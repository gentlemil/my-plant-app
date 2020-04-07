import React, { Component } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router-dom'
import './App.css'
import uniqid from 'uniqid'
import axios from 'axios';

import Navigation from './components/Navigation.jsx'
import SlideMenu from './components/SlideMenu.jsx'
import SlideMenuButton from './components/SlideMenuButton.jsx'
import ShowPlant from './components/ShowPlant.jsx'
import EditPlant from './components/EditPlant.jsx'

import CategoryItem from './components/categories/CategoryItem';
import Plant from './components/plants/Plant';



const CATEGORIES_FETCH_DELAY = 50;
const PLANTS_FETCH_DELAY = 50;

class App extends Component {
    // Funkcja ktora zawsze wywolyje sie automatycznie z clasa app
    constructor(props) {
        super(props);
        this.state = {
            now: {
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                seconds: new Date().getSeconds()
            },
            // myPlants sluzy do przechowywania roslin, ktore posiadamy.
            myPlants: [
                {
                    id: 0,
                    plantName: 'Eszeweria',
                    plantCategory: 'succulent',
                    plantRoom: 'bedroom',
                    // wateringInterval: '11',
                    hour: 10,
                    minute: 0,
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
                    // wateringInterval: '11',
                    hour: 15,
                    minute: 0,
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
                    // wateringInterval: '11',
                    hour: 20,
                    minute: 0,
                    fertilizingInterval: '100',
                    requiredExposure: '90',
                    requiredTemperature: '30',
                    requiredHumidity: '40',
                    plantBlooming: true,
                    plantDifficulty: 'medium',
                    isPalidrome: false,
                },
            ],
            // editedMyPlant jest jakby szablonem kazdej rosliny z wartosciami poczatkowymi
            editedMyPlant: {
                id: uniqid(),
                plantName: '',
                plantCategory: '',
                plantRoom: '',
                // wateringInterval: '11',
                hour: -1,
                minute: -1,
                fertilizingInterval: '',
                requiredExposure: '',
                requiredTemperature: '',
                requiredHumidity: '',
                plantBlooming: '',
                plantDifficulty: '',
                isPalidrome: false,
            },

            visible: false,
            categories: [],
            // plants: [],
            successCategories: undefined,
            successPlants: undefined,
            inProgress: true,
            // value: '',
        }

    }

    // --------------------------------------------------------------------------------------------
    // Fukcje wykorzystywane przez sliding-menu ---------------------------------------------------
    handleMouseDown = (e) => {
        this.toggleMenu();
        console.log('menu button has been clicked')
        e.stopPropagation();
    }

    toggleMenu = () => {
        this.setState({
            visible: !this.state.visible
        });
    }


    // --------------------------------------------------------------------------------------------
    // Fukcje wykorzystywane przez formularz ------------------------------------------------------
    handleEditMyPlant = (val) => {
        // this.setState({ editedMyPlants: val })    // nadpisuje zmiany, tracimy poprzednie dane
        this.setState(prevState => {
            return {
                editedMyPlant: Object.assign(prevState.editedMyPlant, val)
            }
        })
    }

    handleSaveMyPlant = () => {
        this.setState(prevState => {
            const editedMyPlantExists = prevState.myPlants.find(
                el => el.id === prevState.editedMyPlant.id
            )

            let updatedMyPlants;
            if (editedMyPlantExists) {
                updatedMyPlants = prevState.myPlants.map(el => {
                    if (el.id === prevState.editedMyPlant.id)
                        return prevState.editedMyPlant
                    else
                        return el;
                })
            } else {
                updatedMyPlants = [...prevState.myPlants, prevState.editedMyPlant]
            }

            return {
                myPlants: updatedMyPlants,
                editedMyPlant: {
                    id: uniqid(),
                    plantName: '',
                    plantCategory: '',
                    plantRoom: '',
                    // wateringInterval: '',
                    hour: '',
                    minute: '',
                    fertilizingInterval: '',
                    requiredExposure: '',
                    requiredTemperature: '',
                    requiredHumidity: '',
                    plantBlooming: '',
                    plantDifficulty: '',
                    isPalidrome: false,
                },
            }
        },
            // zapisywanie danych w localStorage
            () => localStorage.setItem('myPlants', JSON.stringify(this.state.myPlants))

        )

        // alert('bumszakalaka!')
        // this.setState(prevState => ({
        //     myPlants: [...prevState.myPlants, prevState.editedMyPlant],
        //     // editedMyPlant musimy ustawic tak, zeby dane z formularza nie zostawaly w pamieci
        //     editedMyPlant: {
        //         id: uniqid(),
        //         name: '',
        //         hour: '',
        //         minute: ''
        //     },
        // }))
    }

    handleRemoveMyPlant = (id) => {
        this.setState(prevState => ({
            myPlants: prevState.myPlants.filter(el => el.id !== id)
        }),
            // zapisywanie, a raczej usuwanie b danych w localStorage
            () => localStorage.setItem('myPlants', JSON.stringify(this.state.myPlants))

        )
    }

    handleEditInit = (id) => {
        // console.log(id)
        this.setState(prevState => ({
            // editedMyPlant: { ...prevState.myPlants[id] }
            editedMyPlant: { ...prevState.myPlants.find(el => el.id === id) }
        }))
    }

    handleEditCancel = () => {
        // setState bo na szctywno wpisuje, nie odnosimy sie do 
        // przeszlosci, dlatego nieuzywamy prevState
        this.setState({
            editedMyPlant: {
                id: uniqid(),
                plantName: '',
                plantCategory: '',
                plantRoom: '',
                // wateringInterval: '11',
                hour: -1,
                minute: -1,
                fertilizingInterval: '',
                requiredExposure: '',
                requiredTemperature: '',
                requiredHumidity: '',
                plantBlooming: '',
                plantDifficulty: '',
                isPalidrome: false,
            },
        })
    }

    timer = () => {
        this.setState({
            now: {
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                seconds: new Date().getSeconds()
            }
        });
    }

    palindrome = (str) => {
        let reserved = str.split('').reserved().join('')
        return str === reserved ? true : false
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevState.plantName + '--->' + this.state.plantName)

        if (this.state.plantName === 'kaktus') {
            (this.setState({ isPalidrome: true }))
        }
    }

    // --------------------------------------------------------------------------------------------
    // Fukcje wykorzystywane do wyswietlania roslin i kategorii z API -----------------------------

    componentDidMount = () => {
        // console.log('componentDidMount');

        const storageMyPlants = JSON.parse(localStorage.getItem('myPlants')) || [];
        this.setState({ myPlants: storageMyPlants })
        console.log(storageMyPlants)

        const stopProgress = () => {
            console.log('stopProgress');
            this.setState({ inProgress: false });
        };

        const allPromises = Promise.allSettled([
            this.fetchCategories(),
            this.fetchPlants()
        ]).then(stopProgress);

        // funckja pozwalajaca na odliczanie czasu, dodatkowo umieszczamy ja w stanie,
        // zeby mozna bylo sie do niej odniesc w przyszlosci w razie potrzeby
        const intervalId = setInterval(this.timer, 1000);
        this.setState({ intervalId: intervalId })

    }

    // zerowanie timera
    componentDidUnmount() {
        clearInterval(this.state.intervalId)
    }

    delayFetch = (ms, method) => {
        return new Promise((resolve, reject) => setTimeout(() => method(resolve, reject), ms));
    }

    fetchCategories = () => {
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

    fetchPlants = () => {
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
        const myPlants = this.state.myPlants.map(el => {
            return <ShowPlant
                // key i id to nie to samo, key to info dla reacta, a id to info dla komponentu
                key={el.id}
                id={el.id}
                plantName={el.plantName}
                plantCategory={el.plantCategory}
                plantRoom={el.plantRoom}
                // wateringInterval={el.wateringInterval}
                hour={el.hour}
                minute={el.minute}
                fertilizingInterval={el.fertilizingInterval}
                requiredExposure={el.requiredExposure}
                requiredTemperature={el.requiredTemperature}
                requiredHumidity={el.requiredHumidity}
                plantBlooming={el.plantBlooming}
                plantDifficulty={el.plantDifficulty}
                isPalidrome={el.isPalidrome}

                timeNow={this.state.now}
                onRemove={id => this.handleRemoveMyPlant(id)}
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
                <SlideMenuButton handleMouseDown={this.handleMouseDown} />
                <SlideMenu
                    handleMouseDown={this.handleMouseDown}
                    menuVisibility={this.state.visible}
                />
                <Navigation />
                <BrowserRouter>

                    <div className="ui pointing menu menu-home">
                        <Link to='/' className="item active item-home">PLANTS</Link>
                        <Link to='/add-plant' className="item item-home">ADD</Link>
                        <Link to='/categories' className="item item-home">CATEGORIES</Link>
                        {/* <a className="item item-home">TO DO</a> */}
                        <div className="right menu">
                            <div className="item">
                                <div className="ui transparent icon input">
                                    <input type="text" placeholder="Search..." class="" />
                                    <i className="search link icon"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Routes>
                        <Route
                            path='/'
                            element={myPlants} />
                        <Route
                            path='/add-plant'
                            element={<EditPlant
                                // ------- tutaj sprawiamy, ze nasz formularz sie czysci
                                plantName={this.state.editedMyPlant.plantName}
                                plantCategory={this.state.editedMyPlant.plantCategory}
                                plantRoom={this.state.editedMyPlant.plantRoom}
                                // wateringInterval={this.state.editedMyPlant.wateringInterval}
                                hour={this.state.editedMyPlant.hour}
                                minute={this.state.editedMyPlant.minute}
                                fertilizingInterval={this.state.editedMyPlant.fertilizingInterval}
                                requiredExposure={this.state.editedMyPlant.requiredExposure}
                                requiredTemperature={this.state.editedMyPlant.requiredTemperature}
                                requiredHumidity={this.state.editedMyPlant.requiredHumidity}
                                plantBlooming={this.state.editedMyPlant.plantBlooming}
                                plantDifficulty={this.state.editedMyPlant.plantDifficulty}
                                // -------
                                onInputChange={val => this.handleEditMyPlant(val)}
                                // onSave={() => alert('bumbum!')}
                                onSave={() => this.handleSaveMyPlant()}
                                onCancel={() => this.handleEditCancel()}
                            />} />
                        <Route
                            path='/categories'
                            element={categories.map((item, index, arr) =>
                                <CategoryItem
                                    category={item}
                                    label='category'
                                    key={index}
                                    isLastItem={arr.length - 1 === index}
                                    index={index}
                                />
                            )}
                        />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;