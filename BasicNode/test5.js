//http 모듈
const http = require('http');

// 웹서버 객체 만들기
const server = http.createServer();

//웹서버 실행, 대기
server.listen(3000,()=>{
    console.log('Running Http Server at localhost......');
})