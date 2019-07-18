
function fromBSTToLL(root){
  if (!root) { return null; }
  return makeLinkedListFromBST(root)[0];

  function makeLinkedListFromBST(root) {
    let head = root;
    let tail = root;
    if (root.node1) {
      let [leftHead, leftTail] = makeLinkedListFromBST(root.node1);
      root.node1 = leftTail;
      leftTail.node2 = root;
      head = leftHead;
    }
    if (root.node2) {
      let [rightHead, rightTail] = makeLinkedListFromBST(root.node2);
      root.node2 = rightHead;
      rightHead.node1 = root;
      tail = rightTail;
    }

    return [head, tail];
  }

}

class BiNode {
  constructor(val) {
    this.int = val;
    this.node1 = null;
    this.node2 = null;
  }
  addToTree(val) {
    if (val === this.int) { return; }
    if (val < this.int) {
      if (this.node1 === null) {
        this.node1 = new BiNode(val);
      } else {
        this.node1.addToTree(val);
      }
    } else {
      if (this.node2 === null) {
        this.node2 = new BiNode(val);
      } else {
        this.node2.addToTree(val);
      }
    }
  }
}

// let a = new BiNode(10);
// a.addToTree(5);
// a.addToTree(3);
// a.addToTree(6);
// a.addToTree(5.5);
// a.addToTree(30);
// a.addToTree(25);
// a.addToTree(33);
// a.addToTree(40);
// a.addToTree(36);
// a.addToTree(50);

// a = fromBSTToLL(a);
// while (a) {
//   console.log(a.node1 ? a.node1.int : null);
//   console.log(a.int);
//   console.log('-----------');
//   a = a.node2;
// }
