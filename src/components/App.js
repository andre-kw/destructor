import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import AppContext from '../contexts/AppContext';
import LinkedListPage from '../routes/LinkedListPage';
import { BinaryTreePath } from '../routes/BinaryTreePage';
import { StackPath } from '../routes/StackPage';
import './App.css';

class App extends Component {
  static contextType = AppContext;

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.context.menuOff();
    }
  }

  render() {
    const navClass = this.context.menuVisible ? 'nav-show' : '';

    return (
      <>
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
          
          <section className="header-right">
            <button className="btn" onClick={() => this.context.menuToggle()}>Menu</button>
          </section>

          <nav className={navClass}>
            <button className="nav-close" onClick={this.context.menuToggle}>x</button>
            <Link to="/structure/linked-list" className="nav-ll">Linked list</Link>
            <Link to="/structure/stack" className="nav-stack">Stack</Link>
            <Link to="/structure/binary-tree" className="nav-bst">Binary search tree</Link>
          </nav>
        </header>

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
