import React, {Component} from 'react';
import LinkedList from '../modules/LinkedList';

const AppContext = React.createContext({
  console: [],
  ds: [],
  scrollConsole: () => {},
  highlightNode: () => {},
  initLinkedList: () => {},
  renderDiagram: () => {},
});

export default AppContext;


export class AppProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      console: [],
      ds: [],
    }

    this.initLinkedList = this.initLinkedList.bind(this);
    this.renderDiagram = this.renderDiagram.bind(this);
    this.highlightNode = this.highlightNode.bind(this);
  }

  scrollConsole() {
    // the timeout is necessary because it will scroll
    // before the element is added.
    setTimeout(() => {
      const el = document.getElementsByClassName('ds-console')[0];
    
      if(el) el.scrollTop = el.scrollHeight + 200;
    }, 100);
  }

  highlightNode(nodeId) {
    if(typeof nodeId !== 'undefined') {
      this.state.ds[0].toggleHighlight(nodeId);
      this.renderDiagram();
    }
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
  renderDiagram() {
    this.setState({ds: this.state.ds});
  }

  render() {
    const value = {
      ds: this.state.ds,
      console: this.state.console,
      scrollConsole: this.scrollConsole,
      highlightNode: this.highlightNode,
      initLinkedList: this.initLinkedList,
      renderDiagram: this.renderDiagram,
    };

    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

