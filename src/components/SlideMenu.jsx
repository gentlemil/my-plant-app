import React, { Component } from 'react'
import './SlideMenu.css'

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
                    <li><a href='#'>MY PLANTS</a></li>
                    <li><a href='#'>MY CATEGORIES</a></li>
                    <li><a href='#'>SEARCH</a></li>
                    <li><a href='#'>CONTACT</a></li>
                </ul>
            </div>

        )
    }
}

export default SlideMenu;