const express = require('express');
const mysql = require('mysql');
const indexRouter = require('./routes/index');

const app = express();

const conn = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:1111,
    database:'test',
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

app.use('/', indexRouter); //사용자가 /를 포함하여 접속했을 때 indexRouter 실행

app.locals.pretty = true;

app.use(express.urlencoded({extended: true}));// post로 전송된 데이터를 가져오기 위함



app.listen(3000,()=>{
    console.log('running server at localhost......')
})