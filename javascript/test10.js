// 콜백 함수를 5번 호출하기
let callTimes = (callback)=>{
    for(var i=0; i < 5; i++){
        callback();
    }
}

let testB=()=>{
    console.log('testB() 함수')
}

//callTimes(함수);
// callTimes(testB);
callTimes(()=>{
    console.log('testB() 함수')
});

console.log("========================")

const add =(a, b, cd)=>{
    d = a+b;
    cd(d);
}

var k = function(result){
    console.log(result);
}
// add(10, 20, k);
add(10, 20, (num)=>{
    console.log(num);
});

console.log("========================");

// fs.readFile('data.txt', (err, result)=>{
//     console.log(result);
// })

// fs.writeFile('test.txt', "콜백함수", (err)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log('saved');
// })