import React, {Component} from 'react';
import BinarySearchTree from '../modules/BinarySearchTree';

const BinaryTreeContext = React.createContext({
  console: [],
  ds: [],
  initBinaryTree: () => {},
  // clearLinkedList: () => {},
  // clearConsole: () => {},
  // rerender: () => {},
  // log: () => {},
  // logDetails: () => {},
});

export default BinaryTreeContext;


export class BinaryTreeProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      console: [
        {text:'/* you can hover these console lines. try it! */', type:'comment'},
        {text:'/* create a binary tree */', type:'comment'},
        {text:'let binaryTree = new BinaryTree();', type:'input'},
        // {text:'linkedList.insertLast("test");', type:'input', nodeValue:'test'},
        // {text:'linkedList.insertLast("another test");', type:'input', nodeValue:'another test'},
        {text:'[BinaryTree]', type:'output'},
      ],
      ds: [],
    }

    this.initBinaryTree = this.initBinaryTree.bind(this);
    // this.clearLinkedList = this.clearLinkedList.bind(this);
    // this.clearConsole = this.clearConsole.bind(this);
    // this.rerender = this.rerender.bind(this);
    // this.log = this.log.bind(this);
    // this.logDetails = this.logDetails.bind(this);
  }

  initBinaryTree() {
    const dsBST1 = new BinarySearchTree();
    //dsBST1.insertLast('test');
    this.setState({ds: [dsBST1, ...this.state.ds]});
  }

  // clearLinkedList() {
  //   const newBST = new BinarySearchTree();

  //   this.setState({ds: [newBST]});
  // }

  clearConsole() {
    this.setState({
      console: [
        {text:'// console cleared', type:'comment'},
      ]
    })
  }

  // this is necessary to redraw a diagram after changing
  // a data structure
  rerender() {
    this.setState({ds: this.state.ds});
  }

  log(text, type = 'input', nodeValue) {
    this.state.console.push({text, type, nodeValue});
  }

  // logDetails(node) {
  //   if(! node) {
  //     this.state.console.push({text:`node: null`, type:'output-italic'});
  //     this.rerender();
  //     return;
  //   }
  //   const nextNode = node.next ? node.next.value : 'null';

  //   this.state.console.push({text:`node: {`, type:'output-italic'});
  //   this.state.console.push({text:`   value: "${node.value}"`, type:'output-italic'});
  //   this.state.console.push({text:`   next: "${nextNode}"`, type:'output-italic'});
  //   this.state.console.push({text:`}`, type:'output-italic'});
  //   this.rerender();
  // }

  render() {
    const value = {
      ds: this.state.ds,
      console: this.state.console,
      initBinaryTree: this.initBinaryTree,
      // clearLinkedList: this.clearLinkedList,
      // clearConsole: this.clearConsole,
      // rerender: this.rerender,
      // log: this.log,
      // logDetails: this.logDetails,
    };

    return (
      <BinaryTreeContext.Provider value={value}>
        {this.props.children}
      </BinaryTreeContext.Provider>
    );
  }
}

