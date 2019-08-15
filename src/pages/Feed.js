import React, { Component } from 'react'
import FinishMatchCard from '../components/cards/FinishMatchCard';

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
                    <FinishMatchCard />
                    <FinishMatchCard />
                    </>)
                }
            </section>
        )
    }
}


export default Feed