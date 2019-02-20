/*

Implement function ToLowerCase() that has a string parameter str, and returns the same string in lowercase.

Example 1:

Input: "Hello"
Output: "hello"
Example 2:

Input: "here"
Output: "here"
Example 3:

Input: "LOVELY"
Output: "lovely"

*/

var toLowerCase = function(str) {

    let _str ='';

    for(let n=0; n < str.length; n++){
        let current = str[n].charCodeAt();
        if(current >= 65 && current <=90){
            current += 32;
        }
        _str += String.fromCharCode(current);
    }

    return _str;

    // let _str='';
    // for(let n of str){
    //     let current = n.charCodeAt();
    //     if(current >= 65 && current <=90){
    //         current += 32;
    //     }
    //     _str += String.fromCharCode(current);
    // }
    // return _str;

    // let newStr = str.split('');
    // newStr = newStr.map((e, index) => {
    //     let current = e.charCodeAt();
    //     if(current >= 65 && current <=90){
    //         current += 32;
    //     }
    //     return String.fromCharCode(current);
    // });
    // return newStr.join('');

};

console.log(toLowerCase('Hello'))