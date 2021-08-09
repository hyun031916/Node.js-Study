const express = require('express');
const cookieParser = require('cookie-parser')
const session = require('express-session')


const app = express();

app.use(express.static(__dirname+'/public'));
app.use(cookieParser());

app.set('views', './views');
app.set('view engine', 'pug');

app.use(session({
    secret: 'adfafafafaasdf',   //sid를 브라우저에 저장할 때 랜덤하게 해주는 것
    resave: false,  //사용자가 접속할 때마다 세션아이디를 새로 발급할지 아닐지 결정
    saveUninitialized: true,    //사용자가 접속해서 세션을 사용하기 전까지 sid 발급하지 말 것
    cookie: { secure: true }
}))

app.locals.pretty = true;
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.send("hi hello");
})

app.get('/welcome', (req, res)=>{
    res.render("welcome");
})

app.get('/login', (req, res)=>{
    res.render('login_form');
})

app.post('/login', (req, res)=>{
    const data = {
        _uid:req.body.id,
        _upass = req.body.password
    };
    if(_uid=='kim'&&_upass==1111){
        req.session.uid = data._uid;
        res.render("login", {uid:data._uid, upass:data._upass})
        res.send(`아이디는 ${data._uid}이고 비밀번호는 ${data._upass} 환영합니다.`)
    }else{
        res.render("/fail_login");
    }
})
app.listen(3000,()=>{
    console.log('running server at localhost......')
})