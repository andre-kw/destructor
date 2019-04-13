import React, {Component} from 'react';
import LinkedList from '../modules/LinkedList';

const LinkedListContext = React.createContext({
  console: [],
  ds: [],
  initLinkedList: () => {},
  rerender: () => {},
  logDetails: () => {},
});

export default LinkedListContext;


export class LinkedListProvider extends Component {
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
      ds: [],
    }

    this.initLinkedList = this.initLinkedList.bind(this);
    this.rerender = this.rerender.bind(this);
    this.logDetails = this.logDetails.bind(this);
  }

  initLinkedList() {
    // TODO: make naming dynamic
    const dsSLL1 = new LinkedList();
    dsSLL1.insertLast('test');
    dsSLL1.insertLast('another test');
    this.setState({ds: [...this.state.ds, dsSLL1]});
  }

  // this is necessary to redraw a diagram after changing
  // a data structure
  rerender() {
    this.setState({ds: this.state.ds});
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
      rerender: this.rerender,
      logDetails: this.logDetails,
    };

    return (
      <LinkedListContext.Provider value={value}>
        {this.props.children}
      </LinkedListContext.Provider>
    );
  }
}

