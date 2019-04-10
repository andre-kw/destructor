import React, {Component} from 'react';
import LinkedList from '../modules/LinkedList.js';
import './LinkedListPage.css';

function LinkedListItem(props) {
  let className = 'render-ll-item ';
  let text = (props.node) ? props.node.value : 'null';
  className += (! props.node) ? 'render-null' : '';

  return (
    <div className={className} onClick={() => props.showDetails(props.node)}>{text}</div>
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
      console: [
        {text:'/* linked list created. */', type:'comment'},
        {text:'let linkedList = new LinkedList();', type:'input'},
        {text:'[LinkedList]', type:'output'},
      ],
      inputValue: '',
    };

    this.addNode = this.addNode.bind(this);
    this.showDetails = this.showDetails.bind(this);
  }

  setVar(e) {
    if(e.target.name === 'value') {
      this.setState({inputValue: e.target.value});
    }
  }

  addNode(e) {
    e.preventDefault();

    this.state.ds[0].insertLast(this.state.inputValue);
    // TODO: give more detailed output
    this.state.console.push({text:`linkedList.insertLast('${this.state.inputValue}')`, type:'input'});
    this.setState({ds: this.state.ds}); // re-render
  }

  showDetails(node) {
    // TODO: make this more readable by only printing relevant info
    // TODO: consider making console lines clickable to highlight nodes
    this.state.console.push({text:`node: ${JSON.stringify(node)}`, type:'output'});
    this.setState({inputValue: ''});
  }

  renderLinkedList() {
    let jsx = [];
    let n = this.state.ds[0].head;

    if(! n) return null;

    while(n) {
      jsx.push(<LinkedListItem showDetails={this.showDetails} key={Math.random()} node={n} />);
      n = n.next;
    } 

    jsx.push(<LinkedListItem showDetails={this.showDetails} key='null-item' />);

    return jsx;
  }

  renderConsole() {
    let jsx = [];

    this.state.console.forEach((line, index) => {
      let className = 'line-' + line.type;

      jsx.push(<p className={className} key={index}>{line.text}</p>);
    });

    return jsx;
  }

  render() {
    return (
      <main>
        <section className="ds-select">
          <h2>linked lists</h2>
        </section>

        <section className="ds-controls">
          <form onSubmit={(e) => this.addNode(e)}>
            <input type="text" name="value" onKeyUp={(e) => this.setVar(e)} autoComplete="off"></input>
            <button type="button" onClick={this.addNode}>Insert last</button>
          </form>
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
