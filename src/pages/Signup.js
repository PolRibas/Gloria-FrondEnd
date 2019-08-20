import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import withAuth from '../components/withAuth'

class ClubLogin extends Component {
  state = {
    username: '',
    password: '',
    nameS: '',
    sport: '',
    city: '',
    isInLogin: true,
    isSignup: false
  }

  handleFormSubmitLogin = (event) => {
     event.preventDefault();
   
  }

  handleFormSubmitSignup = (event) => {
    event.preventDefault();
    this.setState({
        isSignup: true
    })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  chengeClass = () => {
      if(this.state.isInLogin){
          this.setState({
              isInLogin: false,
              name: '',
              password: '',
              nameS: '',
              sport: '',
              city: '',
          });
      }else{
        this.setState({
            isInLogin: true,
            name: '',
            password: '',
            nameS: '',
            sport: '',
            city: '',
        });
      }
  }

  render() {
    const { name, password, nameS, sport, city } = this.state;
    return (
      <>
        <section className={this.state.isInLogin ? 'login-section' : 'login-section position-two'}>
                <h1>My Club</h1>
            <div>
                <h2>Login to your club platform</h2>
                <form onSubmit={this.handleFormSubmitLogin}>
                <label htmlFor='name' >Club Name:</label>
                <input id='name' type='text' name='name' value={name} onChange={this.handleChange}/>
                <label htmlFor='password'>User password:</label>
                <input id='password' type='password' name='password' value={password} onChange={this.handleChange} />
                <input className='submit' type='submit' value='Login' />
                </form>
            </div>
            <p>Your club don't have account? 
                <a href='#0' onClick={this.chengeClass}>  Create</a>
            </p>
        </section>
        <section className={this.state.isInLogin ? 'signup-section' : 'signup-section position-two'}>
            <div>
                <h2>Create a new account</h2>
                <form onSubmit={this.handleFormSubmitSignup}>
                <label htmlFor='name'>Club Name:</label>
                <input id='name' type='text' name='nameS' value={nameS} onChange={this.handleChange}/>
                <label htmlFor='email'>City:</label>
                <input id='email' type='text' name='city' value={city} onChange={this.handleChange}/>
                <label htmlFor='password'>Sport:</label>
                <input id='password' type='text' name='sport' value={sport} onChange={this.handleChange} />
                <input className='submit' type='submit' value='Signup' />
                </form>
            </div> 
            <p>Your club have account? 
                <a href='#0' onClick={this.chengeClass}>  Login</a>
            </p> 
        </section>
        <section className='club-platform-link'>
            <p>Back to users platform?
                <Link to={'/login'}> User login</Link>
            </p>
        </section>
        {this.state.isSignup ? (<Redirect to={{
        pathname: `/createClub/${this.state.nameS}/${this.state.city}/${this.state.sport}`}} />) : null}
      </>
    )
  }
}

export default withAuth(ClubLogin);