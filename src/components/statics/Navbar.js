import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
import {ReactComponent as Hamburger} from './navbarIcons/burger.svg'
import {ReactComponent as Calendar} from './navbarIcons/calendar.svg'
import {ReactComponent as Chat} from './navbarIcons/chat.svg'
import {ReactComponent as Mas} from './navbarIcons/mas.svg'
import {ReactComponent as Profile} from './navbarIcons/profile.svg'
import {ReactComponent as Stats} from './navbarIcons/stats.svg'
import withAuth from '../withAuth'
import clubService from '../../services/club-service'

class Navbar extends Component {
    state = {
        treiner: true
    }
    componentDidMount = () => {
        console.log(this.props.user)
        const id = this.props.user.id
        clubService.doIHaveClub(id)
        .then((club) => {
                if(club.data.club === "noclub"){
                 this.setState({
                    treiner: false
                 })
                }
        })
        .catch((err) => console.log(err))
    }

    render() {
        return (
            <>
                    <nav className='icons-navbar'>
                        <section>
                            <ul className='bottom-navbar'>
                                <li>
                                    <Hamburger fill={this.props.fillName} onClick={ () => this.props.changePage('feed')}/>
                                </li>
                                {this.state.treiner ?  
                                    <li>
                                        <Mas fill={this.props.fillName} onClick={ () => this.props.changePage('add')}/>
                                    </li>
                                    : null}
                                <li>
                                    <Calendar fill={this.props.fillName} onClick={ () => this.props.changePage('calender')}/>
                                </li>
                                <li>
                                    <Stats fill={this.props.fillName} onClick={ () => this.props.changePage('stats')}/>
                                </li>
                            </ul>
                        <ul className='top-navbar'>
                            <li>
                                <Profile fill={this.props.fillName} onClick={this.props.toLeft}/>
                            </li>
                            <li>
                                <Chat fill={this.props.fillName} onClick={this.props.toRight}/>
                            </li>
                        </ul>
                        </section>
                    </nav>
            {/* <nav className='desktop-navbar'>
                <ul>
                <li>
                        <Link></Link>
                    </li>
                    <li>
                        <Link></Link>
                    </li>
                    <li>
                        <Link></Link>
                    </li>
                    <li>
                        <Link></Link>
                    </li>
                    <li>
                        <Link></Link>
                    </li>
                    <li>
                        <Link></Link>
                    </li>
                </ul>
            </nav> */}
            </>
        )
    }
}

export default withAuth(Navbar)