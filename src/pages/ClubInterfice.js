import React, { Component } from 'react'
import {ReactComponent as Clouse} from './icons8-delete_sign.svg'
import clubService from '../services/club-service'
import withAuth from '../components/withAuth'
import { Link } from 'react-router-dom';
import ChatList from './ChatList';

class ClubInterfice extends Component {
    state = {
        club: {},
        name: '',
        treiners: [],
        trenerSerch: '',
        isAMatch: [],
        usersList: []
    }

    componentDidMount = () => {
        const id = this.props.user.id
        clubService.doIHaveClub(id)
        .then((club) => {
                this.setState({
                    club: club.data
                })
        })
        .catch((err) => console.log(err))
        clubService.getUserForPush()
            .then((users) => {
                this.setState({
                    usersList: users.data
                })
            })
            .catch((err) => console.log(err))
    }

    addAdminClick = (user) => {
        const{treiners} = this.state
        const newArray = [...treiners]
        newArray.push(user)
        this.setState({
            isAMatch: [],
            trenerSerch: '',
            treiners: newArray
        })
    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleChangeList = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
        const newArray = [];
        if(this.state.admin !== ''){
            this.state.usersList.forEach((user) => {
                if (user.username.toLowerCase().includes(this.state.trenerSerch.toLowerCase())){
                    newArray.push(user)
                }
            })
            this.setState({
                isAMatch: newArray
            })
        }
      }
    
    createClub = (event) => {
        event.preventDefault();
        const {name} = this.state;
        const treiners = this.state.treiners.map((treiner) => {
            return treiner._id
        })
        const clubId = this.state.club._id
        clubService.createTeam(name, treiners, clubId)
        .then((team) => {
            const newclub = team.data
        this.setState({
            name: '',
            treiners: [],
            trenerSerch: '',
            isAMatch: [],
            usersList: [],
            club: newclub
        })})
        .catch(err => console.error(err))
    }

    render() {
        return (
            <div className='club-interface'>
                <Link to='/private'>
                    <div className='clouse-bar' onClick={this.cluse}>
                            <h2 className='principal-title'>{this.state.club.name}</h2>
                            <Clouse fill='#43B28A' id='clouseCruz'/>
                    </div>
                </Link>
                <h2>Create a new Team:</h2>
                <form className='create-team-form' onSubmit={this.createClub}>
                    <label htmlFor='name' >Team Name:</label>
                    <input id='name' type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
                    <input id='treiners' type='hidden' name='treiners' value={this.state.treiners}/>
                    <label htmlFor='trenerSerch'>Serch username for Treiner:</label>
                    <input id='trenerSerch' type='text' name='trenerSerch' value={this.state.trenerSerch} onChange={this.handleChangeList}/>
                <section className='selected-box'> 
                    {this.state.treiners.map((admin) => {
                        return <p className='selectets-treiners'> - {admin.username} - </p>
                    })}
                </section>
                      <section className='list-match'>
                {this.state.isAMatch.map((user) => {
                        return <>
                        <button onClick={() => this.addAdminClick(user)}>
                            <p> - {user.username} - </p>
                        </button>
                        </>
                    })}
                    </section>
                    <input className='submit' type='submit' value='Create' />
                </form>
                <section className='team-box-create'>
                    {this.state.club.teams ? this.state.club.teams.map((oneteam) => {
                        return <>
                            <Link to={`/team/${oneteam._id}`}>
                                <section>
                                <h3 key={oneteam._id}>{oneteam.name}</h3>
                                    <div>
                                        {oneteam.treiners.map((user) => {
                                            return <p key={user._id}>{user.username}</p>
                                        })}
                                    </div>
                                </section>
                            </Link>
                            </>
                    }) : <p>No teams yet</p>}
                </section>
            </div>
        )
    }
}

export default withAuth(ClubInterfice)