const express = require('express');
const mysql = require('mysql');
const format = require('date-format');
const moment = require('moment');
const e = require('express');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul')

const date = moment().format('YYYY-MM-DD HH:mm:ss');

const router = express.Router();

router.get("/", (req, res)=>{
    conn.query(sql.list, (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.render('list', {lists:result});
        }
    })
})

router.get('/new', (req, res)=>{
    res.render("new");
})

router.post('/new', (req, res)=>{
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

router.get("/read/:id", (req, res)=>{
    const paramId = req.params.id;
    conn.query(sql.read, [paramId], (err, rows)=>{
        if(err){
            console.log(err);
        }else{
            console.log(rows);
            console.dir(rows);
            res.render('read', {title:'내용보기',rowsX:rows[0]})
        }
    })
})

router.get('edit/:id', (req, res)=>{
    const paramID =req.params.id;
    conn.query(sql.read, [paramID], (err, rows)=>{
        if(err){
            console.log(err);
        }else{
            console.log(rows);
            console.dir(rows);
            res.render('edit', {title:'수정하기', rowX:rows[0]})
        }
    })
})

router.post('edit/:id', (req, res)=>{
    const paramID = req.params.id;
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

router.get('/delete/:id', (req, res)=>{
    const paramID = req.params.id;
    conn.query(sql.delete, [paramID], (err)=>{
        if(err) console.log;
        else{
            res.redirect('/')
        }
    })
})

module.exports = router;    //웨부에서 이 모듈을 사용할 수 있도록 내보내기