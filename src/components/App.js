import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LinkedListPage from '../routes/LinkedListPage';
import './App.css';
import { LinkedListProvider } from '../contexts/LinkedListContext';

function LinkedListPath(props) {
  return <LinkedListProvider><LinkedListPage /></LinkedListProvider>;
}

class App extends Component {
  render() {
    return <>
      <header>
        <h1>destructor.</h1>
      </header>

      <Switch>
        <Route path="/" component={LinkedListPath} />
        <Route exact path="/linked-lists" component={LinkedListPage} />
      </Switch>
    </>;
  }
}

export default App;
