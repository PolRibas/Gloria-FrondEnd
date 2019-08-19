import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withAuth from '../components/withAuth'

class Login extends Component {
  state = {
    username: '',
    password: '',
    usernameS: '',
    passwordS: '',
    emailS: '',
    isInLogin: true,
  }

  handleFormSubmitLogin = (event) => {
     event.preventDefault();
    const { username, password } = this.state

    this.props.login({ username, password })
    .then((user) => {

    })
    .catch( error => console.log(error) )
  }

  handleFormSubmitSignup = (event) => {
    event.preventDefault();
    const username = this.state.usernameS;
    const password = this.state.passwordS;
    const email = this.state.emailS;

    this.props.signup({ username, password, email })
      .then( (user) => {
        console.log(user)
        this.setState({
            username: '',
            password: '',
            usernameS: '',
            passwordS: '', 
            emailS: '',
        });
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  chengeClass = () => {
      if(this.state.isInLogin){
          this.setState({
              isInLogin: false,
              username: '',
              password: '',
              usernameS: '',
              passwordS: '',
              emailS: '',
          });
      }else{
        this.setState({
            isInLogin: true,
            username: '',
            password: '',
            usernameS: '',
            passwordS: '',
            emailS: '',
        });
      }
  }

  render() {
    const { username, password, usernameS, passwordS, emailS } = this.state;
    return (
      <>
        <section className={this.state.isInLogin ? 'login-section' : 'login-section position-two'}>
                <h1>Gloria</h1>
            <div>
                <h2>Login to your account</h2>
                <form onSubmit={this.handleFormSubmitLogin}>
                <label htmlFor='username' >Username:</label>
                <input id='username' type='text' name='username' value={username} onChange={this.handleChange}/>
                <label htmlFor='password'>Password:</label>
                <input id='password' type='password' name='password' value={password} onChange={this.handleChange} />
                <input className='submit' type='submit' value='Login' />
                </form>
            </div>
            <p>You don't have account? 
                <a href='#0' onClick={this.chengeClass}>  Signup</a>
            </p>
        </section>
        <section className={this.state.isInLogin ? 'signup-section' : 'signup-section position-two'}>
            <div>
                <h2>Create a new account</h2>
                <form onSubmit={this.handleFormSubmitSignup}>
                <label htmlFor='username'>Username:</label>
                <input id='username' type='text' name='usernameS' value={usernameS} onChange={this.handleChange}/>
                <label htmlFor='email'>Email:</label>
                <input id='email' type='email' name='emailS' value={emailS} onChange={this.handleChange}/>
                <label htmlFor='password'>Password:</label>
                <input id='password' type='password' name='passwordS' value={passwordS} onChange={this.handleChange} />
                <input className='submit' type='submit' value='Signup' />
                </form>
            </div> 
            <p>You allready have account? 
                <a href='#0' onClick={this.chengeClass}>  Login</a>
            </p> 
        </section>
        <section className='club-platform-link'>
            <p>Do you want to enter as a club?
                <Link to={'/signup'}> Club platform</Link>
            </p>
        </section>
      </>
    )
  }
}

export default withAuth(Login);