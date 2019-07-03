import React, { Component } from 'react';
import AppContext from '../contexts/AppContext';

export default class LinkedListForm extends Component {
  static contextType = AppContext;

  insertLast = (e) => {
    e.preventDefault();
    this.context.setInput(e, () => {
      if(! this.context.validateInput('ds-btn-insertlast')) return;

      this.context.ds.insertLast(this.context.input);
  
      this.context.log(
        `linkedList.insertLast('${this.context.input}')`,
        'input',
        this.context.input);
  
      this.context.rerenderDiagram();
      this.context.setInput('');
    });
    
  }

  insertFirst = () => {
    if(! this.context.validateInput('ds-btn-insertfirst')) return;

    this.context.ds.insertFirst(this.context.input);

    this.context.log(
      `linkedList.insertFirst('${this.context.input}')`, 
      'input',
      this.context.input);

    this.context.rerenderDiagram();
    this.context.setInput('');
  }

  remove = () => {
    if(! this.context.validateInput('ds-btn-remove')) return;

    let node = this.context.ds.remove(this.context.input);

    if(! node) {
      this.context.log('node not found', 'error');
      this.context.setInput('');
      return;
    }

    this.context.log(`linkedList.remove('${this.context.input}')`);
    this.context.log(`removed node "${this.context.input}"`, 'output');

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
      <form onSubmit={(e) => this.insertLast(e)}>
        <input type="text" name="value" id="value" onFocus={this.scroll} onBlur={(e) => this.context.setInput(e)} autoComplete="off" maxLength="20" placeholder="> type text here"></input>
        <div>
          <button type="button" className="btn btn-function" id="ds-btn-insertlast" onClick={this.insertLast}>Insert last</button>
          <button type="button" className="btn btn-function" id="ds-btn-insertfirst" onClick={this.insertFirst}>Insert first</button>
          <button type="button" className="btn btn-function" id="ds-btn-remove" onClick={this.remove}>Remove item</button>
          <button type="button" className="btn btn-function" id="ds-btn-clear" onClick={this.clear}>Clear</button>
        </div>
      </form>
    );
  }
}