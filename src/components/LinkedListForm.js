import React, { Component } from 'react';
import AppContext from '../contexts/AppContext';

export default class LinkedListForm extends Component {
  static contextType = AppContext;

  insertLast = (e) => {
    e.preventDefault();

    if(this.context.input === '') return;

    this.context.highlightButton('ds-btn-insertlast');
    this.context.ds.insertLast(this.context.input);

    this.context.log(
      `linkedList.insertLast('${this.context.input}')`,
      'input',
      this.context.input);

    this.context.rerenderDiagram();
    this.context.setInput('');
    document.getElementById('value').value = '';
  }

  insertFirst = () => {
    if(this.context.input === '') return;

    this.context.highlightButton('ds-btn-insertfirst');
    this.context.ds.insertFirst(this.context.input);

    this.context.log(
      `linkedList.insertFirst('${this.context.input}')`, 
      'input',
      this.context.input);

    this.context.rerenderDiagram();
    this.context.setInput('');
    document.getElementById('value').value = '';
  }

  remove = () => {
    if(this.context.input === '') return;

    this.context.highlightButton('ds-btn-remove');
    let node = this.context.ds.remove(this.context.input);

    if(! node) {
      this.context.log('node not found', 'error');
      return;
    }

    this.context.log(`linkedList.remove('${this.context.input}')`);
    this.context.log(`removed node "${this.context.input}"`, 'output');

    this.context.rerenderDiagram();
    this.context.setInput('');
    document.getElementById('value').value = '';
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
        <input type="text" name="value" id="value" onFocus={this.scroll} onKeyUp={(e) => this.context.setInput(e)} autoComplete="off" maxLength="20" placeholder="> type text here"></input>
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