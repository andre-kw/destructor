import React, { Component } from 'react';
import AppContext from '../contexts/AppContext';
import StackForm from '../components/StackForm';
import Console from '../components/Console';
import './StackPage.css';

class StackItem extends Component {
  static contextType = AppContext;

  render() {
    let className = 'render-stack-item ';
    let text = (this.props.node) ? this.props.node.value : 'null';
  
    if(this.props.node) {
      className += (this.props.node.highlighted) ? 'render-highlighted' : '';
    } else {
      className += 'render-null';
    }
  
    return (
      <div className={className} onClick={() => this.context.logDetails(this.props.node)}>{text}</div>
    );
  }
}


export default class StackPage extends Component {
  static contextType = AppContext;

  componentDidMount() {
    this.context.initDs('stack');
  }

  isEmpty = () => {
    if(this.context.ds) {
      return this.context.ds.top === null;
    }

    return true;
  }

  highlightNode = (nodeValue) => {
    if(typeof nodeValue !== 'undefined') {
      this.context.ds.toggleHighlight(nodeValue);
      this.context.rerenderDiagram();
    }
  }

  renderStack = () => {
    let jsx = [];
    let n = this.context.ds ? this.context.ds.top : null;

    if(! n) return null;

    while(n) {
      jsx.push(<StackItem key={Math.random()} node={n} />);
      n = n.next;
    }

    return jsx;
  }

  render() {
    return (
      <main className="flex-main">
        <section className="ds-info">
          <div className="ds-controls">
            <Console />
            <StackForm />
          </div>
        </section>

        <section className="ds-diagram ds-stack-diagram">
          { this.isEmpty()
            ? <p className="alert-muted">Stack is empty; add some nodes!</p>
            : this.renderStack() }
        </section>
      </main>
    );
  }
}