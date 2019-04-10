import React, { Component } from 'react';
import AppContext from './AppContext';
import './App.css';

class App extends Component {
  static contextType = AppContext;

  render() {
    return <>
      <header>
        <h1>destructor</h1>
      </header>

      <main>
        <section className="ds-select">
          <h2>linked list</h2>
        </section>

        <section className="ds-controls">
        </section>

        <section className="ds-render">
        </section>
      </main>
    </>;
  }
}

export default App;
