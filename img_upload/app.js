const express=require('express');
var mysql = require('mysql');
var multer = require('multer');
var fs = require('fs');
const app=express();
const config = require('./db/dbconn');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.locals.pretty=true;

var _storage = multer.diskStorage({
    destination: function(req, file, cb){
        console.log('그림 파일');
        cb(null, 'public/uploads/img');
    },
    filename: function(req, file, cb){
        //const uniqueSuffix = Date.now()+'-'+(Math.round()*1E9)
        cb(null, file.originalname)
    }
})
const conn = mysql.createConnection(config)
 
conn.connect();

 if (conn) {
     console.log("mysql db connected!!")
 }
const sql={
  list:"select * from img order by id desc",
  insert:"insert into img(filename, originalname) values(?, ?)",
  read:"select * from img where id=?",
  update:"update img set file_name=?, originalname=? where id=?",
  delete: "delete from img where id=?",
  
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
    console.log(req.file);
    const _file = req.file.originalname;
    console.log(_file);
    conn.query(sql.insert,[req.file.path, req.file.originalname],(err)=>{
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

app.get("/show",(req, res)=>{
    conn.query(sql.list,(err,data)=>{
        if(err){
            console.log(err);
        }else {
            console.log(__dirname);
            const file = __dirname+`\\${data[0].filename}`;

            console.log("data",data);
            console.log(file);
            res.render("show",{rows:data})
        }
    })
}) 

// conn.end();
app.listen(3000,()=>{
    console.log("running express server at localhost....");
})