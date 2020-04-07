import React, { Component } from 'react'
import './SlideMenu.css'

import App from '../App.jsx'
import ShowPlant from './ShowPlant.jsx'
import EditPlant from './EditPlant.jsx'
import CategoryItem from './categories/CategoryItem';
import Plant from './plants/Plant';

class SlideMenu extends Component {
    render() {

        let visibility = 'hide'

        if (this.props.menuVisibility) {
            visibility = 'show'
        }

        return (

            <div
                id='flyoutMenu'
                className={visibility}
                onMouseDown={this.props.handleMouseDown}
            >

                <ul>
                    <li><a href='#'>MAIN PAGE</a></li>
                    <li><a href='#'>ADD NEW PLANT</a></li>
                    <li><a href='#'>MY PLANTS localStorage</a></li>
                    <li><a href='#'>MY PLANTS api</a></li>
                    <li><a href='#'>MY CATEGORIES api</a></li>
                    <li><a href='#'>CONTACT</a></li>
                </ul>
            </div>
        )
    }
}

export default SlideMenu;

