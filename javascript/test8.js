//arrow function (=>)


//1. 함수 이름으로 만드는 방법 2. 익명함수(=>)

function add(x, y){
    return x+y;
}

let add = (x, y) =>{
    return x+y;
}

function sub(){
    console.log('test');
}

const sub = () =>{
    console.log('test');
}

let a = 20;
let b = 30;
console.log("a="+a+"이고 b="+b+"이다.");
console.log(`a=${a}이고 b=${b}이다.`);