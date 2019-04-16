import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import LinkedListPage from '../routes/LinkedListPage';
import BinaryTreePage from '../routes/BinaryTreePage';
import './App.css';
import { LinkedListProvider } from '../contexts/LinkedListContext';
import { BinaryTreeProvider } from '../contexts/BinaryTreeContext';

function LinkedListPath(props) {
  return <LinkedListProvider><LinkedListPage /></LinkedListProvider>;
}

function BinaryTreePath(props) {
  return <BinaryTreeProvider><BinaryTreePage /></BinaryTreeProvider>;
}

class App extends Component {
  render() {
    return (
      <div id="root-container">
        <header>
          <h1>destructor.</h1>
          <h2>
            <Switch>
              <Route exact path="/" render={() => 'Linked list'} />
              <Route exact path="/structure/linked-list" render={() => 'Linked list'} />
              <Route exact path="/structure/binary-tree" render={() => 'Binary tree'} />
            </Switch>
          </h2>
        </header>

        <nav>
          <Link to="/structure/linked-list" className="nav-ll">Linked list</Link>
          <Link to="/structure/binary-tree" className="nav-bst">Binary search tree</Link>
        </nav>

        <Switch>
          <Route exact path="/" component={LinkedListPath} />
          <Route exact path="/structure/linked-list" component={LinkedListPath} />
          <Route exact path="/structure/binary-tree" component={BinaryTreePath} />
        </Switch>
      </div>
    );
  }
}

export default App;
