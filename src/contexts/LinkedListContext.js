import React, {Component} from 'react';
import LinkedList from '../modules/LinkedList';

const LinkedListContext = React.createContext({
  console: [],
  ds: [],
  initLinkedList: () => {},
  clearLinkedList: () => {},
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
        {text:'[LinkedList]', type:'output'},
        {text:'linkedList.insertLast("how");', type:'input', nodeValue:'how'},
        {text:'linkedList.insertLast("are");', type:'input', nodeValue:'are'},
        {text:'linkedList.insertLast("you?");', type:'input', nodeValue:'you?'},
      ],
      ds: [],
    }

    // TODO: clean this garbage up
    this.initLinkedList = this.initLinkedList.bind(this);
    this.clearLinkedList = this.clearLinkedList.bind(this);
  }

  initLinkedList() {
    // TODO: make naming dynamic
    const dsSLL1 = new LinkedList();
    dsSLL1.insertLast('how');
    dsSLL1.insertLast('are');
    dsSLL1.insertLast('you?');
    this.setState({ds: [...this.state.ds, dsSLL1]});
  }

  clearLinkedList() {
    const newLL = new LinkedList();

    this.setState({ds: [newLL]});
  }

  

  render() {
    const value = {
      ds: this.state.ds,
      console: this.state.console,
      initLinkedList: this.initLinkedList,
      clearLinkedList: this.clearLinkedList,
    };

    return (
      <LinkedListContext.Provider value={value}>
        {this.props.children}
      </LinkedListContext.Provider>
    );
  }
}

