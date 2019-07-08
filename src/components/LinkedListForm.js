import React, { Component } from 'react';
import AppContext from '../contexts/AppContext';
import Form from './Form';

export default class LinkedListForm extends Component {
  static contextType = AppContext;

  insertLast = (e) => {
    e.preventDefault();
    this.context.setInput(e, () => {
      if(! this.context.validateInput('ds-btn-insert-last')) return;

      this.context.primeAnimation(-2);
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
    if(! this.context.validateInput('ds-btn-insert-first')) return;

    this.context.primeAnimation(0);
    this.context.ds.insertFirst(this.context.input);

    this.context.log(
      `linkedList.insertFirst('${this.context.input}')`, 
      'input',
      this.context.input);

    this.context.rerenderDiagram();
    this.context.setInput('');
  }

  remove = () => {
    if(! this.context.validateInput('ds-btn-remove-item')) return;

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

  submit = this.insertLast

  functions = {
    'Insert last': this.insertLast,
    'Insert first': this.insertFirst,
    'Remove item': this.remove,
    'Clear': this.clear
  }

  render() {
    return <Form type="linked-list" functions={this.functions} submit={this.submit} />;
  }
}