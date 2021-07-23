// 1. express모듈 가지고 와서 express에 대입
const express = require('express');

//2. express 객체 생성(express()함수 이용하여 app에 대입)
const app = express();


//3. app의 listen 메서드 실행
app.use((req, res, next)=>{
    console.log("첫 번째 미들웨어");
    req.user = 'kim';
    next();
})

app.use((req, res)=>{
    console.log('두 번째 미들웨어');
    //res.send(`서버에서 응답한 결과 ${req.user}`);
    const person = {name:'kim', age:35};
    const person2 = JSON.stringify(person);//JSON 형식을 문자열로 바꿈
    res.send(person2);

    //문자열을 JSON 형식으로 : JSON.parse()
})
app.listen(3000, ()=>{
    console.log("express server running......")
})