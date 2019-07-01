import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { AppProvider } from '../contexts/AppContext';
import { LinkedListPath } from '../routes/LinkedListPage';
import { BinaryTreePath } from '../routes/BinaryTreePage';
import { StackPath } from '../routes/StackPage';
import './App.css';

class App extends Component {
  render() {
    const PLACEHOLDER = <nav>
      <Link to="/structure/linked-list" className="nav-ll">Linked list</Link>
      <Link to="/structure/stack" className="nav-stack">Stack</Link>
      <Link to="/structure/binary-tree" className="nav-bst">Binary search tree</Link>
    </nav>;

    return <>
      <header>
        <section className="header-left">
          <h1>destructor.</h1>
          <h2>
            <Switch>
              <Route exact path="/" render={() => 'Linked list'} />
              <Route exact path="/structure/linked-list" render={() => 'Linked list'} />
              <Route exact path="/structure/stack" render={() => 'Stack'} />
              <Route exact path="/structure/binary-tree" render={() => 'Binary tree'} />
            </Switch>
          </h2>
        </section>
        
        <section className="header-right"></section>
      </header>

      <AppProvider>
        <Switch>
          <Route exact path="/" component={LinkedListPath} />
          <Route exact path="/structure/linked-list" component={LinkedListPath} />
          <Route exact path="/structure/stack" component={StackPath} />
          <Route exact path="/structure/binary-tree" component={BinaryTreePath} />
        </Switch>
      </AppProvider>

      <footer>
        <p>© 2019 Andre Willie.</p>
      </footer>
    </>;
  }
}

export default App;
