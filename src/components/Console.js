import React, {Component} from 'react';
import AppContext from './AppContext';

class ConsoleLine extends Component {
  static contextType = AppContext;

  render() {
    let className = 'line-' + this.props.type;

    return (
      <p 
        className={className} 
        onMouseEnter={this.context.highlightNode.bind(this, this.props.nodeId)} 
        onMouseLeave={this.context.highlightNode.bind(this, this.props.nodeId)}>{this.props.children}</p>
    );
  }
}

export default class Console extends Component {
  static contextType = AppContext;  static contextType = AppContext;

  renderConsole() {
    let jsx = [];

    this.props.console.forEach((line, index) => {
      jsx.push(<ConsoleLine type={line.type} nodeId={line.nodeId} key={index}>{line.text}</ConsoleLine>);
    });

    return jsx;
  }

  render() {
    return (
      <div className="ds-console">
        <pre><code>{this.renderConsole()}</code></pre>
      </div>
    );
  }
}
