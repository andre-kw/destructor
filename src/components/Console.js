import React, {Component} from 'react';
import AppContext from './AppContext';

class ConsoleLine extends Component {
  static contextType = AppContext;

  highlightNode(nodeId) {
    if(typeof nodeId !== 'undefined') {
      this.context.ds[0].toggleHighlight(nodeId);
      this.context.rerender();
    }
  }

  render() {
    let className = 'line-' + this.props.type;

    return (
      <p 
        className={className} 
        onMouseEnter={this.highlightNode.bind(this, this.props.nodeId)} 
        onMouseLeave={this.highlightNode.bind(this, this.props.nodeId)}>{this.props.children}</p>
    );
  }
}

export default class Console extends Component {
  static contextType = AppContext;

  renderConsole() {
    let jsx = [];

    this.props.console.forEach((line, index) => {
      jsx.push(<ConsoleLine type={line.type} nodeId={line.nodeId} key={index}>{line.text}</ConsoleLine>);
    });

    return jsx;
  }

  scrollConsole() {
    // the timeout is necessary because it will scroll
    // before the element is added.
    setTimeout(() => {
      const el = document.getElementsByClassName('ds-console')[0];
    
      if(el) el.scrollTop = el.scrollHeight + 200;
    }, 100);
  }

  render() {
    this.scrollConsole();

    return (
      <div className="ds-console">
        <pre><code>{this.renderConsole()}</code></pre>
      </div>
    );
  }
}
