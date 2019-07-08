const firstLine = {text:'// try hovering the console lines!', type:'comment'}

export const consoleDefaults = {
  'singly-linked-list': [
    firstLine,
    {text:'let LinkedList = new LinkedList();', type:'input'},
    {text:'[LinkedList]', type:'output'},
    {text:'LinkedList.insertLast("how");', type:'input', nodeValue:'how'},
    {text:'LinkedList.insertLast("are");', type:'input', nodeValue:'are'},
    {text:'LinkedList.insertLast("you?");', type:'input', nodeValue:'you?'},
  ],
  'stack': [
    firstLine,
    {text:'let stack = new Stack();', type:'input'},
    {text:'[Stack]', type:'output'},
    {text:'stack.push("first in");', type:'input', nodeValue:'first in'},
    {text:'stack.push("last out");', type:'input', nodeValue:'last out'},
  ],
};