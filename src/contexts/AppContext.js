import React, { Component } from 'react';
import SinglyLinkedList from '../modules/SinglyLinkedList';
import Stack from '../modules/Stack';
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
  primeAnimation: () => {},
  runAnimation: () => {},
});

export default AppContext;



export class AppProvider extends Component {
  state = {
    console: [],
    ds: null,
    dsType: '',
    input: '',
    menuVisible: false,
    animationPrimed: false,
    animationIndex: 0,
  }

  initDs = (dsType) => {
    let ds = null;

    switch(dsType) {
      case 'singly-linked-list':   ds = SinglyLinkedList.generate(); break;
      case 'stack':   ds = Stack.generate(); break;
      default: // do nothing
    }

    // implicitly clone consoleDefaults array
    this.setState({ds, dsType, console: consoleDefaults[dsType].slice(0)});
  }

  clearDs = () => {
    const console = [{text:'// console cleared', type:'comment'}];
    let ds = null;

    switch(this.state.dsType) {
      case 'singly-linked-list':   ds = new SinglyLinkedList(); break;
      case 'stack':   ds = new Stack(); break;
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
      case 'singly-linked-list':   output = SinglyLinkedList.printNode(node); break;
      default: // do nothing
    }

    dsConsole.push(...output);
    this.setState({console: dsConsole});
  }

  highlightButton = (id, success = true) => {
    const btn = document.getElementById(id);
    const txt = document.getElementById('value');
    const classname = success ? 'btn-active' : 'btn-active-error';

    if(! success) {
      txt.focus();
      txt.classList.add('input-error');
    }

    btn.classList.remove('btn-active', 'btn-active-error');
    btn.classList.add(classname);

    setTimeout(() => {
      btn.classList.remove(classname);
      txt.classList.remove('input-error');
    }, 500);
  }

  highlightNode = (nodeValue) => {
    if(typeof nodeValue !== 'undefined') {
      this.state.ds.toggleHighlight(nodeValue);
      this.rerenderDiagram();
    }
  }

  // valid parameters are: empty string (to clear input),
  // listener event directly on input element,
  // or listener event on form
  setInput = (e, callback = () => {}) => {
    if(e === '') {
      this.setState({input: ''});
      document.getElementById('value').value = '';
      return;
    } else if(e.target.name === 'value') {
      // TODO: add .trim() to input
      this.setState({input: e.target.value});
    } else if(e.target.value) {
      this.setState({input: e.target.value.value}, callback);
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
      }, 400);
    }
    this.setState({menuVisible: ! this.state.menuVisible});
  }

  // timeout is necessary because links won't work 
  // if nav disappears immediately
  menuOff = () => {
    const nav = document.getElementsByTagName('NAV')[0];
    nav.classList.add('nav-hiding');

    setTimeout(() => {
      nav.classList.remove('nav-hiding');
      this.setState({menuVisible: false});
    }, 300);
  }

  // only allow animations to run during a short period.
  // this prevents animations from rerunning every time 
  // the page component is updated
  primeAnimation = (animationIndex = 0) => {
    this.setState({animationPrimed: true, animationIndex}, () => {
      setTimeout(() => {
        this.setState({animationPrimed: false})
      }, 1000);
    });
  }

  // please don't judge this bootleg animation
  runAnimation = (classname) => {
    if(! this.state.animationPrimed) return;

    const elements = [...document.getElementsByClassName(classname)];
    let index = this.state.animationIndex;
    index = index < 0 ? elements.length + index : index;

    if(elements.length > 1) {
      const el = elements[index];
      el.classList.add(`${classname}-enter`);

      setTimeout(() => {
        el.classList.remove(`${classname}-enter`);
      }, 1000);
    }
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
      primeAnimation: this.primeAnimation,
      runAnimation: this.runAnimation,
    };

    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}