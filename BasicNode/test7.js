const fs= require('fs');
const http = require('http');

const server = http.createServer();

server.listen(3000, ()=>{
    console.log("Running Http Server at localhost......");
})

server.on("connection", (Socket)=>{
    console.log('사용자 접속');
})

server.on('request', (req, res)=>{
    console.log('사용자 요청 들어옴');

    fs.readFile("lion1.png", (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.writeHead(200, {"Content-Type":"image/png"})
            res.write(result);
            res.end();
        }
    })
})