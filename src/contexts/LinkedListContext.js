import React, {Component} from 'react';
import LinkedList from '../modules/LinkedList';

const LinkedListContext = React.createContext({
  console: [],
  ds: [],
  initLinkedList: () => {},
  clearLinkedList: () => {},
  clearConsole: () => {},
  rerender: () => {},
  log: () => {},
  logDetails: () => {},
});

export default LinkedListContext;


export class LinkedListProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      console: [
        {text:'/* you can hover these console lines. try it! */', type:'comment'},
        {text:'/* create a linked list */', type:'comment'},
        {text:'let linkedList = new LinkedList();', type:'input'},
        {text:'linkedList.insertLast("test");', type:'input', nodeValue:'test'},
        {text:'linkedList.insertLast("another test");', type:'input', nodeValue:'another test'},
        {text:'[LinkedList]', type:'output'},
      ],
      ds: [],
    }

    this.initLinkedList = this.initLinkedList.bind(this);
    this.clearLinkedList = this.clearLinkedList.bind(this);
    this.clearConsole = this.clearConsole.bind(this);
    this.rerender = this.rerender.bind(this);
    this.log = this.log.bind(this);
    this.logDetails = this.logDetails.bind(this);
  }

  initLinkedList() {
    // TODO: make naming dynamic
    const dsSLL1 = new LinkedList();
    dsSLL1.insertLast('test');
    dsSLL1.insertLast('another test');
    this.setState({ds: [...this.state.ds, dsSLL1]});
  }

  clearLinkedList() {
    const newLL = new LinkedList();

    this.setState({ds: [newLL]});
  }

  clearConsole() {
    this.setState({
      console: [
        {text:'// console cleared', type:'comment'},
      ]
    })
  }

  // this is necessary to redraw a diagram after changing
  // a data structure
  rerender() {
    this.setState({ds: this.state.ds});
  }

  log(text, type = 'input', nodeValue) {
    this.state.console.push({text, type, nodeValue});
  }

  logDetails(node) {
    if(! node) {
      this.state.console.push({text:`node: null`, type:'output-italic'});
      this.rerender();
      return;
    }
    const nextNode = node.next ? node.next.value : 'null';

    this.state.console.push({text:`node: {`, type:'output-italic'});
    this.state.console.push({text:`   value: "${node.value}"`, type:'output-italic'});
    this.state.console.push({text:`   next: "${nextNode}"`, type:'output-italic'});
    this.state.console.push({text:`}`, type:'output-italic'});
    this.rerender();
  }

  render() {
    const value = {
      ds: this.state.ds,
      console: this.state.console,
      initLinkedList: this.initLinkedList,
      clearLinkedList: this.clearLinkedList,
      clearConsole: this.clearConsole,
      rerender: this.rerender,
      log: this.log,
      logDetails: this.logDetails,
    };

    return (
      <LinkedListContext.Provider value={value}>
        {this.props.children}
      </LinkedListContext.Provider>
    );
  }
}

