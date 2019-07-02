import React, {Component} from 'react';
import Console from '../components/Console';
import LinkedListContext, { LinkedListProvider } from '../contexts/LinkedListContext';
import AppContext from '../contexts/AppContext';
import { LinkedListFunctions } from '../modules/LinkedList';
import './LinkedListPage.css';

// path for router to use
export function LinkedListPath(props) {
  return <LinkedListProvider><LinkedListPage /></LinkedListProvider>;
}

// diagram item
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

  // data structure functions //
  dsInsertLast = (e) => {
    e.preventDefault();

    if(this.context.input === '') return;

    this.context.highlightButton('ds-btn-insertlast');
    this.context.ds.insertLast(this.context.input);

    this.context.log(
      `linkedList.insertLast('${this.context.input}')`,
      'input',
      this.context.input);

    this.context.rerenderDiagram();
    this.setState({inputValue: ''});
    document.getElementById('value').value = '';
  }

  

  dsRemove = () => {
    if(this.context.input === '') return;

    let node = this.context.ds.remove(this.context.input);

    if(! node) {
      this.context.log('node not found', 'error');
      return;
    }

    this.context.log(`linkedList.remove('${this.context.input}')`);
    this.context.log(`removed node "${this.context.input}"`, 'output');

    this.context.rerenderDiagram();
    this.setState({inputValue: ''});
    document.getElementById('value').value = '';
  }

  dsClear = () => {
    this.context.clearDs();
  }

  dsIsEmpty = () => {
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

          <form onSubmit={(e) => this.dsInsertLast(e)}>
            <input type="text" name="value" id="value" onKeyUp={(e) => this.context.setInput(e)} autoComplete="off" maxLength="20" placeholder="> type text here"></input>
            <div>
              <button type="button" id="ds-btn-insertlast" onClick={this.dsInsertLast}>Insert last</button>
              <button type="button" onClick={() => LinkedListFunctions.insertFirst(this.context)}>Insert first</button>
              <button type="button" onClick={this.dsRemove}>Remove item</button>
              <button type="button" onClick={this.dsClear}>Clear</button>
            </div>
          </form>
          </div>
        </section>

        <section className="ds-diagram">
          { this.dsIsEmpty()
            ? <p className="alert-muted">List is empty; add some nodes!</p>
            : this.renderLinkedList() }
        </section>
      </main>
    );
  }
}
