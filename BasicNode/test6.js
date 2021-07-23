const http = require('http');

//웹 서버 객체 만들기
const server = http.createServer();

//웹 서버 실행
server.listen(3000, ()=>{
    console.log("Running Http Server at localhost......");
})

// 1. 사용자 접속 이벤트 처리
server.on('connection', (socket)=>{
    console.log('사용자 접속')
})

// 2. 사용자 요청 처리 이벤트
server.on('request', (req, res)=>{
    console.log('사용자 요청 들어옴');
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
    res.write("<html><head><title>test</title></head><body>");
    res.write("Hello Node.js");
    res.write("</body></html>");
    res.end();
})