import React, { Component } from 'react'

class FinishMatchCard extends Component {
    render() {
        const {event, temaName, image} = this.props
        console.log(event)
        return (
            <article className='finish-event-card'>
                <div className='image-container'>
                    {image !== 'no image' ? <img src={image} alt='event'/> : null}
                </div>
                <div className='title'>
                    <h3>{temaName}</h3>
                </div>
                {!event ? null : event.type === 'match' ? 
                <div className='result'>
                    <p><small>{temaName}</small></p>
                    <p>{event.personalData.data[0].param} - {event.personalData.data[1].param}</p>
                    <p><small>{event.rival}</small></p>
                </div>
                : 
                <div className='result'>
                    <p></p>
                    <p>{event.title}</p>
                    <p></p>
                </div>
                }
            </article>
        )
    }
}

export default FinishMatchCard