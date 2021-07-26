const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({dest:'uploads/'})

app.use(express.static(__dirname+'/public')); //public을 루트로 사용한다. 
app.use('/img', express.static('uploads'))
//http://localhost:3000/img/donut.jpg

app.set('views', './views');
app.set('view engine', 'pug');

app.locals.pretty = true;

app.use(express.urlencoded({extended:true}));



app.get('/', (req, res)=>{
    res.send("hi nodejs");
})

app.get('/upload', (req, res)=>{
    res.render('upload_form')
})

app.post('/upload', upload.single('userfile'), function(req, res){
    //upload.single('avarter') : 파일 한개
    //upload로 post라이팅 들어왔을 때 req객체에 file이란 속성 자동으로 추가시키는 역할
    console.log(req.file);
    console.log(req.file.originalname);
    res.send('파일 업로드됨');
})



app.listen(3000,()=>{
    console.log('running express server at localhost')
})