import React, { Component } from 'react'
import FinishMatchCard from '../components/cards/FinishMatchCard';
import IHaveClub from '../components/IHaveClub';
import withAuth from '../components/withAuth'
import clubService from '../services/club-service'

class Feed extends Component {
    state = {
        isLoading: true,
        teams: [],
        events: []
    }
    
    componentDidMount = () => {
        this.setState({
            isLoading: false,
        })
        clubService.loadEvents()
        .then( r => {this.setState({teams: r.data})
            const newArray = []
            r.data.forEach((team) => {
                team.events.forEach((e) => newArray.push({event: e, teamName: team.name}))
            })
            newArray.sort((a, b) => { a = new Date(a.updated_at);
            b = new Date(b.eupdated_at);
            return a<b? -1:a>b?1:0;})
            newArray.reverse()
            this.setState({events: newArray})
        })
        .catch( e => console.log(e))
    }

    render() {
        const {isLoading} = this.state
        return (
            <section className='feed-container'>
                {isLoading ?  null : (
                    <>
                    <IHaveClub />
                    {this.state.events.map((e) => {
                        return <FinishMatchCard image={e.event.image} event={e.event} temaName={e.teamName}/>
                    })}
                    <FinishMatchCard />
                    </>)
                }
                <div className='five-pixels-before'></div>
            </section>
        )
    }
}


export default withAuth(Feed)