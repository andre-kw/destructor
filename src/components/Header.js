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
          <Link to="/" className="header-logo"><h1>destructor.</h1></Link>
          <h2>
            <Switch>
              <Route exact path="/example/singly-linked-list" render={() => 'Singly linked list'} />
              <Route exact path="/example/stack" render={() => 'Stack'} />
              <Route exact path="/example/binary-tree" render={() => 'Binary tree'} />
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
            <Link to="/example/singly-linked-list" className="nav-ll">Singly linked list</Link>
            <Link to="/example/stack" className="nav-stack">Stack</Link>
            <Link to="/example/binary-tree" className="nav-bst">Binary search tree</Link>
          </div>

          <div className="nav-bottom">
            <hr className="named-divider" data-separator="other" />
            <a href="http://github.com/andre-kw/destructor" target="_blank" rel="noopener noreferrer" alt="github">Github</a>
          </div>
        </nav>
      </header>
    );
  }
}