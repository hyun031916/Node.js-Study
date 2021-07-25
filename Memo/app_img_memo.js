const express = require('express');
const multer = require('multer');
const fs = require('fs');


const app = express();
app.use(express.static(__dirname+'/public'));

app.set('vies', './views');
app.set('view engine', 'pug');

app.locals.pretty = true;

app.use(express.urlencoded({extended:true}));


app.get("/", (req, res)=>{
    res.send("server start!");
})

app.get("/memo", (req, res)=>{
    res.render('img_memo')
})

var _storage =multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads/');
    },

    filename : function(req, file, cb){
    
        cb(null, file.originalname);
      }
})
var upload = multer({storage: _storage }) // 위에 있는 _storage를 호출한다.


app.post("/memo", upload.single('userfile'),function(req, res){
    const data = {
        _name:req.body.uname,
        _date:req.body.date,
        _content:req.body.content
    }
    fs.appendFile('memo.txt', `작성자:${data.name}\n작성일자:${data._date}\n작성내용${data._content}\n\n\n`, 'utf8', (err)=>{
        if(err){
            console.log(err);    
        }else{
            console.log("saved!");
            console.log(req.file);
            res.render("complete", {file:req.file.originalname});
        }
    })
})
app.listen(3000,()=>{
    console.log('running express server at localhost')
})

