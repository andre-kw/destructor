import React, {Component} from 'react';

class ConsoleLine extends Component {
  render() {
    let className = 'line-' + this.props.type;

    return (
      <p 
        className={className} 
        onMouseEnter={() => this.props.hover(this.props.nodeValue)} 
        onMouseLeave={() => this.props.hover(this.props.nodeValue)}>{this.props.children}</p>
    );
  }
}

export default class Console extends Component {
  static defaultProps = {
    hover: () => {},
  }

  scrollConsole = () => {
    // stop div from scrolling before element is added
    setTimeout(() => {
      const el = document.getElementsByClassName('ds-console')[0];
    
      if(el) el.scrollTop = el.scrollHeight + 200;
    }, 100);
  }

  renderConsole = () => {
    let jsx = [];

    this.props.console.forEach((line, index) => {
      jsx.push(<ConsoleLine type={line.type} nodeValue={line.nodeValue} hover={this.props.hover} key={index}>{line.text}</ConsoleLine>);
    });

    return jsx;
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
