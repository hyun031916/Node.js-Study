//1. 기본 생성
// const user={
//     kim:10,
//     lee:7,
//     park:25
// }

// console.log(user.kim);

//2. new 연산자 이용하여 생성
const user = new Object();
//const user={};    //객체 만들겠다고 선언
//객체이름.키 = 값, 객체이름[키]=값
user.kim =10;
user.lee = 25;
user['park'] = 9;

//3. 프로토타입 이용하여 생성
function Person(name, age){
    this.name = name;
    this.age = age;
}
Person.prototype.walk=function(){
    console.log('걷는다.');
}
let person1 = new Person("kim", 30);
let person2 = new Person("lee", 34);
let person3 = new Person("park", 43);

//kim, lee 출력하기
console.log(person1.name);
console.log(person2.name);
person1.walk();

console.log("=======================");
//score kor 100, eng 80, math 90, sum1()

const score={
    kor:100,
    eng:80,
    math:90
}

const score2 = new Object();

score2.kor = 100;
score2.eng = 80;
score2.math = 90;


function Score(sub, score){
    this.sub = sub;
    this.score = score;
}
Score.prototype.sum1=function(kor, eng, math){
    console.log(kor+eng+math);
}
let s1 = new Score("kor", 100);
let s2 = new Score("eng", 80);
let s3 = new Score("math", 90);

console.log(s1.sub);
console.log(s1.score);

s1.sum1(s1.score, s2.score, s3.score);



var score = {
	kor: 100,
	eng: 80,
	math: 90,
	sum: function(){
	return   this.kor+ this.eng+ this.math;
	}
};
console.log(score.kor+ "+"+ score.eng+ "+"+ score.math)

// ---------------------------------------------------
// var  score = newObject();  //var score={};

// score.kor= 100;
// score['eng'] = 80;
// score.math= 90;

// score.sum= function(){
// 	returnthis.kor+ this.eng+ this.math;
// };

// console.log(score.kor+ "+"+ score.eng+ "+"+ score['math'] + "="+ score.sum());

// ---------------------------------------------------
// function score(kor, eng, math){
//     this.kor=kor;
//     this.eng=eng;
//     this.math=math;
//     }
//     score.prototype.sum=function(){
//         return this.kor+this.eng+this.math;}
    
    
//     var kim=new score(80,70,90);
//     var lee=new score(70,23,35);
//    console.log(kim.kor + "+" + kim.eng)