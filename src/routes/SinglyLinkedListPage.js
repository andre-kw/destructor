import React, {Component} from 'react';
import AppContext from '../contexts/AppContext';
import Console from '../components/Console';
import SinglyLinkedListForm from '../components/SinglyLinkedListForm';
import './SinglyLinkedListPage.css';

// an individual diagram item
class SinglyLinkedListItem extends Component {
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


export default class SinglyLinkedListPage extends Component {
  static contextType = AppContext;

  componentDidMount() {
    this.context.initDs('singly-linked-list');
  }

  componentDidUpdate() {
    this.context.runAnimation('render-ll-item');
  }

  isEmpty = () => {
    if(this.context.ds) {
      return this.context.ds.head === null;
    }

    return true;
  }

  renderSinglyLinkedList = () => {
    let jsx = [];
    let n = this.context.ds ? this.context.ds.head : null;

    if(! n) return null;

    while(n) {
      jsx.push(<SinglyLinkedListItem key={Math.random()} node={n} />);
      n = n.next;
    } 

    jsx.push(<SinglyLinkedListItem key='null-item' />);

    return jsx;
  }

  render() {
    return (
      <main className="flex-main">
        <section className="ds-info">
          <div className="ds-controls">
            <Console />
            <SinglyLinkedListForm />
          </div>
        </section>

        <section className="ds-diagram">
          { this.isEmpty()
            ? <p className="alert-muted">List is empty; add some nodes!</p>
            : this.renderSinglyLinkedList() }
        </section>
      </main>
    );
  }
}
