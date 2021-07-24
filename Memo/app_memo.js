const { RSA_NO_PADDING } = require('constants');
const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static(__dirname+'/public'));

app.set('views', './views');

app.set('view engine', 'pug');

app.locals.pretty = true;

app.use(express.urlencoded({extended: true}));
app.locals.moment = require('moment');

app.get("/", (req, res)=>{
    res.render("main");
})

app.get("/memo", (req, res)=>{
    res.render("memo_form")
})
app.post("/memo", (req, res)=>{
    const data = {
        _name:req.body.uname,
        _date:req.body.date,
        _content:req.body.content
    }
    fs.appendFile('memo.txt', `작성자:${data._content}\n작성일자:${data._date}\n작성내용${data._content}\n\n\n`, 'utf8', (err)=>{
        if(err){
            console.log(err);    
        }else{
            console.log("saved!");
        }
    })

})
app.listen(3000, ()=>{
    console.log("Running express server at localhost......");
})