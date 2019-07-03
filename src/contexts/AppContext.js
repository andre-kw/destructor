import React, { Component } from 'react';
import LinkedList from '../modules/LinkedList';
import { consoleDefaults } from '../config';

const AppContext = React.createContext({
  console: [],
  ds: null,
  dsType: '',
  input: '',
  menuVisible: false,
  initDs: () => {},
  clearDs: () => {},
  rerenderDiagram: () => {},
  log: () => {},
  logDetails: () => {},
  highlightButton: () => {},
  highlightNode: () => {},
  setInput: () => {},
  validateInput: () => {},
  menuToggle: () => {},
  menuOff: () => {},
});

export default AppContext;



export class AppProvider extends Component {
  state = {
    console: [],
    ds: null,
    dsType: '',
    input: '',
    menuVisible: false,
  }

  initDs = (dsType) => {
    let ds = null;

    switch(dsType) {
      case 'linked-list':   ds = LinkedList.generate(); break;
      default: // do nothing
    }

    this.setState({ds, dsType, console: consoleDefaults[dsType]});
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

  highlightButton = (id, success = true) => {
    const btn = document.getElementById(id);
    const classname = success ? 'btn-active' : 'btn-active-error';

    btn.classList.remove('btn-active', 'btn-active-error');
    btn.classList.add(classname);

    setTimeout(() => {
      btn.classList.remove(classname);
    }, 1000);
  }

  highlightNode = (nodeValue) => {
    if(typeof nodeValue !== 'undefined') {
      this.state.ds.toggleHighlight(nodeValue);
      this.rerenderDiagram();
    }
  }

  setInput = (e) => {
    if(e === '') {
      this.setState({input: ''});
      document.getElementById('value').value = '';
      return;
    } else if(e.target.name === 'value') {
      this.setState({input: e.target.value});
    }
  }

  validateInput = (id) => {
    let valid = true;

    if(this.state.input === '') valid = false;

    this.highlightButton(id, valid);
    return valid;
  }

  // this method isn't great for accessibility
  menuToggle = () => {
    if(! this.state.menuVisible) {
      setTimeout(() => {
        document.getElementsByTagName('NAV')[0].focus();
      }, 450);
    }
    this.setState({menuVisible: ! this.state.menuVisible});
  }

  // timeout is necessary because links won't work 
  // if nav disappears immediately
  menuOff = () => {
    document.getElementsByTagName('NAV')[0].classList.add('nav-hiding');

    setTimeout(() => {
      this.setState({menuVisible: false});
    }, 150);
  }

  render() {
    const value = {
      console: this.state.console,
      ds: this.state.ds,
      dsType: this.state.dsType,
      input: this.state.input,
      menuVisible: this.state.menuVisible,
      initDs: this.initDs,
      clearDs: this.clearDs,
      rerenderDiagram: this.rerenderDiagram,
      log: this.log,
      logDetails: this.logDetails,
      highlightButton: this.highlightButton,
      highlightNode: this.highlightNode,
      setInput: this.setInput,
      validateInput: this.validateInput,
      menuToggle: this.menuToggle,
      menuOff: this.menuOff,
    };

    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}