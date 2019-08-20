import React, { Component } from 'react'
import clubService from '../services/club-service';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import {ReactComponent as Clouse} from './icons8-delete_sign.svg'
import {Redirect} from 'react-router-dom'

class EventDetils extends Component {
    state = {
        event: {},
        physicalDrain: '',
        rivalGoals: '',
        myGoals: '',
        type: '',
        id: this.props.match.params.id,
        isRedirect: false
    }
    componentDidMount = () => {
        clubService.findEventById(this.props.match.params.id)
        .then(r => {
            this.setState({
                event: r.data,
                type: r.data.type
            })
        })
        .catch(e => console.log(e))
    }

    deleteEvent = (event) => {
        event.preventDefault();
        clubService.deleteEventById(this.props.match.params.id)
        .then(() => this.setState({
            isRedirect: true
        }))
        .catch(e => console.log(e))
    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        clubService.updateEvent(this.state)
        .then(() => this.setState({
            isRedirect: true
        }))
        .catch(e => console.log(e))
    }

    render() {
        const {event} = this.state
        console.log(event)
        return (
            <div className='club-interface'>
            {this.state.isRedirect ? <Redirect to='/private' /> : null}
            <Link to='/private'>
                <div className='clouse-bar' onClick={this.cluse}>
                        <h2 className='principal-title'><Moment format="D MMM YYYY" withTitle>
                        {event.date}
                        </Moment></h2>
                        <Clouse fill='#43B28A' id='clouseCruz'/>
                </div>
            </Link>
                <div className='five-pixels-before'></div>
                {event.type === 'match' ? <form onSubmit={this.handleSubmit}>
                    <label htmlFor='myGoals'>Team Goals:</label>
                    <input id='myGoals' type='number' name='myGoals' onChange={this.handleChange} value={this.state.myGoals}/>
                    <label htmlFor='rivalGoals'>Rival Goals:</label>
                    <input id='rivalGoals' type='number' name='rivalGoals' onChange={this.handleChange} value={this.state.rivalGoals}/>
                    <label htmlFor='physicalDrain'>Physical Drain:</label>
                    <input id='physicalDrain' type='number' name='physicalDrain' value={this.state.physicalDrain} onChange={this.handleChange} />
                    <div className='delete-event-botton'>
                        <button onClick={this.deleteEvent}>Delete Event</button>
                        <input className='submit-event' type='submit' value='Match is Finish' />
                    </div>
                </form> : 
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='physicalDrain'>Physical Drain:</label>
                    <input id='physicalDrain' type='number' name='physicalDrain' value={this.state.physicalDrain} onChange={this.handleChange} />
                    <div className='delete-event-botton'>
                        <button onClick={this.deleteEvent}>Delete Event</button>
                        <input className='submit-event' type='submit' value='Train is Finish' />
                    </div>
                </form>}
            </div>
        )
    }
}


export default EventDetils