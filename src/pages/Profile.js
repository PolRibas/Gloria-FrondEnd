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
                    <img alt={user.username} src='data:image/jpeg;base64,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'/>
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
                    <Link to='/settings'>Settings</Link>
                </section>
            </>
        )
    }
}

export default Profile