import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import AppContext from '../contexts/AppContext';
import IndexPage from '../routes/IndexPage';
import SinglyLinkedListPage from '../routes/SinglyLinkedListPage';
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
    return <>
      <Header />

      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/example/singly-linked-list" component={SinglyLinkedListPage} />
        <Route exact path="/example/stack" component={StackPage} />
      </Switch>

      <footer>
        <p>© 2019 Andre Willie.</p>
      </footer>
    </>;
  }
}

export default withRouter(App);
