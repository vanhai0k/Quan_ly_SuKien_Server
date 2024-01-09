const mongoose = require('mongoose');
console.log("11111");

mongoose.connect('mongodb://127.0.0.1:27017/SuKien-Chanel')

    .catch((err) =>{
        console.log("Loi ket noi");
        console.log(err);
    
    })
    .finally((xxx)=>{
        console.log(xxx);
        console.log("Ket noi thanh cong");
    })
    module.exports = {mongoose}
    console.log("zzzzzzzk");