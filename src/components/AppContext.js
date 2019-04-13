import React, {Component} from 'react';
import LinkedList from '../modules/LinkedList';

const AppContext = React.createContext({
  console: [],
  ds: [],
  initLinkedList: () => {},
  rerender: () => {},
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
    this.rerender = this.rerender.bind(this);
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

  render() {
    const value = {
      ds: this.state.ds,
      console: this.state.console,
      initLinkedList: this.initLinkedList,
      rerender: this.rerender,
    };

    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

