//users 배열에 3개의 객체
var users = [{name:'kim', age:30}, {name:'lee', age:35}, {name:"choi", age:40}];
console.dir()
users.push

//2. name:kang, age:35 를 맨 뒤 추가, 배열의 길이 출력

//3. 맨 뒤의 데이터 빼내고 배열 길이 출력
users.pop();
console.log("pop 후 길이 : ", users.length);

//4. 맨 앞에 name:ko, age:40 추가 후 배열 길이 출력
users.unshift({name:'ko', age:15});
console.log("unshift 후 길이 : ", users.length);

//5. 맨 앞의 데이터 빼내고 배열 길이 출력


//6. 2번째 데이터 삭제
delete users[1];
console.dir(users);

//7. forEach 이용하여 값 출력
users.forEach(function(val){
    console.log(val);
})