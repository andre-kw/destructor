import React, { Component } from 'react';
import Console from '../components/Console';
import StackContext, { StackProvider } from '../contexts/StackContext';

export function StackPath(props) {
  return <StackProvider><StackPage /></StackProvider>;
}


export default class StackPage extends Component {
  static contextType = StackContext;

  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };
  }
  
  setVar(e) {
    if(e.target.name === 'value') {
      this.setState({inputValue: e.target.value});
    }
  }

  // data structure functions //
  dsInsert = () => {
    return null;
  }

  dsIsEmpty = () => {
    // if(this.context.ds[0]) {
    //   return this.context.ds[0].head === null;
    // }

    return true;
  }

  renderStack = () => {
    return '';
  }

  render() {
    return (
      <main>
        <section className="ds-render">
          <div className="ds-diagram">
            { this.dsIsEmpty()
              ? <p className="alert-muted">Stack is empty; add some nodes!</p>
              : this.renderStack() }
          </div>

          <div className="ds-controls">
            <form onSubmit={() => {}}>
              <input type="text" name="value" id="value" onKeyUp={(e) => this.setVar(e)} autoComplete="off" placeholder=">"></input>
              <div>
                <button type="button" onClick={this.dsInsert}>Insert</button>
              </div>
            </form>
            
            {/* <Console hover={this.highlightNode} console={this.context.console} /> */}
          </div>
        </section>
      </main>
    );
  }
}