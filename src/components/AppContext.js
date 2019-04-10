import React, {Component} from 'react';

const AppContext = React.createContext({
  thing: '',
});

export default AppContext;


export class AppProvider extends Component {
  state = {
    thing: 'test',
  }

  render() {
    const value = {
      thing: this.state.thing,
    };

    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

