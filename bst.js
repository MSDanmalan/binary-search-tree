class Node
{
  constructor(data)
  {
      this.data = data;
      this.left = null;
      this.right = null;
  }
}

class Tree 
{
  constructor(array = []) 
  {
      this.array = this.removeDuplicates(this.mergeSort(array));
      this.start = 0;
      this.end = this.array.length - 1;
      this.root = this.buildTree(this.array, this.start, this.end);
  }

  mergeSort (array) {
      let leftHalf = [];
      let rightHalf = [];
      let sortedArray = [];

      if (array.length === 0) {
          return array;
      } else if (array.length === 1) {
          sortedArray.push(array[0]);
          return sortedArray;
      }

      leftHalf = array.slice(0, array.length/2);
      rightHalf = array.slice(array.length/2);

      leftHalf = this.mergeSort(leftHalf);
      rightHalf = this.mergeSort(rightHalf);

      while (leftHalf.length !== 0 || rightHalf !== 0) {
          if (leftHalf[0] <= rightHalf[0] ) {
              sortedArray.push(leftHalf[0]);
              leftHalf.shift();
          } else if (rightHalf[0] <= leftHalf[0]) {
              sortedArray.push(rightHalf[0]);
              rightHalf.shift();
          } else if (rightHalf.length === 0 && leftHalf.length !== 0) {
              sortedArray.push(leftHalf[0]);
              leftHalf.shift();
          } else if (leftHalf.length === 0 && rightHalf.length !== 0) {
              sortedArray.push(rightHalf[0]);
              rightHalf.shift();
          } else{
              return sortedArray;
          }
      }
  }

  removeDuplicates(sortedArray) {
      if (sortedArray.length <= 1) {
          return sortedArray;
      }

      const uniqueArray = sortedArray.reduce((accumulator, currentElement, currentIndex) => {
          if (currentIndex === 0 || currentElement !== sortedArray[currentIndex - 1]) {
              accumulator.push(currentElement);
          }
          return accumulator;
      }, []);

      return uniqueArray;
  }

  buildTree(array, start, end) 
  {
      if (start > end)
      {
          return null;
      }

      const mid = Math.floor((start + end) / 2);
      const node = new Node(array[mid]);
      node.left = this.buildTree(array, start, mid - 1);
      node.right = this.buildTree(array, mid + 1, end);
      return node;
  }

  insert(value, root = this.root) {
      if(root === null) {
          root = new Node(value);
          return root;
      }

      if (value < root.data) {
          root.left = this.insert(value, root.left); 
      } else if(value > root.data) {
          root.right = this.insert(value, root.right);
      }

      return root;
  }

  delete(value, root = this.root) {
      let previousNode;
      let nextNode;
      if(root === null) {
          return root;
      }

      if(root.data > value) {
          root.left = this.delete(value, root.left);
          previousNode = root.left;
          return root;
      } else if(root.data < value) {
          root.right = this.delete(value, root.right);
          previousNode = root.right;
          return root;
      }

      if (root.left === null) {
          previousNode = root.right;
          return previousNode;
      } else if(root.right === null) {
          previousNode = root.left;
          return previousNode;
      } else {
          let successor = root;
          let successorChild = root.right;

            while(successorChild.left !== null) {
              successor = successorChild;
              successorChild = successorChild.left;
          }

          if (successor !== root) {
              successor.left = successorChild.right
          } else {
              successor = successorChild.right
          }       

          root.data = successorChild.data;
          root.right = successor;
          return root;
      }
  }

  find(value, root = this.root) {
      if(root === null) {
          return root;
      } else if(root.data === value) {
          return root;
      }

      if(root.data < value) {
          root = this.find(value, root.right);
          return root;
      } else if(root.data > value) {
          root = this.find(value, root.left);
          return root;
      } 
  }

