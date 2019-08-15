import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import withAuth from '../components/withAuth'

class CreateClub extends Component {
    state = {
        name: this.props.match.params.name,
        city: this.props.match.params.city,
        sport: this.props.match.params.sport,
        user: {},
        _id: '',
        admins: [],
        teams: [{}],
        emails: [],
        usernameS: '', 
        emailS: '', 
        passwordS: ''
    }

    handleDone = (event) => {
        event.preventDefault();
     }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    componentDidMount = () => {
        this.setState({user: this.props.user})
    }

    userValidate = (event) => {
        event.preventDefault();
        const {usernameS, emailS, passwordS} = this.state
        console.log('validate')
        this.props.signup({ usernameS, passwordS, emailS })
        .then( (Newuser) => {
        console.log(Newuser)
        this.setState({
            user: Newuser,
        });
      })
      .catch( error => console.log(error) )
    }

    render() {
        console.log(this.props.match.params)
        const {name, city, sport} = this.props.match.params;
        const {user, usernameS, emailS, passwordS} = this.state
        return (
            <div>
                <h2>{name}</h2>
                <p>Club of {sport} in {city}</p>
                <form onSubmit={this.handleDone}>
                    {user.name ? <>
                    <p>{user.name} created</p>
                    </>
                    : (   <>
                            <label htmlFor='username'>Username:</label>
                            <input id='username' type='text' name='usernameS' value={usernameS} onChange={this.handleChange}/>
                            <label htmlFor='email'>Email:</label>
                            <input id='email' type='email' name='emailS' value={emailS} onChange={this.handleChange}/>
                            <label htmlFor='password'>Password:</label>
                            <input id='password' type='password' name='passwordS' value={passwordS} onChange={this.handleChange} />
                            <button onClick={this.userValidate}>Validat</button>
                            </>
                        )
                    }
                    <label htmlFor='User' >User:</label>
                    <input id='User' type='text' name='username' onChange={this.handleChange}/>
                    <input className='submit' type='submit' value='Login' />
                </form>
            </div>
        )
    }
}


export default withAuth(CreateClub)