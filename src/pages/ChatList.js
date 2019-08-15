import React, { Component } from 'react'
import {ReactComponent as Clouse} from './icons8-delete_sign.svg'

class ChatList extends Component {
    render(props) {
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
                <section className='my-club-settings'>
                    <h2>Senior Masculi</h2>
                </section>
                <section className='my-club-settings'>
                    <h2>Senior Masculi</h2>
                </section>
                <div>
                    <h2 className='special-text'>Senior Masculi</h2>
                </div>  
                <section className='my-club-settings'>
                    <h2>Senior Masculi</h2>
                </section>
                <section className='my-club-settings'>
                    <h2>Senior Masculi</h2>
                </section>
            </section>
            </>
        )
    }
}

export default ChatList