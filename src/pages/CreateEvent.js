import React, { Component } from 'react'
import {ReactComponent as Clouse} from './icons8-delete_sign.svg'
import { Link } from 'react-router-dom';
import clubService from '../services/club-service'
import withAuth from '../components/withAuth'

class Events extends Component {
    state = {
        club: {},
        myTeams: [],
        date: '',
        type: 'treining',
        team: '',

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
        console.log(this.state)
        const teamId = this.state.team;
        const type = this.state.type;
        const date = this.state.date;
        clubService.createAnewEvent(teamId, type, date)
        .then(r => console.log(r.data))
        .catch(e => console.log(e))
        if(this.state.date !== ''){
            this.setState({
                date: '',
                type: 'treining',
                team: '',
            })
        }
    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render() {
        return (
            <div>
                { this.state.club.team !== '' ? <>
                    <h2>Create a newEvent</h2>
                <form onSubmit={this.handlesubmit}>
                    <select name='team' value={this.state.team} onChange={this.handleChange}>
                        {this.state.club.teams ? 
                            this.state.myTeams.map((team) => {
                                return <><option key={team._id} value={team._id}>{team.name}</option></>
                                    
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
                            <>
                            <input type='date' name='date' value={this.state.date} onChange={this.handleChange}/>
                            </>
                            : null}
                    <input type='submit' value='Create Event'/>
                </form>
                </> :<p>You are not a trainer</p>}
            
            </div>
        )
    }
}

export default withAuth(Events)