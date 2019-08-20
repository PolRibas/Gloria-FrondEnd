import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import clubService from '../services/club-service'
import withAuth from '../components/withAuth'
import Moment from 'react-moment';

class Events extends Component {
    state = {
        club: {},
        teams: [],
        isMyClub: false,
        classname: 'events-container'
    }
    componentDidMount = () => {
        clubService.loadEvents()
        .then( r => this.setState({teams: r.data}))
        .catch( e => console.log(e))
    }

    IamTrainer = (team) => {
        let response = false
        team.treiners.forEach((coach) => {
            if(coach === this.props.user.id) {
                response = true
            }
        })
        return response
    }

    render() {
        const {teams} = this.state
        return (
            <>
            <div className='events-container'>
               {teams ? 
                teams.map((team) => {
                    return team.events.map((event) => {
                        return event.done ? null: <section key={event._id} className='events-container'>
                            {this.IamTrainer(team) ? <Link to={`/event/${event._id}`}>
                                <div>
                                    <div>
                                        <Moment format="D MMM YYYY" withTitle>
                                        {event.date}
                                        </Moment>
                                    </div>
                                    <div>
                                        <Moment to={event.date}>{new Date()}</Moment>
                                    </div>
                                </div>
                                </Link> : 
                                <div key={event._id}>
                                <div>
                                    <Moment format="D MMM YYYY" withTitle>
                                    {event.date}
                                    </Moment>
                                </div>
                                <div>
                                    <Moment to={new Date()}>{event.date}</Moment>
                                </div>
                                </div>}
                                <h2>{team.name}</h2>
                                <p>{event.type}  -  {event.title}</p>
                            </section>
                    })
                })
                : <p>You don't have events yet</p>}
            </div>
                <div className='five-pixels-before'></div>
                </>
        )
    }
}

export default withAuth(Events)