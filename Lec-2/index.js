const express = require('express');
const app = express();

//middleware
app.use(express.json()); // parse json strings

//routes
app.get('/',(req,res)=>{
    res.send("Server Running !! sir");
});

app.get('/users',(req,res)=>{
    res.status(200).json(
        [{"name":"rahul", "age":21},{"name":"shivam", "age":21}]
    );
});
app.get('/users/1',(req,res)=>{
        res.json(
        [{"name":"rahul", "age":21},{"name":"shivam", "age":21}]
    );
});

// running server 
app.listen(3000,()=>{
    console.log("Server Running on port 3000");
})