import React, { Component } from 'react'
import withAuth from '../components/withAuth'
import HeaderIn from '../components/statics/HeaderIn';
import Navbar from '../components/statics/Navbar';
import Feed from './Feed';
import ChatList from './ChatList'
import Profile from './Profile'

class Private extends Component {
    state= {
        position: '',
        positionN: 'notifications',
        positionP: 'profile',
        page: 'feed',
    }

    gotoChats = () => {
        this.setState({
            position: 'position-right',
            positionN: 'position-right notifications',
            positionP: 'position-right profile',
        })
    }

    gotoProfile = () => {
        this.setState({
            position: 'position-left',
            positionN: 'position-left notifications',
            positionP: 'position-right-profile profile',
        })
    }

    changePage = (string) => {
        this.setState({
            page: string
        })
    }

    clouseSplash = () => {
        this.setState({
            position: '',
            positionN: 'notifications',
            positionP: 'profile',
        })
    }

  render() {
    console.log(this.props.user)
    const {position, positionN, positionP, page, settingsClass} = this.state;
    return (
        <>
        <section>
            <HeaderIn />
            <Navbar fillName={'whitesmoke'} toLeft={this.gotoProfile} toRight={this.gotoChats} position={position} changePage={this.changePage}/>
            {page === 'feed' ? <Feed/>: null}
            {page === 'add' ? null: null}
            {page === 'calender' ? null :null}
            {page === 'stats' ? null: null}
        </section>
        <section className={positionP}>
            <Profile cluse={this.clouseSplash} user={this.props.user}/>
        </section>
        <section className={positionN}>
            <ChatList cluse={this.clouseSplash}/>
        </section>
        </>
    )
  }
}

export default withAuth(Private);