import React, { Component } from 'react';
import AppContext from '../contexts/AppContext';

export default class Form extends Component {
  static contextType = AppContext;

  getClassname = (str) => {
    return str.split(' ').join('-').toLowerCase();
  }

  renderBtns = () => {
    return Object.entries(this.props.functions).map(arr => {
      return <button type="button" className="btn btn-function" id={`ds-btn-${this.getClassname(arr[0])}`} onClick={arr[1]}>{arr[0]}</button>
    });
  }

  render() {
    return (
      <form onSubmit={this.props.submit}>
        <input type="text" name="value" id="value" onBlur={(e) => this.context.setInput(e)} autoComplete="off" maxLength="20" placeholder="> type text here"></input>
        
        <div>{this.renderBtns()}</div>
      </form>
    );
  }
}