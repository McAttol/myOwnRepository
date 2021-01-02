const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express();

const port= 4200;

const Users = require('./models/userModel');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost/UsersQRCode",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
});

app.use("/users", (req, res)=>{
    const list = {};
    Users.find(list, (error, usersList)=>{
        if(error){
            res.status(404);
            res.send('Not found')
        }else{
            res.json(usersList)
        }
    });
})

app.get('/', (req, res)=>{
    res.send('Hola!')
})

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}!`)
})