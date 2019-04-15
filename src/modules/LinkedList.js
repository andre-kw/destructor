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
    if(this.head) {
      let currNode = this.head;

      while(currNode.next !== null) {
        currNode = currNode.next;
      }
    }
    
    this.head = new _LinkedListNode(item, this.head);
  }

  // TODO: when theres only one node, adding puts the wrong id
  insertLast(item) {
    if(! this.head) {
      this.insertFirst(item);
    } else {
      let currNode = this.head;

      while(currNode.next) {
        currNode = currNode.next;
      }

      currNode.next = new _LinkedListNode(item, null);
    }
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
      return;
    }

    if(this.head.value === item) {
      this.head = this.head.next;
      return true;
    }

    let currNode = this.head;
    let previousNode = this.head;

    while((currNode !== null) && (currNode.value !== item)) {
      previousNode = currNode;
      currNode = currNode.next;
    }

    if(currNode === null) {
      return;
    }

    previousNode.next = currNode.next;
    return true;
  }

  createCycle() {
    let currNode = this.head;

    while(currNode.next !== null){
      currNode = currNode.next;
    }

    currNode.next = this.head;
  }

  toggleHighlight(nodeValue) {
    let currNode = this.head;

    while(currNode !== null) {
      if(currNode.value === nodeValue) {
        currNode.highlighted = ! currNode.highlighted;
        return;
      }
      currNode = currNode.next;
    }
  }
}

