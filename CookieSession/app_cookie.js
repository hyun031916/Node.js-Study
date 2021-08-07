const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.static(__dirname+'/public'));
app.use(cookieParser());

app.set('views', './views');
app.set('view engine', 'pug');

app.locals.pretty = true;
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.send("hi hello");
})

app.get('/cookie', (req, res)=>{
    res.render("cookie_form");
})

app.post('/cookie', (req, res)=>{
    var _id = req.body.id;
    res.cookie('userid', _id);
    res.send('저장완료')
})

app.get('/result', (req, res)=>{
    console.log(req.cookies);
    res.send('저장완료')
})

app.listen(3000,()=>{
    console.log('running server at localhost......')
})