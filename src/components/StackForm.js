import React, { Component } from 'react';
import AppContext from '../contexts/AppContext';

export default class StackForm extends Component {
  static contextType = AppContext;

  push = (e) => {
    e.preventDefault();
    if(! this.context.validateInput('ds-btn-push')) return;

    this.context.ds.push(this.context.input);

    this.context.log(
      `stack.push('${this.context.input}')`,
      'input',
      this.context.input);

    this.context.rerenderDiagram();
    this.context.setInput('');
  }

  pop = () => {
    if(this.context.ds.top === null) {
      this.context.highlightButton('ds-btn-pop', false);
      return;
    };

    this.context.ds.pop();
    this.context.log(`stack.pop()`, 'input');

    this.context.rerenderDiagram();
    this.context.setInput('');
  }

  clear = () => {
    this.context.highlightButton('ds-btn-clear');
    this.context.clearDs();
  }

  scroll = () => {
    if(document.body.scrollWidth <= 768) {
      window.scrollTo(0, 260);
    }
  }

  render() {
    return (
      <form onSubmit={(e) => this.push(e)}>
        <input type="text" name="value" id="value" onFocus={this.scroll} onKeyUp={(e) => this.context.setInput(e)} autoComplete="off" maxLength="20" placeholder="> type text here"></input>
        <div>
          <button type="button" className="btn btn-function" id="ds-btn-push" onClick={this.push}>Push</button>
          <button type="button" className="btn btn-function" id="ds-btn-pop"  onClick={this.pop}>Pop</button>
          <button type="button" className="btn btn-function" id="ds-btn-clear"  onClick={this.clear}>Clear</button>
        </div>
      </form>
    );
  }
}