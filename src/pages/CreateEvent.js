import React, { Component } from 'react'
import clubService from '../services/club-service'
import withAuth from '../components/withAuth'

class Events extends Component {
    state = {
        club: {},
        myTeams: [],
        date: '',
        type: 'training',
        team: '',
        done: false,
        title: '',
        rival: ''
    }
    componentDidMount = () => {
        const id = this.props.user.id
        let myTeams = []
        clubService.iAmPartOfTheClub(id)
        .then((club) => {
                this.setState({
                    club: club.data
                })
                club.data.teams.forEach((team) => {
                    team.treiners.forEach((coachId) => {
                        if(coachId === this.props.user.id){
                            myTeams.push(team)
                        }
                    })
                })
                if(this.state.club.teams.length){
                this.setState({
                    myTeams,
                    team: myTeams[0]._id
                })}
                var date = new Date().toDateString();
                this.setState({ date });
        })
    }

    handlesubmit = (e) => {
        e.preventDefault();
        const teamId = this.state.team;
        const {type, date, title, rival} = this.state;
        clubService.createAnewEvent(teamId, type, date, title, rival)
        .then(r => 
        this.setState({
            date: '',
            type: 'training',
            team: '',
            done: true,
            title: '', 
            rival: ''
        })
        )
        .catch(e => console.log(e))
    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render() {
        return (
            <div className='create-event-form'>
                { this.state.club.team !== '' ? <>
                    <h2>Create a new event</h2>
                <form onSubmit={this.handlesubmit}>
                    <input type='text' name='title' value={this.state.title} onChange={this.handleChange} placeholder='Write a title for the event' required/>
                    <select name='team' value={this.state.team} onChange={this.handleChange}>
                        {this.state.club.teams ? 
                            this.state.myTeams.map((team) => {
                                return <option key={team._id} value={team._id}>{team.name}</option>
                                    
                            })
                            : null}
                    </select>
                    <select name='type' value={this.state.type} onChange={this.handleChange}>
                        {this.state.club.teams ? 
                            <>
                            <option value='training'>training</option>
                            <option value='match'>match</option>
                            </>
                            : null}
                    </select>
                    {this.state.club.teams ? 
                            <input type='datetime-local' name='date' value={this.state.date} onChange={this.handleChange}/>
                            : null}
                    {this.state.type === 'match' ? <input type='text' name='rival' value={this.state.rival} onChange={this.handleChange} placeholder='Agains who do you play?' required/> : null}
                    <input className='submit' type='submit' value='Create Event'/>
                </form>
                </> :<p>You are not a trainer</p>}
                {this.state.done ? <p className='message-user'>Event created</p> : null}
            </div>
        )
    }
}

export default withAuth(Events)