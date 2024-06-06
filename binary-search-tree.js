class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(this.sortArray(array));
    }

    sortArray(array) {
        let sortedArray = [...array].sort((a, b) => a - b);
        return sortedArray;
    }

    buildTree(array, start = 0, end = array.length - 1) {
        if (start > end) {
            return null;
        }

        let mid = parseInt((start + end) / 2);
        let root = new Node(array[mid]);
        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);
        return root;
    }

    insert(value, root = this.root) {
        if (root === null) {
            let newNode = new Node(value);
            root = newNode;
            return root;
        } 
        
        if (value < root.data) {
            root.left = this.insert(value, root.left);
        } else if (value > root.data) {
            root.right = this.insert(value, root.right);
        }

        return root;
    }

    findNextBigerNumber(rightRoot) {
        if (rightRoot.left === null) {
            return rightRoot;
        }

        let current = rightRoot.left;
        while(current.left !== null) {
            current = current.left;
        }
        return current;
    }

    delete(value, root = this.root) {
        if (root === null) {
            return root;
        }
        if (value < root.data) {
            root.left = this.delete(value, root.left);
        } else if (value > root.data) {
            root.right = this.delete(value, root.right);
        } else { // value === root.data; found it
            // if it's a leaf
            if (root.left === null && root.right === null) {
                return null;
            // if it has one element
            } else if (root.left === null) {
                return root.right; // since this one is not null
            } else if (root.right === null) {
                return root.left;
            } else if (root.left !== null && root.right !== null) {
                let nextNumber = (this.findNextBigerNumber(root.right)).data;
                root.right = this.delete(nextNumber, root.right);
                root.data = nextNumber;
            }
        }
        return root;
    }

    find(value, root = this.root) {
        if (root === null) {
            return null;
        } else if (root.data === value) {
            return root;
        }

        if (value < root.data) {
            return this.find(value, root.left);
        } else if (value > root.data) {
            return this.find(value, root.right);
        }
    }

    levelOrder() {
        let queue = [this.root];
        let values = [];
        while(queue.length !== 0) {
            values.push(queue[0].data);
            if (queue[0].left !== null) {
                queue.push(queue[0].left);
            }
            if (queue[0].right !== null) {
                queue.push(queue[0].right);
            }
            queue.shift();
        }
        return values;
    }

    preorder(root = this.root, array = []) {
        if (root === null) {
            return;
        }
        array.push(root.data);
        this.preorder(root.left, array);
        this.preorder(root.right, array);
        return array;
    }

    inorder(root = this.root, array = []) {
        if (root === null) {
            return;
        }
        this.inorder(root.left, array);
        array.push(root.data);
        this.inorder(root.right, array);
        return array;
    }

    postorder(root = this.root, array = []) {
        if (root === null) {
            return;
        }
        this.postorder(root.left, array);
        this.postorder(root.right, array);
        array.push(root.data);
        return array;
    }

    height(root = this.root) {
        if (root === null) {
            // -1 since in a leaf node the result must be 0 but we're adding + 1 
            // in the return to account for the edge connecting the root node to the subtree; 
            // so Math.max(-1, -1) + 1 = 0
            return -1;
        }
        let left = this.height(root.left);
        let right = this.height(root.right);
        return Math.max(left, right) + 1;
    }

    depth(targetNode) {
        if (targetNode === null) {
            return null;
        }

        let depthh = 0;
        let currentNode = this.root;

        while(currentNode !== null) {
            if (targetNode.data > currentNode.data ) {
                currentNode = currentNode.right;
            } else if (targetNode.data < currentNode.data) {
                currentNode = currentNode.left;
            } else {
                return depthh;
            }
            depthh = depthh + 1;
        }
        return null;
    }

    checkBalance(root = this.root) {
        if (root === null) {
            return -1;
        }
        let left = this.height(root.left);
        let right = this.height(root.right);
        if ((left - right) > 1 || (left - right) < 0) {
            return false;
        }
        return Math.max(left, right) + 1;
    }

    isBalanced() {
        if (this.checkBalance() !== false) {
            return true;
        } else {
            return false;
        }
    }

    rebalance() {
        let sorted = this.sortArray(this.inorder());
        this.root = this.buildTree(sorted);
    }
    
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

let arrayOne = [50, 30, 70, 20, 40, 60, 80, 32, 65, 75, 85, 34, 36];
let tree = new Tree(arrayOne);

console.log('let tree = new Tree(array);');
prettyPrint(tree.root);

console.log('\nconsole.log(tree.levelOrder());');
console.log(tree.levelOrder());
console.log('\nconsole.log(tree.preorder());');
console.log(tree.preorder());
console.log('\nconsole.log(tree.inorder());');
console.log(tree.inorder());
console.log('\nconsole.log(tree.postorder());');
console.log(tree.postorder());
console.log('\nconsole.log(tree.height(tree.root.left));');
console.log(tree.height(tree.root.left));
console.log('\nconsole.log(tree.depth(tree.root.left.left.right));');
console.log(tree.depth(tree.root.left.left.right));

console.log('\nconsole.log(tree.find(70));');
console.log(tree.find(70));

console.log('\ntree.insert(0);');
tree.insert(0);
prettyPrint(tree.root);

console.log('\ntree.delete(70);');
tree.delete(70);
prettyPrint(tree.root);

console.log('\ntree.rebalance();');
tree.rebalance();
prettyPrint(tree.root);

console.log('\nconsole.log(tree.isBalanced());');
console.log(tree.isBalanced());