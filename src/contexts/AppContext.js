import React, { Component } from 'react';
import LinkedList from '../modules/LinkedList';
import { consoleDefaults } from '../components/Console';

const AppContext = React.createContext({
  console: [],
  ds: null,
  dsType: '',
  initDs: () => {},
  clearDs: () => {},
  rerenderDiagram: () => {},
  log: () => {},
  logDetails: () => {},
  highlightButton: () => {},
});

export default AppContext;


export class AppProvider extends Component {
  state = {
    console: [],
    ds: null,
    dsType: ''
  }

  initDs = (dsType) => {
    this.setState({dsType, console: consoleDefaults[dsType]});

    switch(dsType) {
      case 'linked-list':
        const ds = new LinkedList();
        ds.insertLast('how');
        ds.insertLast('are');
        ds.insertLast('you?');
        this.setState({ds});
        break;
      default:
        // do nothing
    }
  }

  clearDs = () => {
    const console = [{text:'// console cleared', type:'comment'}];
    let ds = null;

    switch(this.state.dsType) {
      case 'linked-list':   ds = new LinkedList(); break;
      default:
        // do nothing
    }

    this.setState({ds, console});
  }

  // redraw the diagram after changing the data structure
  rerenderDiagram = () => {
    this.setState({ds: this.state.ds});
  }

  log = (text, type = 'input', nodeValue) => {
    let dsConsole = this.state.console;
    dsConsole.push({text, type, nodeValue});

    this.setState({console: dsConsole});
  }

  logDetails = (node) => {
    let dsConsole = this.state.console;
    let output = null;

    if(! node) {
      dsConsole.push({text:`node: null`, type:'output-italic'});
      this.setState({console: dsConsole});
      return;
    }

    switch(this.state.dsType) {
      case 'linked-list':   output = LinkedList.printNode(node); break;
      default: // do nothing
    }

    dsConsole.push(...output);
    this.setState({console: dsConsole});
  }

  highlightButton = (id) => {
    const btn = document.getElementById(id);
    btn.classList.remove('btn-active');
    btn.classList.add('btn-active');

    setTimeout(() => {
      btn.classList.remove('btn-active');
    }, 1000);
  }

  render() {
    const value = {
      console: this.state.console,
      ds: this.state.ds,
      dsType: this.state.dsType,
      initDs: this.initDs,
      clearDs: this.clearDs,
      rerenderDiagram: this.rerenderDiagram,
      log: this.log,
      logDetails: this.logDetails,
      highlightButton: this.highlightButton,
    };

    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}