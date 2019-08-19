import React, { Component } from 'react'
import clubService from '../services/club-service'
import {ReactComponent as Clouse} from './icons8-delete_sign.svg'
import withAuth from '../components/withAuth'
import { Link } from 'react-router-dom';
import ChatList from './ChatList';

class Team extends Component {
    state = {
        team: {},
        name: '',
        treiners: [],
        trenerSerch: '',
        isAMatch: [],
        usersList: []
    }

    componentDidMount = () => {
        clubService.getMyTeam(this.props.match.params.id)
        .then(team => {
            this.setState({
                team: team.data
            })
        })
        .catch(e => {console.log(e)})
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
        clubService.addPlayerToTeam(user, this.state.team)
            .then(data => {})
            .catch((err) => console.log(err))
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
        console.log(this.props.match.params.id)
        return (
            <div className='club-interface'>
                <Link to='/private'>
                    <div className='clouse-bar' onClick={this.cluse}>
                            <h2 className='principal-title'>{this.state.team.name}</h2>
                            <Clouse fill='#43B28A' id='clouseCruz'/>
                    </div>
                </Link>
                <h2>Update your players:</h2>
                <form className='create-team-form'>
                    <input id='treiners' type='hidden' name='treiners' value={this.state.treiners}/>
                    <label htmlFor='trenerSerch'>Serch username for Players:</label>
                    <input id='trenerSerch' type='text' name='trenerSerch' value={this.state.trenerSerch} onChange={this.handleChangeList}/>
                <section className='selected-box'> 
                    {this.state.team.players !== undefined ? this.state.team.players.map((admin) => {
                        return <p className='selectets-treiners'> - {admin.username} - </p>
                    }): null}
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
                </form>
            </div>
        )
    }
}


export default withAuth(Team)
