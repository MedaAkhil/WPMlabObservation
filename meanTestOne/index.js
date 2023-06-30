const express = require('express');
const app = express();


app.use('/',(req,res)=>{
    res.send("<h1>Hello NPM</h1>");
    app.
    console.log(req);
    console.log("<h1>Hello NPM</h1>");
    console.log(res);
});
app.listen(3000,()=>{
    console.log("App is listening at port 3000");
});