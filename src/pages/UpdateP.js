import React, { Component } from 'react'
import withAuth from '../components/withAuth'
import profileService from '../services/profile-service'

class UpdateP extends Component {
    state = {
        _id: this.props.user.id,
        username: this.props.user.username, 
        email: this.props.user.email, 
        firstName: this.props.user.firstName, 
        surname: this.props.user.surname
    }
    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handlesubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
        const {_id, username, email, firstName, surname} = this.state 
        profileService.updateprofile({_id, username, email, firstName, surname})
        .then( (user) => {
            this.props.user = user
            this.setState({
                    _id: user.id,
                    username: user.username, 
                    email: user.email, 
                    firstName: user.firstName, 
                    surname: user.surname
            })
        })
        .catch( error => console.log(error) )
    }

    render(props) {
        const {_id, username, email, firstName, surname} = this.state
        console.log(_id, username, email, firstName, surname)
        return (
            <div>
                <p>update profile</p>
                <form onSubmit={this.handlesubmit}>
                    <label htmlFor='username'>Username:</label>
                    <input id='username' type='text' name='username' value={username} onChange={this.handleChange}/>
                    <label htmlFor='firstName'>First Name:</label>
                    <input id='firstName' type='text' name='firstName' value={firstName} onChange={this.handleChange}/>
                    <label htmlFor='surname'>Surname:</label>
                    <input id='surname' type='text' name='surname' value={surname} onChange={this.handleChange}/>
                    <input className='submit' type='submit' value='update' />
                </form>
            </div>
        )
    }
}

export default withAuth(UpdateP)