import React, {Component} from 'react';
import Stack from '../modules/Stack';

const StackContext = React.createContext({
  console: [],
  ds: [],
  initStack: () => {},
  // clearLinkedList: () => {},
  // clearConsole: () => {},
  // rerender: () => {},
  // log: () => {},
  logDetails: () => {},
});

export default StackContext;


export class StackProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      console: [
        {text:'/* you can hover these console lines. try it! */', type:'comment'},
        {text:'/* create a stack */', type:'comment'},
        {text:'let stack = new Stack();', type:'input'},
        // {text:'linkedList.insertLast("test");', type:'input', nodeValue:'test'},
        // {text:'linkedList.insertLast("another test");', type:'input', nodeValue:'another test'},
        {text:'[Stack]', type:'output'},
      ],
      ds: [],
    }
  }

  initStack = () => {
    const dsStack1 = new Stack();
    dsStack1.push('last in');
    dsStack1.push('first out');
    this.setState({ds: [dsStack1, ...this.state.ds]});
  }

  clearConsole = () => {
    this.setState({
      console: [
        {text:'// console cleared', type:'comment'},
      ]
    })
  }

  // this is necessary to redraw a diagram after changing
  // a data structure
  rerender = () => {
    this.setState({ds: this.state.ds});
  }

  log = (text, type = 'input', nodeValue) => {
    this.state.console.push({text, type, nodeValue});
  }

  logDetails = () => {
    return false;
  }

  render() {
    const value = {
      ds: this.state.ds,
      console: this.state.console,
      initStack: this.initStack,
    };

    return (
      <StackContext.Provider value={value}>
        {this.props.children}
      </StackContext.Provider>
    );
  }
}

