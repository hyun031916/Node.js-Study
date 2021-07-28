const express=require('express');
var mysql = require('mysql');
var multer = require('multer');
var fs = require('fs');
const app=express();

app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({extended:true}));
app.locals.pretty=true;

var _storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(file.mimetype=='image/jpeg' || file.mimetype=='image/png'){
            console.log('그림 파일');
            cb(null, 'uploads/img');
        }else{
            console.log('텍스트 파일')
            cb(null, 'uploads/texts');
        }
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now()+'-'+(Math.round()*1E9)
        cb(null, file.originalname)
    }
})
const conn = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password:'1111',
  database:'testdb',
  port:3306
})
 
conn.connect();

 if (conn) {
     console.log("mysql db connected!!")
 }
const sql={
  list:"select * from file_upload order by id desc",
  insert:"insert into file_upload(file_name) values(?)",
  read:"select * from file_upload where id=?",
  update:"update file_upload set file_name=? where id=?",
  delete: "delete from file_upload where id=?",
  
}
app.set('view engine','ejs');
app.set('views', './views');
var upload = multer({storage: _storage}) // 위에 있는 _storage를 호출한다.



app.get("/",(req, res)=>{
  //  res.send("hi Contact~")
    res.send('안녕');
})

app.get('/upload', (req, res)=>{
    res.render('upload_form')
})

app.post('/upload', upload.single('userfile'), function(req, res){
    console.log(req.files);
    const _file = req.files;
    console.log(_file);
    conn.query(sql.insert,[req.file.path],(err)=>{
        if(err){console.log(err);}
        else {
          console.log("Inserted!!")
        }
      })
})

app.get('/list', (req, res)=>{
    conn.query(sql.list, (err, rows)=>{
        res.render('list', {rows:rows});
    })
})

app.get("/down/uploads/texts/:name", (req, res)=>{
    const filename = req.params.name;
    const file = __dirname+'\\uploads\\texts\\'+filename;
    console.log('file', file);
    res.download(file);
})

// conn.end();
app.listen(3000,()=>{
    console.log("running express server at localhost....");
})