import React, {Component} from 'react';
import Console from '../components/Console';
import LinkedListContext, { LinkedListProvider } from '../contexts/LinkedListContext';
import './LinkedListPage.css';

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

  dsInsertLast(e) {
    e.preventDefault();

    if(this.state.inputValue === '') return;

    let nodeId = this.context.ds[0].insertLast(this.state.inputValue);
    this.context.console.push({
      nodeId,
      text:`linkedList.insertLast('${this.state.inputValue}')`, 
      type:'input'});

    this.context.rerender();
    this.setState({inputValue: ''});
    document.getElementById('value').value = '';
  }

  highlightNode(nodeId) {
    if(typeof nodeId !== 'undefined') {
      this.context.ds[0].toggleHighlight(nodeId);
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
        <section className="ds-select">
          <h2>linked lists</h2>
        </section>

        <section className="ds-render">
          <div className="ds-diagram">
            {this.renderLinkedList()}
          </div>

          <div className="ds-controls">
            <form onSubmit={(e) => this.dsInsertLast(e)}>
              <input type="text" name="value" id="value" onKeyUp={(e) => this.setVar(e)} autoComplete="off" placeholder=">"></input>
              <div>
                <button type="button" onClick={this.dsInsertLast}>Insert last</button>
                <button type="button" onClick={() => {}}>Insert first</button>
                <button type="button" onClick={() => {}}>Remove item</button>
                <button type="button" onClick={() => {}}>Clear</button>
              </div>
            </form>
            
            <Console hover={this.highlightNode} console={this.context.console} />
          </div>
        </section>
      </main>
    );
  }
}
