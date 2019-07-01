/**
 * // Definition for a Node.
 * function Node(val,neighbors) {
 *    this.val = val;
 *    this.neighbors = neighbors;
 * };
 */
/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
  const nodes = {};
  let baseNode = initNode(node);
  
  return baseNode;
  function initNode(node) {
      if (nodes[node.val]) {
          return nodes[node.val];
      }
      let neighbors = [];
      nodes[node.val] = {
          val: node.val,
          neighbors
      }
      node.neighbors.forEach(n => neighbors.push(initNode(n)))
      return nodes[node.val];
  }
};

var cloneGraph2 = function(node) {
  const nodes = {};
  let baseNode = initNode(node);
  
  return baseNode;
  function initNode(node) {
      if (nodes[node.val]) {
          return nodes[node.val];
      }
      nodes[node.val] = {}
      nodes[node.val].val = node.val;
      nodes[node.val].neighbors = node.neighbors.map(initNode);
      return nodes[node.val];
  }
};