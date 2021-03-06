import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';
import Form from '../Form';

export default class StackForm extends Component {
  static contextType = AppContext;

  push = (e) => {
    this.context.setInput(e, () => {
      Form.focusInput();
      if(! this.context.validateInput('ds-btn-push')) return;

      this.context.primeAnimation(0);
      this.context.ds.push(this.context.input);
  
      this.context.log(
        `stack.push('${this.context.input}')`,
        'input',
        this.context.input);
  
      this.context.rerenderDiagram();
      this.context.setInput('');
    });
  }

  pop = () => {
    Form.focusInput();
    if(this.context.ds.top === null) {
      this.context.highlightButton('ds-btn-pop', false);
      return;
    };

    this.context.primeAnimation(0);
    this.context.ds.pop();
    this.context.log(`stack.pop()`, 'input');

    this.context.rerenderDiagram();
    this.context.setInput('');
  }

  clear = () => {
    Form.focusInput();
    this.context.highlightButton('ds-btn-clear');
    this.context.clearDs();
  }

  submit = this.push

  functions = {
    'Push': this.push,
    'Pop': this.pop,
    'Clear': this.clear
  }

  render() {
    return <Form functions={this.functions} submit={this.submit} />;
  }
}