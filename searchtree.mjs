class Node {
    constructor (data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
};

class Tree {
    constructor (array) {
        this.array = array;
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        let sortedArr = array.sort((a,b) => a - b);
        let delDuplicates = sortedArr.filter((item,index) => {
                arr.indexOf(item) === index;
            })

        let root = binaryTree(delDuplicates,0,delDuplicates.length - 1)

        let binaryTree = function (array,start,end) {
            if (start > end) {
                return null;
            };

            const mid = Math.floor((start + end)/ 2);
            const node = new Node(array[mid]);

            node.left = binaryTree(array,start,mid - 1);
            node.right = binaryTree(array,mid + 1,end);
            return node;
        }
        return root;
    }
    
    insert (value) {
        this.rootnode = this.insertRecursion(this.rootnode,value);
    }
    insertRecursion(node,value) {
        if (node === null) {
            return new Node(value);
        };
    
        if (value < node.data) {
            node.left = this.insertRecursion(node,left,value);
        } else if (value > node.data) {
            node.right = this.insertRecursion(node.right,value);
        }

        return node;
    };

    delete(value) {
        this.rootnode = this.deleteRecursion(this.rootnode,value);
    };
    deleteRecursion (node,value) {
        if (node === null) {
            return null;
        };

        if (value < node.data) {
            node.left = this.deleteRecursion(node.left,value);
        } else if (value > node.data) {
            node.right = this.deleteRecursion(node.right,value);
        } else {
            if (node.left === null && node.right === null) {
                return null;
            };

            if (node.left !== null && node.right === null) {
                return node.left;
            };
            if (node.left === null && node.right !== null) {
                return node.right;
            };
    
            if (node.left !== null && node.right !== null) {
                let smallRightNode = this.findSmallestNode(node.right);
                let smallRightValue = smallRightNode.data;
    
                node.data = smallRightValue;
    
                node.right = this.deleteRecursion(node.right,smallRightValue);
            }
        }

        return node;
    };

    findSmallestNode (node) {
        let currentNode = node;
        while (currentNode.left !== null) {
            currentNode = currentNode.left;
        };
        return currentNode;
    };

    find (value) {
        return this.findRecursion(this.rootnode,value);
    };

    findRecursion (node,value) {
        if (node === null) {
            return null;
        };

        if (value < node.data) {
            return this.findRecursion(node.left,value);
        } else if (value > node.data) {
            return this.findRecursion(node.right,value);
        } else {
            return node;
        }
    };

    levelOrder (callback) {
        if (callback === null || callback === undefined) {
            throw new Error('No callback received');
        };

        if (this.rootnode === null) {
            return;
        };
        let newArr  = [];
        newArr .push(this.rootnode);

        while (newArr.length > 0) {
            let currentNode = newArr.shift();
            callback(currentNode);

            if (currentNode.left !== null) {
                newArr.push(currentNode.left);
            };

            if (currentNode.right !== null) {
                newArr.push(currentNode.right);
            }
        }
    };

    inOrder (callback) {
        if (callback === null || callback === undefined) {
            throw new Error('No callback received');
        };

        if (this.rootnode === null) {
            return;
        };

        this.inOrderRecursion(this.rootnode,callback);
    };

    inOrderRecursion (node,callback) {
        if (node === null) {
            return;
        };
        this.inOrderRecursion(node.left,callback);
        callback(node);
        this.inOrderRecursion(node.right,callback);
    };

    preOrder (callback) {
        if (callback === null || callback === undefined) {
            throw new Error('No callback received');
        };

        if (this.rootnode === null) {
            return;
        };
        
        this.preOrderRecursion(this.rootnode,callback);
    };

    preOrderRecursion (node,callback) {
        if (node === null) {
            return;
        };

        callback(node);
        this.preOrderRecursion(node.left,callback);
        this.preOrderRecursion(node.right,callback);
    };

    postOrder (callback) {
        if (callback === null || callback === undefined) {
            throw new Error('No callback received');
        };

        if (this.rootnode === null) {
            return;
        };
        
        this.postOrderRecursion(this.rootnode,callback);
    };

    postOrderRecursion (node,callback) {
        if (node === null) {
            return;
        };

        this.postOrderRecursion(node.left,callback);
        this.postOrderRecursion(node.right,callback);
        callback(node);
    };

    height (node) {
        if (node === null) {
            return -1;
        };

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        return Math.max(leftHeight,rightHeight) + 1;
    };

    depth (node) {
        if (node === null) {
            return null;
        };

        let currentNode = this.rootnode;
        let depthCounter = 0;

        while (currentNode !== null) {
            if (node.data === currentNode.data) {
                return depthCounter;
            };

            if (node.data < currentNode.data) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }

            depthCounter++;
        };

        return null;
    };

    isBalanced() {
        return this.checkBalanceRecursion(this.rootnode);
    };

    checkBalanceRecursion(node) {
        if (node === null) {
            return true;
        };

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        };

        return this.checkBalanceRecursion(node.left) && this.checkBalanceRecursion(node.right);
    };

    rebalance() {
        let newArr = [];
        this.inOrder(function (node) {
            newArr.push(node.data);
            this.rootnode = this.buildTree(newArr);
        });
    }
}