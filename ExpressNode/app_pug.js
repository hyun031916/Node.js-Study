const express = require('express')

const app = express();

app.use(express.static(__dirname+'/public'));
app.set('views', './views');
//view 사용하겠다. 사용하는 템플릿엔진은 view 폴더에 저장
app.set('view engine', 'pug');
//pug 사용
app.locals.pretty = true;

app.use(express.urlencoded({extended: true}));
//응답할 때 객체 안에 객체 넣을 수 있도록 하겠다.

app.get("/", (req, res)=>{
    res.send('hi pug~');    //서버에서 클라이언트로
})

app.get("/template", (req, res)=>{
    //http://localhost:3000/template 접속시 temp라는 pug 파일 열리게 하기
    res.render("temp");
})

app.get("/login", (req, res)=>{
    res.render("login_form")
})

app.post("/login", (req, res)=>{
    let _uid = req.body.id;
    let _upass = req.body.password;
    if(_uid=='kim'&&_upass==1111){
        res.send(`아이디는 ${_uid}이고 비밀번호는 ${_upass} 환영합니다.`)
    }else{
        res.render("/login_form");
    }
    
})

app.get('/temp', (req, res)=>{
    let _id = req.query.name;
    let _pass = req.query.password;
    res.send(`이름은 ${_id}이고 비밀번호는 ${_pass}이다.`);
})
app.listen(3000, ()=>{
    console.log("Running express server at localhost......");
})