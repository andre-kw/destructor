import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import AppContext from '../contexts/AppContext';
import LinkedListPage from '../routes/LinkedListPage';
import { BinaryTreePath } from '../routes/BinaryTreePage';
import { StackPath } from '../routes/StackPage';
import Header from '../components/Header';
import './App.css';

class App extends Component {
  static contextType = AppContext;

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.context.menuOff();
    }
  }

  render() {

    return (
      <>
        <Header />

        <Switch>
          <Route exact path="/" component={LinkedListPage} />
          <Route exact path="/structure/linked-list" component={LinkedListPage} />
          <Route exact path="/structure/stack" component={StackPath} />
          <Route exact path="/structure/binary-tree" component={BinaryTreePath} />
        </Switch>

        <footer>
          <p>© 2019 Andre Willie.</p>
        </footer>
      </>
    );
  }
}

export default withRouter(App);
