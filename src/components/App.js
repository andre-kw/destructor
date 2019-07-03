import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import AppContext from '../contexts/AppContext';
import LinkedListPage from '../routes/LinkedListPage';
import StackPage from '../routes/StackPage';
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
          <Route exact path="/structure/stack" component={StackPage} />
        </Switch>

        <footer>
          <p>© 2019 Andre Willie.</p>
        </footer>
      </>
    );
  }
}

export default withRouter(App);
