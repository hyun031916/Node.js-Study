const express=require('express');
const MongoClient = require('mongodb').MongoClient
//mongoclient 객체 생성
const url = "mongodb://localhost:27017";
const dbname = "data"

const app = express();
app.use(express.urlencoded({extended:true}))


MongoClient.connect(url, (err, client)=>{   //client: mongodb와 소통하는 매개체 역할
    if(err){
        console.log(err);
    }else{
        console.log('Connected mongodb');
        db = client.db(dbname);
        login = db.collection('login');
        console.log('created!');
    }
})
app.get('/', (req, res)=>{
    res.send('hi');
})

app.listen(3000,()=>{
    console.log('running server at localhost......')
})
