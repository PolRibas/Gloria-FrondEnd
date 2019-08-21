import React, { Component } from 'react'
import {ReactComponent as Clouse} from './icons8-delete_sign.svg'
import { Link } from 'react-router-dom';
import clubService from '../services/club-service'

class Profile extends Component {
    state = {
        club: {}
    }
    componentDidMount = () => {
        const id = this.props.user.id
        clubService.iAmPartOfTheClub(id)
        .then((club) => {
                this.setState({
                    club: club.data
                })
        })
    }
    render(props) {
        const {user} = this.props;
        return (
            <>
            <div>
                <div className='clouse-bar' onClick={this.props.cluse}>
                        <h2 className='principal-title'>Account</h2>
                        <Clouse fill='#43B28A'/>
                </div>
            </div>
                <section className='info-profile-box'>
                    <img alt={user.username} src={this.props.user.image}/>
                    <h3>{user.firstName} {user.surname}</h3>
                    <h2>@{user.username}</h2>
                    <p>{user.email}</p>
                    
                    {this.state.club.teams ? <div>
                    <h2 className='special-text'>Player</h2>
                    </div> : null }
                    {this.state.club.teams ? this.state.club.teams.map((oneteam) => {
                        let isPlayer = false
                        oneteam.players.forEach((player) => {
                            if(player._id === this.props.user.id){
                                isPlayer = true
                            }
                            })
                        if(isPlayer){
                            return <React.Fragment key={oneteam._id} >
                            <Link className='my-club-settings' to={`/team/${oneteam._id}`}>
                                <section>
                                <h2>{oneteam.name}</h2>
                                </section>
                            </Link>
                            </React.Fragment>
                        }else{
                            return null
                        }
                    }) : null}
                    {this.state.club.teams ? <div>
                    <h2 className='special-text'>Coach</h2>
                    </div> : null }
                    {this.state.club.teams ? this.state.club.teams.map((oneteam) => {
                        if(oneteam.treiners.includes(this.props.user.id)){
                            return <React.Fragment key={oneteam._id + 'player'} >
                            <Link className='my-club-settings' to={`/team/${oneteam._id}`}>
                                <section>
                                <h2>{oneteam.name}</h2>
                                </section>
                            </Link>
                            </React.Fragment>
                        }else{
                            return null
                        }
                    }) : null}
                    <Link to='/settings'>Settings</Link>
                </section>
            </>
        )
    }
}

export default Profile