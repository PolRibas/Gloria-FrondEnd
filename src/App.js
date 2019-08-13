import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navbar from './components/Navbar.js';
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvaider from './context/auth-context'

import PrivateRote from './components/PrivateRote.js';
import AnonimRoute from './components/AnonimRoute.js';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvaider>
            <div className="container">
            <h1>Gloria</h1>
            <Navbar />
            <Switch>
                <AnonimRoute path="/signup" component={Signup} />
                <AnonimRoute path="/login" component={Login} />
                <PrivateRote path="/private" component={Private} />
            </Switch>
            </div>
        </AuthProvaider>
      </Router>
    </div>
  );
}

export default App;
