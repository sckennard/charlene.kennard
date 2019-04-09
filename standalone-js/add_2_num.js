/* 
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example:

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

let l1 = [2,4,3],
    l2 = [5,6,4];

var addTwoNumbers = function(l1, l2) {
    let sum = 0,
        arr = [l1,l2];

    let manualreverseJoin = (arr) =>{
        let newArr = '';

        for (let m = arr.length - 1; m >=0; m--){
            newArr += arr[m];
        }

        return parseInt(newArr)
    }

    let manualSplitReverse = (arr) =>{
        let newArr = [];
        
        if(typeof arr === 'number'){
            arr = arr.toString();
        }
        for (let m = arr.length - 1; m >=0; m--){
            newArr.push(arr[m]);
        } ;
        return newArr;
    }

    // let reverseJoin = (arr) =>{ 
    //     return arr.reverse().join('');
    // }

    // let splitReverse = (arr) =>{
    //     return toString().split('').reverse();
    // }

    for (let n of arr){
        sum += manualreverseJoin(n);
    }
    
    return manualSplitReverse(sum);
};

addTwoNumbers(l1,l2)