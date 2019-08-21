import React, { Component } from 'react'
import withAuth from '../components/withAuth'
import profileService from '../services/profile-service'
import {Redirect} from 'react-router-dom'
import FileUploadComponent from '../components/images/ImageUpdate';
import { Link } from 'react-router-dom';
import {ReactComponent as Clouse} from './icons8-delete_sign.svg'

class UpdateP extends Component {
    state = {
        _id: this.props.user.id,
        username: this.props.user.username, 
        email: this.props.user.email, 
        firstName: this.props.user.firstName, 
        surname: this.props.user.surname,
        isFinish: false,
        url: this.props.user.image
    }
    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handlesubmit = (event) => {
        event.preventDefault();
        const {_id, username, email, firstName, surname, url} = this.state 
        profileService.updateprofile({_id, username, email, firstName, surname, url})
        .then( () => {
            this.setState({
                    isFinish: true
            })
        })
        .catch( error => console.log(error) )
    }

    getUrlImage = (url) => {
        this.setState({
            url
        })
    }

    render(props) {
        const {username, firstName, surname, isFinish, url} = this.state
        console.log(url, this.props.user)
        return (
            <>
            <div className='padding-for-clouse'>
                <Link to='/private' className='clouse-nav'>
                    <div className='clouse-bar'>
                            <h2 className='principal-title'>Update Profile</h2>
                            <Clouse fill='#43B28A' id='clouseCruz'/>
                    </div>
                </Link>
            </div>
            <div className='club-interface'>
            {isFinish ? <Redirect to='/private' /> : null}
                <div  className='image-container image-update-profile'>
                    <img src={url} alt={username}/>
                </div>
                <FileUploadComponent getUrl={this.getUrlImage} name={username} />
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
            </>
        )
    }
}

export default withAuth(UpdateP)