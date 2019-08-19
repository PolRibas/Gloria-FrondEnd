import React, { Component } from 'react'
import clubService from '../services/club-service'
import withAuth from '../components/withAuth'
import { Link } from 'react-router-dom';

class IHaveClub extends Component {
    state = {
        myClub: false,
        club: {}
    }

    componentDidMount = () => {
        const id = this.props.user.id
        clubService.doIHaveClub(id)
        .then((club) => {
                this.setState({
                    club: club.data
                })
            if(this.state.club.name){
                this.setState({
                    myClub: true
                })
            }
        })
        .catch((err) => console.log(err))
    }
    
    render() {
        return (
            <div>
                <Link to='/clubInterface'>
                    {!this.state.myClub ? null: 
                            <section className='club-box-feed'>
                                <h2>Admin Your Club</h2> 
                                <p>{this.state.club.name} of {this.state.club.city}</p>
                            </section>
                    }
                </Link>
            </div>
        )
    }
}

export default withAuth(IHaveClub)