const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    
    EmailId:{
        type:String,
        minLength:5,
        maxLength:30,
        required:true
      
    },
    otp:{
        type:String,
        required:true
   
    },
    
  
});

module.exports = mongoose.model('email' , emailSchema)