  levelOrder(root = this.root) {
      let arrayOrder = [];
      let queue = [];

      queue.push(root);
      while(queue[0]) {
          arrayOrder.push(queue[0].data);

          if(queue[0].left !== null && queue[0].right !== null) {
              queue.push(queue[0].left);
              queue.push(queue[0].right);
          } else if(queue[0].left !== null && queue[0].right === null) {
              queue.push(queue[0].left);
          } else if(queue[0].right !== null && queue[0].left === null) {
              queue.push(queue[0].right);
          }

          queue.shift();
      }

      return arrayOrder;
  }

  levelOrderRec(root = this.root, arrayOrder = [], queue = [root]) {
      while(queue[0]) {
          if(queue[0].left !== null && queue[0].right !== null) {
              queue.push(queue[0].left);
              queue.push(queue[0].right);
          } else if(queue[0].left !== null && queue[0].right === null) {
              queue.push(queue[0].left);
          } else if(queue[0].right !== null && queue[0].left === null) {
              queue.push(queue[0].right);
          }

          arrayOrder.push(queue[0].data);
          queue.shift(); 
          this.levelOrderRec(queue[0], arrayOrder, queue)
          
      }

      return arrayOrder;
  } 

  
  inOrder(root = this.root, arrayOrder = []) {  
      if(root === null) {
          return arrayOrder;
      }

      this.inOrder(root.left, arrayOrder);
      arrayOrder.push(root.data);
      this.inOrder(root.right, arrayOrder);

      return arrayOrder;
  }

  preOrder(root = this.root, arrayOrder = []) {
      if(root === null) {
          return arrayOrder;
      }

      arrayOrder.push(root.data);
      this.preOrder(root.left, arrayOrder);
      this.preOrder(root.right, arrayOrder);

      return arrayOrder
  }

  postOrder(root = this.root, arrayOrder = []) {
      if(root === null) {
          return arrayOrder;
      }

      this.postOrder(root.left, arrayOrder);
      this.postOrder(root.right, arrayOrder);
      arrayOrder.push(root.data);

      return arrayOrder
  }

  height(node = this.root) {
      return this.calculateHeight(node)
  }

  calculateHeight(node, leftHeight, rightHeight) {
      if (node === null) {
          return -1;
      }                  

      leftHeight = this.height(node.left);
      rightHeight = this.height(node.right)

      return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node = this.root) {
      return this.calculateDepth(this.root, node);
  }

  calculateDepth(currentNode, targetNode, currentDepth = 0) {
      if (currentNode === null) {
          return -1;
      }

      if (currentNode === targetNode) {
          return currentDepth;
      }

      const leftDepth = this.calculateDepth(currentNode.left, targetNode, currentDepth + 1);
      const rightDepth = this.calculateDepth(currentNode.right, targetNode, currentDepth + 1);

      return Math.max(leftDepth, rightDepth);
  }

  isbalanced(node = this.root, leftHeight, rightHeight) {
      if (node === null) {
          return -1;
      }                  

      leftHeight = this.height(node.left);
      rightHeight = this.height(node.right)

      let heightDifference = ((leftHeight + 1) - (rightHeight + 1))

      if(heightDifference === 1 || heightDifference === 0 || heightDifference === -1) {
          return true;
      } else {
          return false;
      }
  }

  rebalance() {
      const unbalancedArray = this.inOrder();
      this.array = this.removeDuplicates(this.mergeSort(unbalancedArray));
      this.start = 0;
      this.end = unbalancedArray.length - 1;
      this.root = this.buildTree(unbalancedArray, this.start, this.end);
      return this.root;
  }
}



const prettyPrint = (node, prefix = "", isLeft = true) => {
if (node === null) {
    return;
}
if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
}
console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
}
};

// Driver script
const myArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 39, 18, 20, 99];
const myTree = new Tree(myArray);

prettyPrint(myTree.root)
console.log(myTree.isbalanced());
console.log(myTree.inOrder());
console.log(myTree.preOrder());
console.log(myTree.postOrder());
// Unbalance the tree by adding several numbers > 100.
myTree.insert(101);
myTree.insert(102);
myTree.insert(103);
myTree.insert(104);
console.log(myTree.isbalanced());
myTree.rebalance();
console.log(myTree.isbalanced());
console.log(myTree.inOrder());
console.log(myTree.preOrder());
console.log(myTree.postOrder());
