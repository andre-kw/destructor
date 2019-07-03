import React, {Component} from 'react';
import AppContext from '../contexts/AppContext';
import Console from '../components/Console';
import LinkedListForm from '../components/LinkedListForm';
import './LinkedListPage.css';

// an individual diagram item
class LinkedListItem extends Component {
  static contextType = AppContext;

  render() {
    let className = 'render-ll-item ';
    let text = (this.props.node) ? this.props.node.value : 'null';
  
    if(this.props.node) {
      className += (this.props.node.highlighted) ? 'render-highlighted' : '';
    } else {
      className += 'render-null';
    }
  
    return (
      <div className={className} onClick={() => this.context.logDetails(this.props.node)}>{text}</div>
    );
  }
}


export default class LinkedListPage extends Component {
  static contextType = AppContext;

  componentDidMount() {
    this.context.initDs('linked-list');
  }

  isEmpty = () => {
    if(this.context.ds) {
      return this.context.ds.head === null;
    }

    return true;
  }

  renderLinkedList() {
    let jsx = [];
    let n = this.context.ds ? this.context.ds.head : null;

    if(! n) return null;

    while(n) {
      jsx.push(<LinkedListItem key={Math.random()} node={n} />);
      n = n.next;
    } 

    jsx.push(<LinkedListItem key='null-item' />);

    return jsx;
  }

  render() {
    return (
      <main className="flex-main">
        <section className="ds-info">
          <div className="ds-controls">
            <Console />
            <LinkedListForm />
          </div>
        </section>

        <section className="ds-diagram">
          { this.isEmpty()
            ? <p className="alert-muted">List is empty; add some nodes!</p>
            : this.renderLinkedList() }
        </section>
      </main>
    );
  }
}
