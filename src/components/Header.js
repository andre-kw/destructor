import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import AppContext from '../contexts/AppContext';

export default class Header extends Component {
  static contextType = AppContext;

  render() {
    const navClass = this.context.menuVisible ? 'nav-show' : '';

    return (
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

          <nav className={navClass} onBlur={this.context.menuOff} tabIndex="0">
            <button className="nav-close" onClick={this.context.menuOff}>x</button>

            <div className="nav-top">
              <hr className="named-divider" data-separator="data structures" />
              <Link to="/structure/linked-list" className="nav-ll">Linked list</Link>
              <Link to="/structure/stack" className="nav-stack">Stack</Link>
              <Link to="/structure/binary-tree" className="nav-bst">Binary search tree</Link>
            </div>

            <div className="nav-bottom">
              <hr className="named-divider" data-separator="other" />
              <a href="http://github.com/andre-kw/destructor" target="_blank" alt="github">Github</a>
            </div>
          </nav>
        </header>
    );
  }
}