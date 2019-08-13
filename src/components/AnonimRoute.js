import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import withAuth from './withAuth'

function AnonimRoute(props) {
    const {isLoggedIn, component: Component, ...rest} = props
    return (
       <>
        {!isLoggedIn ? <Route render={(props) => {
        return <Component {...props}/>}} {...rest}/> : <Redirect to='/private' /> }
       </>
    )
}

export default withAuth(AnonimRoute)