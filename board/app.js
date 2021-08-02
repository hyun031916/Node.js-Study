const express = require('express');
const mysql = require('mysql');
const format = require('date-format');
const moment = require('moment');
const multer = require('multer');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
var Prompt = require('prompt-password');
var prompt = new Prompt({
  type:'password',
  message:'Enter your password please',
  name:'password'
})

const app = express();
const config = require('./db/dbconn');

const conn = mysql.createConnection(config);
conn.connect();

const register = {
    list: 'select * from register order by id desc',
    insert : 'insert into register(user_id, password, email, tel, reg_date) values(?, ?, ?, ?, ?)',
    read: 'select * from register where id=?'
}

const board = {
    list: 'select * from board order by id desc',
    insert : 'insert into board(name, title, content, regdate, password, hit, file_name) values(?, ?, ?, ?, ?, ?, ?)',
    read: 'select * from board where id=?',
    hit: 'update board set hit=? where id=?',
    update:'update board set title=?, content=? where id=?',
    search: 'select * from board where ? like?'
}

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
var upload = multer({storage: _storage}) // 위에 있는 _storage를 호출한다.


app.use(express.static(__dirname+'/public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.locals.pretty = true;

app.use(express.urlencoded({extended: true}));// post로 전송된 데이터를 가져오기 위함

const date = moment().format('YYYY-MM-DD HH:mm:ss');

app.get("/", (req, res)=>{
    conn.query(board.list, (err, result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.render('main', {rows:result});
        }
    })
})

//else{ res.send('<script type="text/javascript">alert("로그인한 사용자만 작성할 수 있습니다."); window.location="/login"; </script>')}

//게시판 작성
app.get('/new', (req, res)=>{
    res.render('new');
})

app.post('/new', upload.single('userfile'),function(req, res){
    const _name = req.body.name;
    const _title = req.body.title;
    const _content = req.body.content;
    const _regdate = date;
    const _password = req.body.password;
    var hit = 0;
    console.log(req.files);
    conn.query(board.insert, [_name, _title, _content, _regdate, _password, hit, req.file.path], (err)=>{
        if(err) console.log(err);
        else {
            console.log("inserted")
            conn.query(board.list, (err, result)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                    res.render('main', {rows:result});
                }
            })
        }
    })
    
})

// 파일다운로드
app.get('/down/uploads/texts/:name', (req, res)=>{
    const filename = req.params.name;
    const file = __dirname+'\\uploads\\texts\\'+filename;
    res.download(file);
})

//게시글 상세 보기
app.get('/board/:id', (req, res)=>{
    conn.query(board.read, [req.params.id], (err, rows)=>{
        if(err){
            console.log(err);
        }else{
            conn.query(board.hit, [rows[0].hit+1, req.params.id], (err)=>{
                console.log(rows);
                console.log(rows[0].hit+1);
                res.render('board', {title:rows.title, rowsX:rows})
            })
        }
    })
})

//게시글 수정
app.get('/edit/:id', (req, res)=>{
    const paramID = req.params.id;
    conn.query(board.read, [paramID], (err, rows)=>{
        if(err){
            console.log(err);
        }else{
            prompt.run()
            .then(function(answers) {
                console.log(answers)
                console.log(rows[0].password)
                if(answers == rows[0].password){
                    console.log(rows);
                    console.dir(rows);
                    res.render('edit', {title:'수정하기', rowsX:rows})                }
            });
            
        }
    })
})

app.post('/edit/:id', (req, res)=>{
    const paramID = req.params.id;
    const _title = req.body.title;
    const _content = req.body.content;
    conn.query(board.update, [_title, _content, paramID], (err, rows)=>{
        if(err) console.log(err);
        else{
            conn.query(board.list, (err, result)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                    res.render('main', {rows:result});
                }
            })
        }
    })
})

app.get('/delete/:id', (req, res)=>{
    const paramID = req.params.id;
    prompt.run()
        .then(function(answers){
            if(answers== rows[0].password){
                conn.query(sql.delete, [paramID], (err)=>{
                    if(err) console.log;
                    else{
                        conn.query(board.list, (err, result)=>{
                            if(err){
                                console.log(err);
                            }else{
                                console.log(result);
                                res.render('main', {rows:result});
                            }
                        })
                    }
                })
            }
        })
})

//검색
app.post('/search',(req,res)=>{
    const _sel=req.body.sel;
    const txt=req.body.txt;
    console.log(_sel,txt)
    console.log(_sel,`%${txt}%`);
    var s = `select * from board where ${_sel} like '%${txt}%'`;
    conn.query(s,(err,docs)=>{ 
        if(err){
            console.log(err);return;
        }
        console.log("docs",docs);
        res.send(docs)
        res.render('search');
    })
})

app.listen(3000,()=>{
    console.log('running server at localhost......')
})