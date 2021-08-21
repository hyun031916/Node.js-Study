const express=require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/data', {useNewUrlParser:true})
const app = express();

app.use(express.static(__dirname+'/public'));

app.set('views', './views');

app.set('view engine', 'pug');

app.locals.pretty = true;

app.use(express.urlencoded({extended: true}));

//2. db 연결
const db = mongoose.connection;

//3. event 이용하여 접속
db.on('err', ()=>{
    console.log('connection failed!');
})

db.once('open', ()=>{
    console.log('connected');
})

//4. 스키마 생성
const login = mongoose.Schema({
    id: String,
    password: String,
    name: String, 
    email: String
})

//5. 4번의 스키마를 토대로 실제 컬렉션 생성
const Login = mongoose.model('login', login);


app.get("/", (req, res)=>{
    res.render("main");
})

app.get("/list", (req, res)=>{
    res.render("list")
})

app.get("/login", (req, res)=>{
    res.render("login")
})

app.post("/login", (req, res)=>{
    const data = {
        _uid:req.body.id,
        _upass:req.body.password,
        _uname:req.body.name,
        _uemail:req.body.email
    };
    const login = new Login({id:data._uid, password:data._upass, name:data._uname, email:data._uemail})
    login.save((err, data)=>{
        if(err){
            console.log(err);
        }else{
            console.log('saved');
            res.render('main');
        }
    })
})

app.get("/update/:id", (req, res)=>{
    Login.findOne({id:req.params.id}, (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.render('update_form', {person:result});
        }
    })
})

app.post("/update/:id", (req, res)=>{
    Login.updateOne(
        {id:req.params.id},
        {   
            id:req.body.id, 
            password:req.body.password,
            name:req.body.name,
            email:req.body.email
        },
        (err)=>{
            if(err) console.log(err);
            else res.redirect("/list");
        }
    )
})

app.get("/delete:id", (req, res)=>{
    Login.deleteOne({id:req.params.id}, (err)=>{
        if(err) console.log(err);
        else{
            res.redirect("/list");
        }
    })
})

app.get("/list", (req, res)=>{
    Login.find({}, (err, result)=>{
        if(err) console.log(err);
        else res.render("list", {list:result});
    })
})


app.listen(3000,()=>{
    console.log('running server at localhost......')
})