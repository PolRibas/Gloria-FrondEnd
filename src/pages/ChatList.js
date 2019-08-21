import React, { Component } from 'react'
import {ReactComponent as Clouse} from './icons8-delete_sign.svg'
import withAuth from '../components/withAuth'
import { Link } from 'react-router-dom';
import clubService from '../services/club-service'

class ChatList extends Component {
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
    render() {
        return (
            <>
            <div>
                <div className='clouse-bar' onClick={this.props.cluse}>
                        <Clouse fill='#43B28A'/>
                        <h2 className='principal-title'>Notifications</h2>
                </div>
            </div>
            <section className='info-profile-box'>
                <div>
                    <h2 className='special-text'>All CLub</h2>
                </div>
                {this.state.club._id ? 
                    <section className='my-club-settings'>
                        <Link to={`/chat/${this.state.club._id}`}>
                            <h2>{this.state.club.name}</h2>
                        </Link>
                    </section>
                : null}
                <div>
                    <h2 className='special-text'>Teams</h2>
                </div>  
                {this.state.club.teams ? this.state.club.teams.map((team) => {
                    return <section key={team._id} className='my-club-settings'>
                    <Link to={`/chat/${team._id}`}>
                        <h2>{team.name}</h2>
                     </Link>
                     </section>
                }) : null}
            </section>
            </>
        )
    }
}

export default withAuth(ChatList)