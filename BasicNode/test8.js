// 1. express모듈 가지고 와서 express에 대입
const express = require('express');

//2. express 객체 생성(express()함수 이용하여 app에 대입)
const app = express();


//3. app의 listen 메서드 실행
app.get("/", (req, res)=>{
    res.send("Hi Express~");
})
app.listen(3000, ()=>{
    console.log("Running express server at 127.0.0.1......");
})


