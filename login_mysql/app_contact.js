const express=require('express');
var mysql = require('mysql');
const format = require('date-format');
const moment=require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
var Prompt = require('prompt-password');
var prompt = new Prompt({
  type:'password',
  message:'Enter your password please',
  name:'password'
})

const app=express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))
app.locals.pretty=true;


const conn = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password:'1111',
  database:'testdb',
  port:3306
})
 
conn.connect();

 if (conn) {
     console.log("mysql db connected!!")
 }
const date=moment().format('YYYY-MM-DD HH:mm:ss');
const sql={
  list:"select * from contact order by id desc",
  insert:"insert into contact(name,email,tel,city,password, reg_date) values(?,?,?,?,?,?)",
  read:"select * from contact where id=?",
  update:"update contact set name=?,email=?,tel=?,city=? where id=?",
  delete: "delete from contact where id=?",
  
}
app.set('view engine','ejs');
app.set('views', './views');


app.get("/",(req, res)=>{
  //  res.send("hi Contact~")
    res.render("main");
})

app.get("/new",(req, res)=>{
  res.render("new")
})

app.post("/new",(req, res)=>{
  var name=req.body.name;
  var email=req.body.email;
  var tel=req.body.tel;
  var city=req.body.city;
  var password=req.body.password;

//insert
conn.query(sql.insert,[name,email,tel,city,password,date],(err)=>{
  if(err){console.log(err);}
  else {
    console.log("Inserted!!")
    res.redirect("/list");
  }
})

})

//list
app.get('/list',(req, res)=>{
  conn.query(sql.list,(err, rows)=>{
    if(err){console.log(err);}
    else {res.render('list',{data:rows})}
  })
})

//update
app.get('/update/:id', (req, res)=>{
  const paramID =req.params.id;
  conn.query(sql.read, [paramID], (err, rows)=>{
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
            res.render('update_form', {title:'수정하기', rows:rows})
          }
        });
          
      }
  })
})

app.post('/update/:id', (req, res)=>{
  const paramID = req.params.id;
  console.log(paramID);
  const _name = req.body.name;
  const _email = req.body.email;
  const _tel = req.body.tel;
  const _city = req.body.city;
  conn.query(sql.update,[_name, _email, _tel, _city, paramID],(err, rows)=>{
      if(err){
          console.log(err);
      }else{
          res.redirect('/');
      }
  } )
})

//delete 
app.get('/delete/:id', (req, res)=>{
  const paramID = req.params.id;
  prompt.run()
          .then(function(answers) {
          console.log(answers)
          console.log(rows[0].password)
          if(answers == rows[0].password){
            conn.query(sql.delete, [paramID], (err)=>{
                if(err) console.log;
                else{
                    res.redirect('/')
                }
            })
          }
        })
})

// conn.end();
app.listen(3000,()=>{
    console.log("running express server at localhost....");
})