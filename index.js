const express = require('express');
const app = express();

app.get('/' , (req, res) =>{
    res.send("hola! bienvenido");
});

app.listen(3001, ()=>{
    console.log("Listen to 3001");
})

