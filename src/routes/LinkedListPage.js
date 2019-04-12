import React, {Component} from 'react';
import LinkedList from '../modules/LinkedList.js';
import Console from '../components/Console';
import AppContext from '../components/AppContext';
import './LinkedListPage.css';

function LinkedListItem(props) {
  let className = 'render-ll-item ';
  let text = (props.node) ? props.node.value : 'null';

  if(props.node) {
    className += (props.node.highlighted) ? 'render-highlighted' : '';
  } else {
    className += 'render-null';
  }

  return (
    <div className={className} onClick={() => props.showDetails(props.node)}>{text}</div>
  );
}

export default class LinkedListPage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);


    this.state = {
      console: [
        {text:'/* create a linked list */', type:'comment'},
        {text:'let linkedList = new LinkedList();', type:'input'},
        {text:'linkedList.insertLast("test");', type:'input', nodeId:0},
        {text:'linkedList.insertLast("another test");', type:'input', nodeId:1},
        {text:'[LinkedList]', type:'output'},
      ],
      inputValue: '',
    };


    this.addNode = this.addNode.bind(this);
    this.showDetails = this.showDetails.bind(this);
  }

  componentDidMount() {
    this.context.initLinkedList();
  }

  setVar(e) {
    if(e.target.name === 'value') {
      this.setState({inputValue: e.target.value});
    }
  }

  addNode(e) {
    e.preventDefault();
    e.currentTarget.value.value = '';

    let nodeId = this.context.ds[0].insertLast(this.state.inputValue);
    this.state.console.push({
      nodeId,
      text:`linkedList.insertLast('${this.state.inputValue}')`, 
      type:'input'});

    this.context.renderDiagram();
    this.context.scrollConsole();
  }

  showDetails(node) {
    // TODO: consider making console lines clickable to highlight nodes
    node = node ? node : {value:'null'};
    const nextNode = node.next ? node.next.value : 'null';

    this.state.console.push({text:`node: {`, type:'output-italic'});
    this.state.console.push({text:`   value: "${node.value}"`, type:'output-italic'});
    this.state.console.push({text:`   next: "${nextNode}"`, type:'output-italic'});
    this.state.console.push({text:`}`, type:'output-italic'});
    this.setState({inputValue: ''});
    this.context.scrollConsole();
  }

  renderLinkedList() {
    let jsx = [];
    let n = this.context.ds[0] ? this.context.ds[0].head : null;

    if(! n) return null;

    while(n) {
      jsx.push(<LinkedListItem showDetails={this.showDetails} key={Math.random()} node={n} />);
      n = n.next;
    } 

    jsx.push(<LinkedListItem showDetails={this.showDetails} key='null-item' />);

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
            <form onSubmit={(e) => this.addNode(e)}>
              <input type="text" name="value" onKeyUp={(e) => this.setVar(e)} autoComplete="off" placeholder=">"></input>
              <div>
                <button type="button" onClick={this.addNode}>Insert last</button>
              </div>
            </form>
            
            <Console console={this.state.console} />
          </div>
        </section>
      </main>
    );
  }
}
