import React, { createContext, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Characters from './Components/Characters';
import './App.css';
import AuthExample from './Auth/Auth';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch> 
                <Route exact path="/" component={Register}/> 
                <Route exact path="/login" component={Login} />
                <Route exact path="/main" component={Characters} />
                <Route exact path="/r" component={AuthExample}/>        
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
