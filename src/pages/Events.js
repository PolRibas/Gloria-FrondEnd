import React, { Component } from 'react'
import {ReactComponent as Clouse} from './icons8-delete_sign.svg'
import { Link } from 'react-router-dom';
import clubService from '../services/club-service'
import withAuth from '../components/withAuth'

class Events extends Component {
    state = {
        club: {},
        teams: [],
    }
    componentDidMount = () => {
        const id = this.props.user.id
        clubService.loadEvents()
        .then( r => this.setState({teams: r.data}))
        .catch( e => console.log(e))
    }
    render() {
        console.log(this.state.teams)
        return (
            <div>
                <h2>Create a newEvent</h2>
            </div>
        )
    }
}

export default withAuth(Events)