const express = require('express');
const cors = require('cors');

const app = express();

require('dotenv').config();


const port = process.env.PORT || 3000;



//body parser middleware
app.use(express.urlencoded({extended:false ,limit:"10mb"}));
app.use(express.json({limit:"10mb"}));


app.use(cors())


const sendMail = require('./routes/mail');

app.use(sendMail)


app.get('/', (req,res)=>{
   
    res.send('ok')
})

//error handling middleware
app.use((err ,req,res,next)=>{
    res.status(500).json({error:true,details:err})
});

//server
app.listen(port , ()=>{
    console.log(`app is running on port ${port}`);
}).on('error', function(err) { 
    console.log("Sowething Went Worng");
});