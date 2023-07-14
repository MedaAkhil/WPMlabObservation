const express = require('express');
const app = express();


app.use('/',(req,res)=>{
    res.send("<h1>Hello NPM</h1>");
    const filePath = path.join(__dirname, '../week-3/index.html');
    res.sendFile(filePath);
});
app.listen(3000,()=>{
    console.log("App is listening at port 3000");
});