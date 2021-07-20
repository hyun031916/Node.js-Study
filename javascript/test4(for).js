//1. for  (i, 최종값, 증감값)

//2. for-in(배열, 객체 모두 사용 가능)
console.log("==== for-in ====")
let user=['kim','lee','park']
for(let i in user){ // i: index, user: 배열 이름
    console.log(i, user[i]);    //0 kim ...
}

console.log("========")

const obj={ //key-value
    name: 'kim',
    age:18
}
for(let i in obj){
    console.log(i, obj[i]);
}

//3. for-of (배열, 객체 모두 사용 가능)
console.log("==== for-of ====")
const user2=['kim','lee','park']
for(let value of user2){    //for(let i in user)
    console.log(value);
}

console.log("========")
const str = "hi javascript";
for(let value of str){
    console.log(value);
}

//4. forEach() 배열의 함수(객체 사용 불가)

console.log("==== forEach ====")
let user3=['kim', 'lee', 'park'];   //배열이름.forEach(콜백함수)
user3.forEach(function(val, index){
    console.log(val, index)
})