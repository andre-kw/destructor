import React, {Component} from 'react';
import Stack from '../modules/Stack';

const StackContext = React.createContext({
  console: [],
  ds: [],
  initStack: () => {},
  stackPush: () => {},
  stackPop: () => {},
  // clearLinkedList: () => {},
  clearConsole: () => {},
  rerender: () => {},
  log: () => {},
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
        {text:'[Stack]', type:'output'},
        {text:'stack.push("first out");', type:'input', nodeValue:'first out'},
        {text:'stack.push("last in");', type:'input', nodeValue:'last in'},
      ],
      ds: [],
    }
  }

  initStack = () => {
    const dsStack1 = new Stack();
    dsStack1.push('first out');
    dsStack1.push('last in');
    this.setState({ds: [dsStack1, ...this.state.ds]});
  }

  stackPush = (value) => {
    if(value === '') return;

    this.state.ds[0].push(value);

    this.log(
      `stack.push('${value}')`,
      'input',
      value);

    this.rerender();
  }

  stackPop = () => {
    if(this.state.ds[0].top === null) return;

    this.state.ds[0].pop();

    this.log(
      `stack.pop()`,
      'input');

    this.rerender();
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
      stackPush: this.stackPush,
      stackPop: this.stackPop,
      clearConsole: this.clearConsole,
      rerender: this.rerender,
      log: this.log,
      logDetails: this.logDetails,
    };

    return (
      <StackContext.Provider value={value}>
        {this.props.children}
      </StackContext.Provider>
    );
  }
}

