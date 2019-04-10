import React, {Component} from 'react';
import LinkedList from '../modules/LinkedList.js';

export default class LinkedListPage extends Component {
  constructor(props) {
    super(props);

    const dsSLL1 = new LinkedList();
    dsSLL1.insertLast('test');
    dsSLL1.insertLast('another test');

    this.state = {
      ds: [dsSLL1],
    };
  }

  renderLinkedList() {
    let jsx = [];
    let tempNode = this.state.ds[0].head;

    if(! tempNode) return null;

    while(tempNode) {
      jsx.push(<p key={tempNode.value}>{tempNode.value}</p>);
      tempNode = tempNode.next;
    } 

    return jsx;
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
          {this.renderLinkedList()}
        </section>
      </main>
    );
  }
}
