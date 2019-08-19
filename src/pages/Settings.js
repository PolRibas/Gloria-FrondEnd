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
            <div>
                <section className='settings-header'>
                    <Link to='/private'>
                    <div className='clouse-bar'>
                            <h2 className='principal-title'>Settings</h2>
                            <Clouse fill='#43B28A'/>
                    </div>
                    </Link>
                </section>
                <div>
                    <Link to='/updateProfile'>Update profile</Link>
                </div>
                <div>
                    <Link>Change club</Link>
                </div>
                <div>
                    <Link>About Gloria</Link>
                </div>
                <div className='logout' onClick={this.destroySesion}>
                    <p>Logout</p>
                </div>
            </div>
        )
    }
}

export default withAuth(Settings)