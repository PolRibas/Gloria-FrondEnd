import React, { Component } from 'react'
import FinishMatchCard from '../components/cards/FinishMatchCard';
import IHaveClub from '../components/IHaveClub';

class Feed extends Component {
    state = {
        isLoading: true,
    }
    
    componentDidMount = () => {
        this.setState({
            isLoading: false,
        })
    }

    render() {
        const {isLoading} = this.state
        return (
            <section className='feed-container'>
                {isLoading ?  null : (
                    <>
                    <IHaveClub />
                    <FinishMatchCard />
                    <FinishMatchCard />
                    </>)
                }
                <div className='five-pixels-before'></div>
            </section>
        )
    }
}


export default Feed