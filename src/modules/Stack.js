class _StackNode {
  constructor(value, next) {
    this.value = value;
    this.next = next;
    this.highlighted = false;
  }
}

export default class Stack {
  constructor() {
    this.top = null;
  }

  push = (value) => {
    const node = new _StackNode(value, this.top)
    this.top = node;

    return this.top;
  }

  pop = () => {
    const node = this.top;
    this.top = node.next;
    return node.value;
  }

  toggleHighlight(nodeValue) {
    let currNode = this.top;

    while(currNode !== null) {
      if(currNode.value === nodeValue) {
        currNode.highlighted = ! currNode.highlighted;
        return;
      }
      currNode = currNode.next;
    }
  }
}