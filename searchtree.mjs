class Node {
    constructor (data,left,right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
};

class Tree {
    constructor (array) {
        this.array = array;
        this.root = buildTree();
    }
}

function buildTree(array) {
    let sortedArr = mergeSort(array);
    let midIndex = Math.floor(sortedArr.length/2) - 1;
    let midItem = sortedArr[midIndex];
    return midItem;
}

function mergeSort(array){
    if (array.length < 2) {
        return array;
    }

    let middle = Math.floor(array.length/2);
    let left = array.slice(0,middle);
    let right = array.slice(middle);
    let result = merge(mergeSort(left),mergeSort(right));
    return result;
}

let merge = function (left,right) {
    let newArr = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            if (newArr.includes(left[0])) {
                left.shift();
            } else {
                newArr.push(left.shift());
            }
        } else {
            if (newArr.includes(right[0])) {
                right.shift();
            } else {
                newArr.push(right.shift());
            }
        }
    };

    while (left.length) {
        newArr.push(left.shift());
    };

    while (right.length) {
        newArr.push(right.shift());
    };

    return newArr;
};

console.log(buildTree([56,27,33,33,98,12,10]))