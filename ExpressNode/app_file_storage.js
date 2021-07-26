const express = require('express');

const multer = require('multer');

const app = express();

app.use(express.static(__dirname+'/public'));
app.set('views', './views');
app.set('view engine', 'pug');

app.locals.pretty = true;

app.use(express.urlencoded({extended:true}));

var _storageA = multer.diskStorage({
    destination: function (req, file, cb) { 
      cb(null, 'uploads/')  // 두번째 인자로 파일이 업로드된다
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) // originalname은 원래 파일의 이름 즉, 원래 파일이름으로 저장한다.
      //cb(null, file.originalname+'-'+Date.now())
    }
  })
var upload = multer({storage: _storageA }) // 위에 있는 _storage를 호출한다.


app.get('/', (req, res)=>{
    res.send("hi nodejs");
})

app.get('/upload', (req, res)=>{
    res.render('upload_form')
})

// app.post('/upload', upload.single('userfile'), function(req, res){
//     //upload.single('avarter') : 파일 한개
//     //upload로 post라이팅 들어왔을 때 req객체에 file이란 속성 자동으로 추가시키는 역할
//     console.log(req.file);
//     console.log(req.file.originalname);
//     res.send('파일 업로드됨');
// })

app.post('/upload', upload.array('userfile', 5), function(req, res){
    console.log(req.files);
    res.send('파일 업로드 성공');
})
app.listen(3000,()=>{
    console.log('running express server at localhost')
})