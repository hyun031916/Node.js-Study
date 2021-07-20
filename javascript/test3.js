var sum=0;

for(var i=1; i <= 10; i++){
    sum += i;
}

console.log("sum", sum);    //55
console.log("i", i);        //11
console.log("===============================")

function foo(){
    var sum = 0;
    for(var i=1; i <=  10; i++){
        sum += i;
    }
    
}
foo();
console.log("sum", sum);    //error
console.log("i", i);        //error
console.log("===============================")

let sum1 = 0;
for(let i1=1; i <= 10; i ++){
    sum1 += i1;
}
console.log("sum1", sum1);
// console.log("i1", i1);
console.log("===============================")

