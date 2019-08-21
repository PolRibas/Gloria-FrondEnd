import React, { Component } from 'react'

export default class Loading extends Component {
    render() {
        return (
            <div className='loading-container-flex'>
                <div class="loading-container">
                    <div class="loading"></div>
                    <div id="loading-text">loading</div>
                </div>
            </div>
        )
    }
}
