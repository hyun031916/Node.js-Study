const express = require('express');

const app = express();

//app.use(express.static('public'));
//static이라는 미들웨어 사용하여 public을 /로 지정

//app.use('public',express.static('public'));
//localhost:3000/public이 /가된다
app.use(express.static(__dirname + '/public'));
console.log('__dirname: ', __dirname);




app.listen(3000,()=>{
    console.log("Running Http Server at localhost...... ");
})