// add 함수 만든 후 3, 5 넘겨서 더한 합 출력
function add(num1, num2){
    var sum = num1+num2;
    return sum;
}

console.log(add(3,5));


//익명 함수로 바꾸기 (더 많이 씀)
const add_v2 = function(num1, num2){
    return num1 + num2
}
console.log(add_v2(3, 5));


//1. n부터 m까지 더한 합 출력
const nTom = function(n, m){
    var sum = 0;
    for(var i=n; i <= m; i++){
        sum += i;
    }
    return sum;
}

console.log(nTom(4, 8));

//2. n을 넘겨서 짝수인지 홀수인지 판단하여 출력
const oddOrEven = function(n){
    if(n%2==0){
        return "짝수";
    }else{
        return "홀수";
    }
}

console.log(oddOrEven(5));
console.log(oddOrEven(4));

//3. person 객체 만들어 name: kim, age:30, add: x, y더한 값 출력
const person={
    name:'kim',
    age:30,
    add: function add(x, y){
        return x+y;
    }
}
console.log(person.name);
console.log(person.add(7, 9));

//4. person2 객체 만들고 list:객체 삽입(kim, 30 / lee, 28 / park, 35) show 함수
const person2={
    list:{kim:30, lee:28, park:35},
    show: function(){
        console.log("hi hello");
    }
}
person2.show();
person2['show']();