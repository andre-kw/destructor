import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import LinkedListPage from '../routes/LinkedListPage';
import './App.css';
import { LinkedListProvider } from '../contexts/LinkedListContext';

function LinkedListPath(props) {
  return <LinkedListProvider><LinkedListPage /></LinkedListProvider>;
}

class App extends Component {
  state = {
    page: 'Linked list'
  }

  setPage(page) {
    this.setState({page});
  }

  render() {
    return (
      <div id="root-container">
        <header>
          <h1>destructor.</h1>
          <h2>{this.state.page}</h2>
        </header>

        <nav>
          <Link to="/structure/linked-lists" onClick={() => this.setPage('Linked list')}>Linked list</Link>
          <Link to="/structure/binary-trees" onClick={() => this.setPage('Binary search trees')}>Binary search trees</Link>
        </nav>

        <Switch>
          <Route path="/" component={LinkedListPath} />
          <Route exact path="/structure/linked-lists" component={LinkedListPage} />
          <Route exact path="/structure/binary-trees" component={LinkedListPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
