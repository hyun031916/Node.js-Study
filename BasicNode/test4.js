const fs = require("fs");

fs.readFile('./data.txt', 'utf8',(err, result)=>{
    if(err){
        console.log(err);
    }else{
        console.log(result);
    }
})

var data = 'Lorem Ipsum is simply dummy text of the printing and  typesetting industry.';
fs.writeFile('./write.txt', data, 'utf8', (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("saved!");
    }
})