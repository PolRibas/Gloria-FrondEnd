import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

import withAuth from '../components/withAuth'
import clubService from '../services/club-service'

class CreateClub extends Component {
    state = {
        name: this.props.match.params.name,
        city: this.props.match.params.city,
        sport: this.props.match.params.sport,
        user: {},
        _id: '',
        admins: [],
        admin: '',
        teams: [{}],
        emails: [],
        usernameS: '', 
        emailS: '', 
        passwordS: '',
        isInSignup: true,
        isAddingAdmins: false,
        isAddingTeams: false,
        inTheAddAdmin: false,
        readyToEnd: false,
        usersList: [],
        isAMatch: [],
        isDone: false
    }

    handleDone = (event) => {
        event.preventDefault(); 
        const {admins, name, city, sport} = this.state
        clubService.createNewClub(admins, name, city, sport)
            .then((club) => {console.log(club)})
        .catch((err) => console.log(err))

        this.setState({
            isDone: true
        })
     }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
        this.pushAmin(value)
    }

    componentDidMount = () => {
        this.setState({user: this.props.user})
        if(this.state.user.username){this.setState({isInSignup: true});}

        clubService.getUserForPush()
            .then((users) => {
                this.setState({
                    usersList: users.data
                })
            })
            .catch((err) => console.log(err))

            if(this.props.user.username){
                const {admins} = this.state;
                const newArray = [...admins]
                newArray.push(this.props.user)
                this.setState({
                    isAddingAdmins: true,
                    inTheAddAdmin: true,
                    admins: newArray
                })
            }
    }


    userValidate = (event) => {
        event.preventDefault();
        const username = this.state.usernameS;
        const password = this.state.passwordS;
        const email = this.state.emailS;
        this.props.signup({ username, password, email })
        .then( (user) => {
            const {admins} = this.state;
                const newArray = [...admins]
                newArray.push(this.props.user)
        this.setState({
            user: this.props.user,
            _id: this.props.user._id,
            inTheAddAdmin: true,
            isAddingAdmins: true,
            admins: newArray
        });
      })
      .catch( error => console.log(error) )

      const {admins} = this.state;
        const newArryai = [...admins]
        newArryai.push(this.props.user)
        this.setState({
            admins: newArryai,
        })
    }

    pushAmin = (value) => {
        const newArray = [];
        if(this.state.admin !== ''){
            this.state.usersList.forEach((user) => {
                if (user.username.toLowerCase().includes(value.toLowerCase())){
                    newArray.push(user)
                }
            })
            this.setState({
                isAMatch: newArray
            })
        }
    }

    addAdminClick = (user) => {
        const{admins} = this.state
        const newArray = [...admins]
        newArray.push(user)
        this.setState({
            isAMatch: [],
            admin: '',
            admins: newArray
        })
    }

    goToAddTeams = () => {
        this.setState({
            inTheAddAdmin: false,
            isAddingTeams: true
        })
    }

    render() {
        console.log(this.state)
        const {name, city, sport} = this.props.match.params;
        const {user, usernameS, emailS, passwordS, isInSignup, isAddingTeams, isAddingAdmins, inTheAddAdmin, isDone, admin, admins, isAMatch} = this.state
        return (
            <div className='club-creator-page'>
            <section>
            {this.props.match.params.name ? (<><h3>{name}</h3>
            <p>Club of {sport} in {city}</p></>) : null}
            <section id='green-numbers-box'>
            {isInSignup ? <div className='green-number'></div> : <div className='number'></div>}
            {isAddingAdmins ? <div className='green-number'></div> : <div className='number'></div>}
            {isAddingTeams ? <div className='green-number'></div> : <div className='number'></div>}
            </section>
                    {user.username ?  null : (   <>
                            <form onSubmit={this.userValidate}>
                                <label htmlFor='username'>Username:</label>
                                <input id='username' type='text' name='usernameS' value={usernameS} onChange={this.handleChange}/>
                                <label htmlFor='email'>Email:</label>
                                <input id='email' type='email' name='emailS' value={emailS} onChange={this.handleChange}/>
                                <label htmlFor='password'>Password:</label>
                                <input id='password' type='password' name='passwordS' value={passwordS} onChange={this.handleChange} />
                                <input type='submit' value='Next' className='next-input'/>
                            </form>
                            </> )
                    }
                {inTheAddAdmin ? 
                    <>
                    <form>
                        <label htmlFor='admin'>Serch username for admin:</label>
                        <input id='admin' type='text' name='admin' value={admin} onChange={this.handleChange}/>
                    </form>
                    {admins.map((admin, i) => {
                        return <p key={i}> - {admin.username} - </p>
                    })}
                    <form onSubmit={this.goToAddTeams}>
                         <input type='submit' value='Next' className='next-input'/>
                    </form>
                    </>
                    : null}
                
                {isAddingTeams ? 
                    (
                            <button className='final-button' onClick={this.handleDone}>Create</button>
                            )
                    : null}
                </section>
                {inTheAddAdmin ?  
                    <section>
                    {isAMatch.map((user, i) => {
                        return <>
                        <button onClick={() => this.addAdminClick(user)}>
                            <p key={i}> {user.username} </p>
                        </button>
                        </>
                    })}
                    </section>
                    
                    : null}

                    {isDone ? (<Redirect to={{pathname: `/private`}} />): null}
            </div>
        )
    }
}


export default withAuth(CreateClub)