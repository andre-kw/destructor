import React, { Component } from 'react';
import AppContext from '../contexts/AppContext';

export default class Form extends Component {
  static contextType = AppContext;

  static focusInput = () => {
    document.getElementById('value').focus();
  }

  getClassname = (str) => {
    return 'ds-btn-' + str.split(' ').join('-').toLowerCase();
  }

  renderBtns = () => {
    return Object.entries(this.props.functions).map(arr => {
      const classname = this.getClassname(arr[0])
      return <button type="button" className="btn btn-function" id={classname} key={classname} onClick={arr[1]}>{arr[0]}</button>
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.submit(e);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" name="value" id="value" ref="value" onBlur={(e) => this.context.setInput(e)} autoComplete="off" maxLength="20" placeholder="> type text here"></input>

        <div>{this.renderBtns()}</div>
      </form>
    );
  }
}