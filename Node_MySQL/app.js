const express = require('express');
const mysql = require('mysql');
const format = require('date-format');
const moment = require('moment');
const e = require('express');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul')
const app = express();

const conn = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'1111',
    database:'testdb',
    port:3306
})

conn.connect();

const sql = {
    list: 'select * from emp order by id desc',
    insert: "insert into emp(name, emp_number, email, reg_date) values(?, ?, ?, ?)",
    read: "select * from emp where id=?",
    update: "update emp set name=?, emp_number=?, email=? where id=?",
    delete: "delete from emp where id=?"
}

app.use(express.static(__dirname+'/public'));

app.set('views', './views');

app.set('view engine', 'ejs');

app.locals.pretty = true;

app.use(express.urlencoded({extended: true}));// post로 전송된 데이터를 가져오기 위함


const date = moment().format('YYYY-MM-DD HH:mm:ss');

app.get("/", (req, res)=>{
    conn.query(sql.list, (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.render('list', {lists:result});
        }
    })
})

app.get('/new', (req, res)=>{
    res.render("new");
})

app.post('/new', (req, res)=>{
    const _name = req.body.name;
    const _emp_number = req.body.emp_number;
    const _email = req.body.email;
    const _joinDate = date;
    console.log(_name, _emp_number, _email, date);
    conn.query(sql.insert, [_name, _emp_number, _email, _joinDate], (err)=>{
        if(err) console.log(err);
        else{
            console.log('Inserted!');
            res.redirect('/');
        }
    })
    res.send('hi');
})

app.get("/read/:id", (req, res)=>{
    const paramId = req.params.id;
    conn.query(sql.read, [paramId], (err, rows)=>{
        if(err){
            console.log(err);
        }else{
            console.log(rows);
            console.dir(rows[0]);
            res.render('read', {title:'내용보기',rowsX:rows})
        }
    })
})

app.get('/edit/:id', (req, res)=>{
    const paramID =req.params.id;
    conn.query(sql.read, [paramID], (err, rows)=>{
        if(err){
            console.log(err);
        }else{
            console.log(rows);
            console.dir(rows);
            res.render('edit', {title:'수정하기', rowsX:rows})
        }
    })
})

app.post('/edit/:id', (req, res)=>{
    const paramID = req.params.id;
    console.log(paramID);
    const _name = req.body.name;
    const _emp_number = req.body.emp_number;
    const _email = req.body.email;
    conn.query(sql.update,[_name, _emp_number, _email, paramID],(err, rows)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    } )
})

app.get('/delete/:id', (req, res)=>{
    const paramID = req.params.id;
    conn.query(sql.delete, [paramID], (err)=>{
        if(err) console.log;
        else{
            res.redirect('/')
        }
    })
})

app.listen(3000,()=>{
    console.log('running server at localhost......')
})