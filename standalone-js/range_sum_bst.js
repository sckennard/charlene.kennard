/*
Given the root node of a binary search tree, return the sum of values of all nodes with value between L and R (inclusive).

The binary search tree is guaranteed to have unique values.

 

Example 1:
Input: root = [10,5,15,3,7,null,18], L = 7, R = 15
Output: 32

Example 2:
Input: root = [10,5,15,3,7,13,18,1,null,6], L = 6, R = 10
Output: 23
 
Note:
The number of nodes in the tree is at most 10000.
The final answer is guaranteed to be less than 2^31.

*/
/*
var rangeSumBST = function (root, L, R) {
    let result=0;
    result=SumBST(root,0,L,R);
    return result;
};

let SumBST=function(node,sum,L,R){
    if(node!==null){
        if(node.val<=R&&node.val>=L){
            sum+=node.val;
        }
        sum=SumBST(node.left,sum,L,R);
        sum=SumBST(node.right,sum,L,R);
    }
    return sum;
}
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} L
 * @param {number} R
 * @return {number}
 */

var rangeSumBST = function(root, L, R) {
    let sum = 0;
    
    function getSum(array){
        if(!array.length){
            return;
        }

        let current = array.shift(); 
        if(current <= R && current >= L){
            sum +=current;
        }
        
        getSum(array);
    }

    getSum(root);

    return sum;
};

console.log(rangeSumBST([10,5,15,3,7,null,18], 7, 15));
console.log(rangeSumBST([10,5,15,3,7,13,18,1,null,6], 6, 10));