import React, { Component } from 'react'

class FinishMatchCard extends Component {
    render() {
        return (
            <section className='finish-event-card'>
                <div className='image-container'>
                    <img src='https://scontent.fmad3-6.fna.fbcdn.net/v/t1.0-9/527767_4808685259707_2057942621_n.jpg?_nc_cat=110&_nc_oc=AQkeTmFsHhuhTcs9nc9JewL0cQWDcHkAtEdTb_ARm1Zb2H2eKmqyNyNOcEwfYrfc1cw&_nc_ht=scontent.fmad3-6.fna&oh=ba8f59d9305138c4157fe67fefe81008&oe=5DC7A541' alt={'hockey random'} />
                </div>
                <div className='title'>
                    <h3>Divición de Honor</h3>
                </div>
                <div className='result'>
                    <img src='https://logodownload.org/wp-content/uploads/2015/05/Barcelona-logo-escudo-4.png' alt={'hockey random'} />
                    <p>3 - 1</p>
                    <img src='http://egara.es/wp-content/uploads/2016/05/Club_Egara.png' alt={'hockey random'} />
                </div>
            </section>
        )
    }
}

export default FinishMatchCard