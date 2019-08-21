import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './css/main.css'


import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvaider from './context/auth-context'
import PrivateRote from './components/PrivateRote.js';
import AnonimRoute from './components/AnonimRoute.js';
import Settings from './pages/Settings'
import UpdateP from './pages/UpdateP'
import CreateClub from './pages/CreateClub'
import ClubInterfice from './pages/ClubInterfice';
import Team from './pages/Team';
import EventDetils from './pages/EventDetils'
import Chat from './pages/Chat';
import firebase from "firebase";

const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.PROJECT_ID,
    storageBucket: 'gs://gloria-sports-app.appspot.com'
  };
  firebase.initializeApp(config);


function App() {

  return (
    <div className="App">
      <Router>
        <AuthProvaider>
            <Switch>
                <AnonimRoute path="/signup" component={Signup} />
                <AnonimRoute path="/login" component={Login} />
                <Route path="/createClub/:name/:city/:sport" component={CreateClub} />
                <PrivateRote path="/private" component={Private} />
                <PrivateRote path="/settings" component={Settings} />
                <PrivateRote path="/updateProfile" component={UpdateP} />
                <PrivateRote path="/clubInterface" component={ClubInterfice} />
                <PrivateRote path="/team/:id" component={Team} />
                <PrivateRote path="/event/:id" component={EventDetils} />
                <PrivateRote path="/chat/:id" component={Chat} />
            </Switch>
        </AuthProvaider>
      </Router>
    </div>
  );
}

export default App;
