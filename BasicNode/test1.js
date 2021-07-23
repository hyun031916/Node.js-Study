//1. 모듈 불러오기: require
const os = require('os');
console.log(`호스트 이름은 ${os.hostname()}입니다.`);
console.log(os.freemem());
console.log(os.totalmem());
console.log(os.type());