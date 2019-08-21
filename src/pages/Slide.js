import React, { Component } from 'react'
import withAuth from '../components/withAuth'
import {Redirect} from 'react-router-dom'

class Slide extends Component {
    render() {
        return (
            <div>
                <Redirect to='/login' />
            </div>
        )
    }
}

export default withAuth(Slide)