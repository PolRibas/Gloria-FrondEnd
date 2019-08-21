import React, { Component } from 'react'
import {ReactComponent as Clouse} from './icons8-delete_sign.svg'
import { Link } from 'react-router-dom';
import withAuth from '../components/withAuth'

class Settings extends Component {

    destroySesion = () => {
        this.props.logout()
        .then((user) => {
          })
        .catch( error => console.log(error) )
    }

    render() {
        return (
            <>
            <div className='padding-for-clouse'>
                <Link to='/private' className='clouse-nav'>
                    <div className='clouse-bar'>
                            <h2 className='principal-title'>Settings</h2>
                            <Clouse fill='#43B28A' id='clouseCruz'/>
                    </div>
                </Link>
            </div>
            <div className='settings-zone'> 
                <div className='settings-item-zone'>
                    <Link to='/updateProfile'>Update profile</Link>
                </div>
                <div className='settings-item-zone'>
                    <Link>About Gloria</Link>
                </div>
                <div>
                    
                </div>
            </div>
                <div className='logout' onClick={this.destroySesion}>
                    <p>Logout</p>
                </div>
            </>
        )
    }
}

export default withAuth(Settings)