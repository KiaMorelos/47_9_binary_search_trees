// this is hella confusing. needed solution help again.
//SEE NOTES on the slightly edited solution
// honestly recursion makes more sense for the inserts somehow.

class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    // if there's isn't a root on the tree already the root is now the newly created node, return it
    const node = new Node(val);
    if (!this.root) {
      this.root = node;
      return this;
    }

    let currentNode = this.root; // if we got here it means root already exists and we need to find a spot for our new node. start looking throug the tree at the root, the while loop will stop looking when there's no longer a current node.

    while (currentNode) {
      if (val < currentNode.val) {
        // if value less than the current node value
        //check if the left side of the tree has empty slot
        // if it does, the assign the node to the left return the tree
        if (currentNode.left === null) {
          currentNode.left = new Node(val);
          return this;
        } else {
          //otherwise if the slot is already filled, let's checked the node in the left slot for place to put a child
          currentNode = currentNode.left;
        }
      } else if (val > currentNode.val) {
        // if the value is greater than the current node value then we should check the right side for an empty space.
        // if the slot is empty put the node there, return the tree.
        if (currentNode.right === null) {
          currentNode.right = new Node(val);
          return this;
        } else {
          // otherwise if the right side is already filled, let's check the node in that slot for a place to put the child
          currentNode = currentNode.right;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, currentNode = this.root) {
    // if there's isn't a root on the tree already the root is now the newly created node, return it
    const node = new Node(val);
    if (!this.root) {
      this.root = node;
      return this;
    }

    // if value is less than the current node value
    //check if the left side of the tree has empty slot
    // if it does, the assign the node to the left return the tree
    if (val < currentNode.val) {
      if (currentNode.left === null) {
        currentNode.left = new Node(val);
        return this;
      }
      // if there wasn't empty slot lets run our function again set the current node to be the one to the left of the 'root' we just checked instead of the default
      return this.insertRecursively(val, currentNode.left);
    } else {
      // if value is NOT less than the current node value
      //check if the RIGHT side of the tree has empty slot
      // if it does, the assign the node to the RIGHT return the tree
      if (currentNode.right === null) {
        currentNode.right = new Node(val);
        return this;
      }
      // if there wasn't empty slot lets run our function again set the current node to be the one to the RIGHT of the 'root' we just checked instead of the default
      return this.insertRecursively(val, currentNode.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (!this.root) return undefined; // check if there's even a root to look find things with othewise clear the droids you are looking for are not here.

    let currentNode = this.root; // START LOOKING AT THE ROOT
    let found = false; // FOUND obviously starts at false

    if (val === currentNode.val) return currentNode; // if we find it right away RETURN IT

    //otherise while there is a current node AND we haven't found what we're looking for lets do the following:
    while (currentNode && !found) {
      if (val < currentNode.val) {
        // if value less then the current nodes value we should check the left side next, update the current node the left side's node
        currentNode = currentNode.left;
      } else if (val > currentNode.val) {
        //otherise if the value is greater than the current nodes value we should check the right side next. update the the current to the right side node
        currentNode = currentNode.right;
      } else {
        // if we made it here that means the values are equal
        //set FOUND to true
        found = true;
      }
    }

    if (!found) return undefined; // if not found we're supposed to return undefined here
    return currentNode; // found being true mean we return the node we found
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, currentNode = this.root) {
    if (!this.root) return undefined; // check if there's even a root to look find things with othewise clearly the droids you are looking for are not here.

    if (val < currentNode.val) {
      // if the value less is less then the node we're looking at right now, run the function with with its left side node, if there's nothing to the left return undefined
      if (currentNode.left === null) return undefined;
      return this.findRecursively(val, currentNode.left);
    } else if (val > currentNode.val) {
      // if the value is greater then the node we're looking at right now, run the function with with its RIGHT side node, if there's nothing to the RIGHT return undefined
      if (currentNode.right === null) return undefined;
      return this.findRecursively(val, currentNode.right);
    }
    return currentNode; // return the node we found!
    // frankly how this one doesn't short circuit is weird to me. i'm going to ask my mentor how the hell this works.
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  // NOTES!!! we're referring to lecture notes here to solve the DFS problems

  dfsPreOrder() {
    let visited = [];
    let current = this.root;

    function traverse(node) {
      visited.push(node.val); // visit
      if (node.left) traverse(node.left); // if left node exists keep going left
      if (node.right) traverse(node.right); // if right node exists keep going left
    }

    traverse(current);
    return visited;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let visited = [];
    let current = this.root;

    function traverse(node) {
      if (node.left) traverse(node.left); // if left node exists keep going left
      visited.push(node.val); // visit
      if (node.right) traverse(node.right); // if right node exists keep going left
    }

    traverse(current);
    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let visited = [];
    let current = this.root;

    function traverse(node) {
      if (node.left) traverse(node.left); // if left node exists keep going left
      if (node.right) traverse(node.right); // if right node exists keep going left
      visited.push(node.val); // visit
    }

    traverse(current);
    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */
  // solution again because i can't find lecture notes or the video for this and i'm tired of being stuck in this unit.

  bfs() {
    let node = this.root;
    let queue = [];
    let visited = [];

    queue.push(node);

    while (queue.length) {
      // while queue has items in it
      node = queue.shift(); // we're using a queue so the first item inline gets shifted off first
      visited.push(node.val); // push item into visited
      if (node.left) {
        // if the node we just visited has a left side, push that inline to be next
        queue.push(node.left);
      }
      if (node.right) {
        // if the node we just visited has a right side, push that inline to be next
        queue.push(node.right);
      }
    }

    return visited; // return the visited array
  }
}

module.exports = BinarySearchTree;
