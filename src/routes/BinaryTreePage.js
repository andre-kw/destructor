import React, {Component} from 'react';
import Console from '../components/Console';
import BinaryTreeContext from '../contexts/BinaryTreeContext';
import './BinaryTreePage.css';

class BinaryTreeItem extends Component {
  static contextType = BinaryTreeContext;

  render() {
    let className = 'render-bst-item ';
    let text = (this.props.node) ? this.props.node.value : 'null';
  
    if(this.props.node) {
      className += (this.props.node.highlighted) ? 'render-highlighted' : '';
    } else {
      className += 'render-null';
    }
  
    return (
      <div className={className} onClick={() => this.context.logDetails(this.props.node)}>{text}</div>
    );
  }
}

export default class BinaryTreePage extends Component {
  static contextType = BinaryTreeContext;

  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };

    // this.dsInsertLast = this.dsInsertLast.bind(this);
    // this.dsInsertFirst = this.dsInsertFirst.bind(this);
    // this.dsRemove = this.dsRemove.bind(this);
    // this.dsClear = this.dsClear.bind(this);
    // this.highlightNode = this.highlightNode.bind(this);
  }

  componentDidMount() {
    this.context.initBinaryTree();
  }

  setVar(e) {
    if(e.target.name === 'value') {
      this.setState({inputValue: e.target.value});
    }
  }

  // data structure functions
  dsInsertLast(e) {
    e.preventDefault();

    if(this.state.inputValue === '') return;

    this.context.ds[0].insertLast(this.state.inputValue);

    this.context.log(
      `linkedList.insertLast('${this.state.inputValue}')`,
      'input',
      this.state.inputValue);

    this.context.rerender();
    this.setState({inputValue: ''});
    document.getElementById('value').value = '';
  }

  dsIsEmpty() {
    if(this.context.ds[0]) {
      return false;
    }

    return true;
  }

  highlightNode(nodeValue) {
    if(typeof nodeValue !== 'undefined') {
      this.context.ds[0].toggleHighlight(nodeValue);
      this.context.rerender();
    }
  }


  getValues(tree, arr = []) {
    if(tree.left) {
      this.getValues(tree.left, arr);
    }
    arr.push(tree);

    if(tree.right) {
      this.getValues(tree.right, arr);
    }
    
    return arr;
  }

  renderTree(tree) {
    const final = [];
    const values = this.getValues(tree);
    const queue = [values[0]];

    while (queue.length) {
      console.log(final);
      let node = queue.shift();
      final.push(node.value);
      console.log(`${node.value}'s left: ${node.left ? node.left.value : null}`)
      console.log(`${node.value}'s right: ${node.right ? node.right.value : null}`)

      if(node.parent && ! node.parent.right) {
        final.push('break');
      }
      
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    console.log(final);
    return final;
  }

  renderBinaryTree() {
    let jsxLeft = [];
    let n = this.context.ds[0] ? this.context.ds[0] : null;

    if(! n) return null;

    while(n) {
      jsxLeft.push(<BinaryTreeItem key={Math.random()} node={n} />);
      n = n.left;
    } 

    jsxLeft.push(<BinaryTreeItem key='null-item' />);

    return <>
      {}
    </>;
  }

  render() {
    return (
      <main>
        <section className="ds-render">
          <div className="ds-diagram">
            { this.dsIsEmpty()
              ? <p className="alert-muted">Binary tree is empty; add some nodes!</p>
              : this.renderTree(this.context.ds[0]) }
          </div>

          <div className="ds-controls">
            <form onSubmit={(e) => this.dsInsertLast(e)}>
              <input type="text" name="value" id="value" onKeyUp={(e) => this.setVar(e)} autoComplete="off" placeholder=">"></input>
              <div>
                <button type="button" onClick={this.dsInsertLast}>Insert</button>
              </div>
            </form>
            
            <Console hover={this.highlightNode} console={this.context.console} />
          </div>
        </section>
      </main>
    );
  }
}
