const express = require('express');
const multer = require('multer');
const fs = require('fs');


const app = express();
const upload = multer({dest:'uploads/'});

app.use(express.static(__dirname+'/public'));

app.set('vies', './views');
app.set('view engine', 'pug');

app.locals.pretty = true;

app.use(express.urlencoded({extended:true}));

app.get('/lang', (req, res)=>{
    //res.render("list", {lists:[], title:'welcome', decription:'javascript'});
    fs.readdir('./data', (err, files)=>{
        if(err){
            console.log(err);
        }else{
            console.log(files);
            res.render('list', {files:files});
        }
    })
})

app.post('/lang', (req, res)=>{
    const data = {
        _title:req.body.title,
        _desc:req.body.description
    };

    fs.writeFile(`./data/${data._title}`,`${data._desc}`, 'utf-8',  (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("saved");
            res.redirect('list');
        }
    })
    // fs.readdir('./data', (err, files)=>{
    //     if(err){
    //         console.log(err);
    //     }else{
    //         res.render("list", {lists:files, title:'welcome', decription:'javascript'})
    //     }
    // })
})

app.get('/lang/:id', (req, res)=>{
    const param = req.params.lauguage;
    // fs.readdir('./data', (err, files)=>{
    //     if(err){
    //         console.log(err);
    //     }else{
    //         fs.readFile(`./data/${req.params.lauguage}`, 'utf-8', (err2, data)=>{
    //             if(err2){
    //                 console.log(err2);
    //             }else{
    //                 res.render('lang', {files:files, title:req.params.language, des:data})
    //             }
    //         })
    //     }
    // })
    fs.readFile(`data/${req.params.id}`, 'utf-8', (err, result)=>{
        if(err){
            console.log(err);
        }else{
            fs.readdir('./data', (err, files)=>{
                if(err){
                    console.log(err);
                }else{
                    res.render('list', {files:files, title:req.params.id, description:result});
                }
            })
        }
    })
})

app.get("/", (req, res) => {
    res.send("hi nodejs!")
})

app.listen(3000,()=>{
    console.log('server start')
})