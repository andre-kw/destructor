import React, {Component} from 'react';
import LinkedList from '../structures/LinkedList.js';

export default class LinkedListPage extends Component {
  constructor(props) {
    super(props);

    const dsSLL1 = new LinkedList('test');

    this.state = {
      ds: [dsSLL1],
    };
  }

  render() {
    console.log(this.state.ds[0]);
    return (
      <main>
        <section className="ds-select">
          <h2>linked list</h2>
        </section>

        <section className="ds-controls">
        </section>

        <section className="ds-render">
        </section>
      </main>
    );
  }
}
