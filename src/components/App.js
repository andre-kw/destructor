import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppContext from './AppContext';
import LinkedListPage from '../routes/LinkedListPage';
import './App.css';

class App extends Component {
  static contextType = AppContext;

  render() {
    return <>
      <header>
        <h1>destructor</h1>
      </header>

      <Switch>
        <Route path="/" component={LinkedListPage} />
        <Route exact path="/linked-lists" component={LinkedListPage} />
      </Switch>
    </>;
  }
}

export default App;
