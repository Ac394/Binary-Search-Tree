class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    if (!arr.length) {
      return null;
    }

    let mid = Math.floor(arr.length / 2);
    let node = new Node(arr[mid]);
    node.left = this.buildTree(arr.slice(0, mid));
    node.right = this.buildTree(arr.slice(mid + 1));
    return node;
  }

  insert(val, node = this.root) {
    if (!node) {
      return new Node(val);
    }

    if (val < node.data) {
      node.left = this.insert(val, node.left);
    } else if (val > node.data) {
      node.right = this.insert(val, node.right);
    }
    return node;
  }

  deleteItem(val, node = this.root) {
    if (!node) {
      return node;
    }

    if (val < node.data) {
      node.left = this.deleteItem(val, node.left);
      return node;
    } else if (val > node.data) {
      node.right = this.deleteItem(val, node.right);
      return node;
    }

    if (node.right !== null && node.left !== null) {
      let parent;
      let next = node.right;
      while (next.left !== null) {
        parent = next;
        next = next.left;
      }
      node.data = next.data;
      parent ? (parent.left = null) : (node.right = null);
    } else if (node.right !== null) {
      node.data = node.right.data;
      node.right = null;
    } else if (node.left !== null) {
      node.data = node.left.data;
      node.left = null;
    } else {
      node = null;
    }
    return node;
  }

  find(val, node = this.root) {
    if (node === null) {
      console.log("Not found");
      return;
    } else if (val === node.data) {
      return node;
    }

    if (val < node.data) {
      return this.find(val, node.left);
    } else if (val > node.data) {
      return this.find(val, node.right);
    }
  }

  levelOrder(callback, node = this.root) {
    if (node === null) {
      return;
    }

    let arr = [];
    let queue = [];
    queue.push(node);

    while (queue.length) {
      const curr = queue[0];
      callback ? callback(curr) : arr.push(curr.data);
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
      queue.shift();
    }
    return arr;
  }

  inOrder(callback) {
    let arr = [];

    function recursive(node) {
      if (node) {
        recursive(node.left);
        callback ? callback(node.data) : arr.push(node.data);
        recursive(node.right);
      }
    }
    recursive(this.root);
    return arr;
  }

  preOrder(callback) {
    let arr = [];

    function recursive(node) {
      if (node) {
        callback ? callback(node.data) : arr.push(node.data);
        recursive(node.left);
        recursive(node.right);
      }
    }
    recursive(this.root);
    return arr;
  }

  postOrder(callback) {
    let arr = [];

    function recursive(node) {
      if (node) {
        recursive(node.left);
        recursive(node.right);
        callback ? callback(node.data) : arr.push(node.data);
      }
    }
    recursive(this.root);
    return arr;
  }

  height(node = this.root) {
    if (!node) {
      return 0;
    }

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node = this.root) {
    const val = node.data;
    let count = 0;

    function recursive(node) {
      if (node === null) {
        return console.log("Not found");
      } else if (val === node.data) {
        return node;
      }

      count++;

      if (val < node.data) {
        return recursive(node.left);
      } else if (val > node.data) {
        return recursive(node.right);
      }
    }
    recursive(this.root);
    console.log("Count is", count);
    return count;
  }

  isBalanced(node = this.root) {
    if (!node) {
      return true;
    }

    const leftBalanced = this.isBalanced(node.left);
    const rightBalanced = this.isBalanced(node.right);

    const leftHeight = node.left ? this.height(node.left) : 0;
    const rightHeight = node.right ? this.height(node.right) : 0;

    const heightDiff = Math.abs(leftHeight - rightHeight) > 1 ? false : true;

    if (leftBalanced && rightBalanced && heightDiff) {
      return true;
    } else {
      return false;
    }
  }

  rebalance() {
    const arr = this.inOrder();

    this.root = this.buildTree(arr);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
