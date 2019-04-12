class _LinkedListNode {
  constructor(value, next, id = 0) {
    this.id = id;
    this.value = value;
    this.next = next;
    this.highlighted = false;
  }
}

export default class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  insertFirst(item) {
    let counter = 0;

    if(this.head) {
      let currNode = this.head;

      while(currNode.next !== null) {
        counter++;
        currNode = currNode.next;
      }
    }
    
    this.head = new _LinkedListNode(item, this.head, counter);
  }

  insertLast(item) {
    let counter = 1;

    if(! this.head) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;

      while(tempNode.next) {
        tempNode = tempNode.next;
        counter++;
      }

      tempNode.next = new _LinkedListNode(item, null, counter);
    }

    return counter;
  }

  insertBefore(item, key) {
    let newNode = new _LinkedListNode(item, null);
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
    let newNode = new _LinkedListNode(item, null);
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
    let newNode = new _LinkedListNode(item, null);
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

  toggleHighlight(nodeId) {
    let currNode = this.head;

    while(currNode !== null) {
      if(currNode.id === nodeId) {
        currNode.highlighted = ! currNode.highlighted;
        return;
      }
      currNode = currNode.next;
    }
  }
}

