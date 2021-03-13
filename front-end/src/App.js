import React, { Component } from 'react';
import LoginScreen from './login/LoginScreen';
import Portal from './portal/portal';
import {Switch, Route} from 'react-router-dom'

function App() {
      return (
        <Switch>
        <Route exact path='/' component={LoginScreen}/>
        <Route path='/portal' component={Portal}/>
      </Switch>
      
    );
  }

export default App;