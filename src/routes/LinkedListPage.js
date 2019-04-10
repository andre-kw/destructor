import React, {Component} from 'react';
import LinkedList from '../modules/LinkedList.js';
import './LinkedListPage.css';

function LinkedListItem(props) {
  let className = 'render-ll-item ';
  let text = (props.node) ? props.node.value : 'null';
  className += (! props.node) ? 'render-null' : '';

  return (
    <div className={className}>{text}</div>
  );
}

export default class LinkedListPage extends Component {
  constructor(props) {
    super(props);

    const dsSLL1 = new LinkedList();
    dsSLL1.insertLast('test');
    dsSLL1.insertLast('another test');

    this.state = {
      ds: [dsSLL1],
      console: ['/* linked list created. */'],
    };
  }

  renderLinkedList() {
    let jsx = [];
    let n = this.state.ds[0].head;

    if(! n) return null;

    while(n) {
      jsx.push(<LinkedListItem key={n.value} node={n} />);
      n = n.next;
    } 

    jsx.push(<LinkedListItem key='null-item' />);

    return jsx;
  }

  renderConsole() {
    let jsx = [];

    this.state.console.forEach(line => {
      jsx.push(<p>{line}</p>);
    });

    return jsx;
  }

  render() {
    console.log(this.state.ds[0]);
    return (
      <main>
        <section className="ds-select">
          <h2>linked lists</h2>
        </section>

        <section className="ds-controls">
        </section>

        <section className="ds-render">
          <div className="ds-diagram">
            {this.renderLinkedList()}
          </div>
          <div className="ds-console">
            <code>{this.renderConsole()}</code>
          </div>
        </section>
      </main>
    );
  }
}
