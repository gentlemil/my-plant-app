import React, { Component } from 'react'
import './SlideMenuButton.css'

import './../semantic-ui-css/semantic.css'

class SlideMenuButton extends Component {
    render() {
        return (
            <button
                id='hamburger'
                onMouseDown={this.props.handleMouseDown}>
                <i class="bars icon"></i>
            </button>
        );
    }
}

export default SlideMenuButton;