import React, { Component } from 'react';
import Console from '../components/Console';
import StackContext, { StackProvider } from '../contexts/StackContext';

export function StackPath(props) {
  return <StackProvider><StackPage /></StackProvider>;
}

class StackItem extends Component {
  static contextType = StackContext;

  render() {
    let className = 'render-stack-item ';
    let text = (this.props.node) ? this.props.node.value : 'null';
  
    if(this.props.node) {
      // className += (this.props.node.highlighted) ? 'render-highlighted' : '';
    } else {
      className += 'render-null';
    }
  
    return (
      <div className={className} onClick={() => this.context.logDetails(this.props.node)}>{text}</div>
    );
  }
}


export default class StackPage extends Component {
  static contextType = StackContext;

  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };
  }

  componentDidMount() {
    this.context.initStack();
  }
  
  setVar = (e) => {
    if(e.target.name === 'value') {
      this.setState({inputValue: e.target.value});
    }
  }

  // data structure functions //
  dsInsert = () => {
    return null;
  }

  dsIsEmpty = () => {
    if(this.context.ds[0]) {
      return this.context.ds[0].top === null;
    }

    return true;
  }

  renderStack = () => {
    let jsx = [];
    let n = this.context.ds[0] ? this.context.ds[0].top : null;

    if(! n) return null;

    while(n) {
      jsx.push(<StackItem key={Math.random()} node={n} />);
      n = n.next;
    } 

    //jsx.push(<StackItem key='null-item' />);

    return jsx;
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