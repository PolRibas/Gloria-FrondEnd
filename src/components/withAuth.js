import React, { Component } from 'react'
import {AuthContext} from '../context/auth-context'


const withAuth = (Comp) => {
    return class withAuth extends Component {
        render() {
            return (
                <AuthContext.Consumer>
                  { ({user, isLoggedIn, login, signup, logout}) => { 
                  return <Comp 
                  user={user} 
                  isLoggedIn={isLoggedIn} 
                  login={login} 
                  signup={signup} 
                  logout={logout} 
                  {...this.props}
                  /> } }
                </AuthContext.Consumer>
            )
        }
    }
    
}

export default withAuth