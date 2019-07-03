import React, {Component} from 'react';
import AppContext from '../contexts/AppContext';

class ConsoleLine extends Component {
  static contextType = AppContext;

  render() {
    let className = 'line-' + this.props.type;

    return (
      <p 
        className={className} 
        onMouseEnter={() => this.context.highlightNode(this.props.nodeValue)} 
        onMouseLeave={() => this.context.highlightNode(this.props.nodeValue)}>{this.props.children}</p>
    );
  }
}


export default class Console extends Component {
  static contextType = AppContext;

  scrollConsole = () => {
    // stop div from scrolling before element is added
    setTimeout(() => {
      const el = document.getElementsByClassName('ds-console')[0];
    
      if(el) el.scrollTop = el.scrollHeight + 200;
    }, 100);
  }

  renderConsole = () => {
    let jsx = [];

    this.context.console.forEach((line, index) => {
      jsx.push(<ConsoleLine type={line.type} nodeValue={line.nodeValue} key={index}>{line.text}</ConsoleLine>);
    });

    return jsx;
  }

  render() {
    this.scrollConsole();

    return (
      <div className="ds-console">
        <code>{this.renderConsole()}</code>
      </div>
    );
  }
}
