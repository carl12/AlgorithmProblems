
const Node = (v, n = null) => ({val: v, next: n});

var addTwoNumbers = function(l1, l2, carry = 0) {
    if (!l1 && !l2 && !carry) {return null;}
    l1 = l1 || {val: 0, next: null};
    l2 = l2 || {val: 0, next: null};
    let sum = l1.val + l2.val + carry;
    let curr = sum % 10;
    let after = addTwoNumbers(l1.next, l2.next, Math.floor(sum / 10));
    if (!after) {
        return Node(curr);
    } else {
        return Node(curr, after);
    }
};
