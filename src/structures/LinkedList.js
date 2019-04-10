class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

export default class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if(this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;

      while(tempNode.next !== null) {
        tempNode = tempNode.next;
      }

      tempNode.next = new _Node(item, null);
    }
  }

  insertBefore(item, key) {
    let newNode = new _Node(item, null);
    let prevNode = this.head;
    let currNode = this.head;

    if(this.head === null) {
      this.insertFirst(newNode);
    }

    while(currNode.next.value !== key) {
      prevNode = currNode;
      currNode = currNode.next;
    }

    if(currNode.next === null) {
      console.log('node not found');
    }

    newNode.next = currNode.next;
    prevNode.next = newNode;
  }

  insertAfter(item, key) {
    let newNode = new _Node(item, null);
    let prevNode = this.head;
    let currNode = this.head;

    if(this.head === null) {
      this.insertFirst(newNode);
    }

    while(currNode.value !== key) {
      prevNode = currNode;
      currNode = currNode.next;
    }

    if(currNode.next === null) {
      console.log('node not found');
    }

    newNode.next = currNode.next;
    currNode.next = newNode;
  }

  insertAt(item, pos) {
    let newNode = new _Node(item, null);
    let prevNode = this.head;
    let currNode = this.head;
    let currNodePos = 0;

    if(this.head === null) {
      this.insertFirst(newNode);
    }

    while(currNodePos !== pos) {
      prevNode = currNode;
      currNode = currNode.next;
      currNodePos++;
    }

    if(currNode.next === null) {
      console.log('node not found');
    }

    newNode.next = currNode;
    prevNode.next = newNode;
  }

  find(item) {
    let currNode = this.head;

    if(! this.head) {
      return null;
    }

    while(currNode.value !== item) {
      if(currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }

    return currNode;
  }

  remove(item) {
    if(! this.head) {
      return null;
    }

    if(this.head.value === item) {
      this.head = this.head.next;
      return;
    }

    let currNode = this.head;
    let previousNode = this.head;

    while((currNode !== null) && (currNode.value !== item)) {
      previousNode = currNode;
      currNode = currNode.next;
    }

    if(currNode === null) {
      console.log(`cannot find item ${item}`);
      return;
    }

    previousNode.next = currNode.next;
  }

  createCycle() {

    let currNode = this.head;

    while(currNode.next !== null){
      currNode = currNode.next;
    }

    currNode.next = this.head;
  }

}

