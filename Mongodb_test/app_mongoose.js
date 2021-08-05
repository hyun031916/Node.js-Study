const express=require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/data', 
                        {useNewUrlParser:true})

//2. db 연결
const db = mongoose.connection;

//3. event 이용하여 접속

db.on('err', ()=>{
    console.log('connection failed');
})

db.once('open', ()=>{
    console.log('connected');
})

const app = express();
app.use(express.urlencoded({extended: true}))

//4. 스키마 생성
const test = mongoose.Schema({
    name: String,
    age: Number
})

//5. 4번의 스키마를 토대로 실제 컬렉션 생성
const Test = mongoose.model('aa', test);
//test라는 스키마를 사용하여 aa라는 테이블 만들어 aa를 Test가 가리키게 한다.

app.get('/', (req, res)=>{
    res.send('hi');
})

//1. insert- data 저장
// const person = new Test({name:'kang', age:15});
// person.save((err, data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log('save');
//     }
// })

// Test.insertMany([
//     {nama:'kang', age:15},
//     {name:'ko', age:70},
//     {name:'min', age:80}
// ], (err, result)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log('save');
//     }
// })

Test.find({}, (err, result)=>{
    if(err){
        console.log(err);
    }else{
        result.forEach((ele)=>{
            console.log(ele.name, ele.age);
        })
    }
})

Test.findOne({_id:'60fe37a4aea0bb72b09430e9'}, (err, result)=>{
    if(err){console.log(err)}
    else{console.log(result)}
})

// Test.updateOne({_id:'60fe37a4aea0bb72b09430e9'}, {name:'ho'}, (err, result)=>{
//     if(err) console.log(err);
//     else console.log(result);
// })

// Test.updateOne({name:'park'}, {$set:{name:'park3', age:100}}, (err, result)=>{
//     if(err) console.log(err);
//     else console.log(result);
// })

Test.deleteOne({name:'park3'}, (err, result)=>{
    if(err) console.log(err);
    else(console.log(result));
})



app.listen(3000,()=>{
    console.log('running server at localhost......')
})
