import React, {Component} from 'react';
import Console from '../components/Console';
import LinkedListContext, { LinkedListProvider } from '../contexts/LinkedListContext';
import './LinkedListPage.css';

export function LinkedListPath(props) {
  return <LinkedListProvider><LinkedListPage /></LinkedListProvider>;
}

class LinkedListItem extends Component {
  static contextType = LinkedListContext;

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
  static contextType = LinkedListContext;

  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };

    this.dsInsertLast = this.dsInsertLast.bind(this);
    this.dsInsertFirst = this.dsInsertFirst.bind(this);
    this.dsRemove = this.dsRemove.bind(this);
    this.dsClear = this.dsClear.bind(this);
    this.highlightNode = this.highlightNode.bind(this);
  }

  componentDidMount() {
    this.context.initLinkedList();
  }

  setVar(e) {
    if(e.target.name === 'value') {
      this.setState({inputValue: e.target.value});
    }
  }

  // data structure functions
  dsInsertLast(e) {
    e.preventDefault();

    if(this.state.inputValue === '') return;

    this.context.ds[0].insertLast(this.state.inputValue);

    this.context.log(
      `linkedList.insertLast('${this.state.inputValue}')`,
      'input',
      this.state.inputValue);

    this.context.rerender();
    this.setState({inputValue: ''});
    document.getElementById('value').value = '';
  }

  dsInsertFirst() {
    if(this.state.inputValue === '') return;

    this.context.ds[0].insertFirst(this.state.inputValue);

    this.context.log(
      `linkedList.insertFirst('${this.state.inputValue}')`, 
      'input',
      this.state.inputValue);

    this.context.rerender();
    this.setState({inputValue: ''});
    document.getElementById('value').value = '';
  }

  dsRemove() {
    if(this.state.inputValue === '') return;

    let node = this.context.ds[0].remove(this.state.inputValue);

    if(! node) {
      this.context.log('node not found', 'error');
      return;
    }

    this.context.log(`linkedList.remove('${this.state.inputValue}')`);
    this.context.log(`removed node "${this.state.inputValue}"`, 'output');

    this.context.rerender();
    this.setState({inputValue: ''});
    document.getElementById('value').value = '';
  }

  dsClear() {
    this.context.clearLinkedList();
    this.context.clearConsole();
  }

  dsIsEmpty() {
    if(this.context.ds[0]) {
      return this.context.ds[0].head === null;
    }

    return true;
  }

  highlightNode(nodeValue) {
    if(typeof nodeValue !== 'undefined') {
      this.context.ds[0].toggleHighlight(nodeValue);
      this.context.rerender();
    }
  }

  renderLinkedList() {
    let jsx = [];
    let n = this.context.ds[0] ? this.context.ds[0].head : null;

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
      <main>
        <section className="ds-render">
          <div className="ds-diagram">
            { this.dsIsEmpty()
              ? <p className="alert-muted">List is empty; add some nodes!</p>
              : this.renderLinkedList() }
          </div>

          <div className="ds-controls">
            <form onSubmit={(e) => this.dsInsertLast(e)}>
              <input type="text" name="value" id="value" onKeyUp={(e) => this.setVar(e)} autoComplete="off" placeholder=">"></input>
              <div>
                <button type="button" onClick={this.dsInsertLast}>Insert last</button>
                <button type="button" onClick={this.dsInsertFirst}>Insert first</button>
                <button type="button" onClick={this.dsRemove}>Remove item</button>
                <button type="button" onClick={this.dsClear}>Clear</button>
              </div>
            </form>
            
            <Console hover={this.highlightNode} console={this.context.console} />
          </div>
        </section>
      </main>
    );
  }
}
